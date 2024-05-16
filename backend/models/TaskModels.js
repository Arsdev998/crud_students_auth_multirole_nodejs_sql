import { Sequelize } from "sequelize";
import db from "../config/Db.js";
import Users from "./UsersModels.js";

const { DataTypes } = Sequelize;

const Tasks = db.define(
  "tasks",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nilai: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        notEmpty: true,
        isIn: [['pending', 'completed']],
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Users,
        key: 'uuid',
      },
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Tasks, { foreignKey: 'userId' });
Tasks.belongsTo(Users, { foreignKey: "userId" });

export default Tasks;
