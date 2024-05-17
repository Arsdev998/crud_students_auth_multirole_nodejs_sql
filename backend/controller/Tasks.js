import Tasks from "../models/TaskModels.js";
import Users from "../models/UsersModels.js";
import { Op } from "sequelize";

export const getTasks = async (req, res) => {
  try {
    let response;
    if (req.role === "guru") {
      response = await Tasks.findOne({
        attributes: ["uuid", "detail", "task", "nilai", "status"],
        include: [
          {
            model: Users,
            attributes: ["name", "email","uuid"],
          },
        ],
      });
    } else {
      response = await Tasks.findOne({
        attributes: ["uuid", "detail", "task", "nilai", "status"],
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createTask = async (req, res) => {
  const { detail, task, nilai, status, userId } = req.body;
  try {
    await Tasks.create({
      detail: detail,
      task: task,
      nilai: nilai,
      status: status,
      userId: userId,
    });
    res.status(201).json({ msg: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    // Log for debugging
    console.log(`Received update request for task ID: ${req.params.id}`);
    console.log(`User role: ${req.role}, User ID: ${req.userId}`);

    const task = await Tasks.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!task) return res.status(404).json({ msg: "Task not found" });

    const { detail, task: newTask, nilai, status } = req.body;

    if (req.role === "guru") {
      await Tasks.update(
        { detail, task: newTask, nilai, status },
        {
          where: {
            id: task.id,
          },
        }
      );
    } else {
      if (req.userId !== task.userId)
        return res.status(403).json({ msg: "Forbidden access" });

      await Tasks.update(
        { detail, task: newTask, nilai, status },
        {
          where: {
            [Op.and]: [{ id: task.id }, { userId: req.userId }],
          },
        }
      );
    }

    res.status(200).json({ msg: "Task updated successfully" });
  } catch (error) {
    // Log for debugging
    console.error("Error updating task:", error);
    res.status(500).json({ msg: error.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (req.role === "guru") {
      await Tasks.destroy({
        where: {
          id: task.id,
        },
      });
    } else {
      if (req.userId !== task.userId)
        return res.status(403).json({ msg: "Forbidden access" });

      await Tasks.destroy({
        where: {
          [Op.and]: [{ id: task.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
