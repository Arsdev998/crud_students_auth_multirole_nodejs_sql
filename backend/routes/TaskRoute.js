import express from "express";
import {createTask,deleteTask,updateTask,getTasks
} from "../controller/Tasks.js";
import { adminOnly, verifyUser } from "../middleware/Auth.js";

const router = express.Router();

router.get('/tasks/:id',getTasks)
router.post('/tasks',verifyUser,adminOnly,createTask)
router.patch('/tasks/:id',verifyUser,adminOnly,updateTask)
router.delete('/tasks/:id',verifyUser,adminOnly,deleteTask)


export default router;
