import Users from "../models/UsersModels.js";
import argon2 from "argon2";
import Tasks from "../models/TaskModels.js"; // Ubah dari ProductModel.js menjadi TaskModel.js

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "role"],
      include: {
        model: Tasks,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserbyId = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
      include: {
        model: Tasks,
        attributes: ["detail", "task", "nilai", "status",'uuid'],
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });
  const hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Registration successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Mengambil UUID dari params
    const { name, email, password, confPassword, role } = req.body;

    // Validasi input
    if (!name || !email || !role) {
      return res
        .status(400)
        .json({ msg: "Name, email, and role are required" });
    }

    // Cari user berdasarkan UUID
    const user = await Users.findOne({ where: { uuid: id } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Hash password jika diubah, jika tidak gunakan password lama
    let hashPassword;
    if (password) {
      if (password !== confPassword) {
        return res
          .status(400)
          .json({ msg: "Password and Confirm Password do not match" });
      }
      hashPassword = await argon2.hash(password);
    } else {
      hashPassword = user.password;
    }

    // Update user
    await Users.update(
      {
        name,
        email,
        password: hashPassword,
        role,
      },
      {
        where: { uuid: id },
      }
    );

    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createTask = async (req, res) => {
  // Dapatkan data dari request
  const { detail, task, nilai, status, userId } = req.body;

  try {
    // Cek apakah user yang membuat tugas adalah guru
    if (req.role !== "guru") {
      return res
        .status(403)
        .json({ msg: "Access denied, only teachers can create tasks" });
    }

    // Buat tugas baru dalam database
    await Tasks.create({
      detail: detail,
      task: task,
      nilai: nilai,
      status: status,
      userId: userId, // Asumsikan userId disediakan dalam request
    });

    // Kirim respons sukses
    res.status(201).json({ msg: "Task created successfully" });
  } catch (error) {
    // Tangani kesalahan
    res.status(500).json({ msg: error.message });
  }
};
