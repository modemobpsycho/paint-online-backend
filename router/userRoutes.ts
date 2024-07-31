import express from "express"
import { addUser } from "../controllers/userController"

const userRouter = express.Router()

userRouter.post("/user", addUser)

export default userRouter
