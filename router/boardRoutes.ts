import express from "express"
import { getBoards } from "../controllers/boardController"

const boardRouter = express.Router()

boardRouter.get("/boards", getBoards)

export default boardRouter
