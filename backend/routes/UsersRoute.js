import express from "express";
import {
  getUserbyId,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/Users.js";
import { adminOnly, verifyUser } from "../middleware/Auth.js";

const router = express.Router();

router.get('/users',verifyUser,getUsers)
router.get('/users/:id',verifyUser,getUserbyId)
router.post('/users',verifyUser,adminOnly,createUser)
router.patch('/users/:id',verifyUser,adminOnly,updateUser)
router.delete('/users/:id',verifyUser,adminOnly,deleteUser)


export default router;
