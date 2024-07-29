import express from "express"
import {
    getBoards,
    addBoard,
    getBoard,
    deleteBoard
} from "../controllers/boardController"

const boardRouter = express.Router()

boardRouter.get("/boards", getBoards)
boardRouter.post("/board", addBoard)
boardRouter.get("/board/:boardId", getBoard)
boardRouter.delete("/board/:boardId", deleteBoard)

export default boardRouter
