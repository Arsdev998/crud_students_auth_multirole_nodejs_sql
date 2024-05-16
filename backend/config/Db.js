import { Sequelize } from "sequelize";

const db = new Sequelize("auth_crudstudent", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;