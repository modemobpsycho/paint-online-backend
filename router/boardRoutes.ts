import express from "express"
import {
    getBoards,
    addBoard,
    getBoard,
    deleteBoard,
    addDraw,
    addDrawing
} from "../controllers/boardController"

const boardRouter = express.Router()

boardRouter.get("/boards", getBoards)
boardRouter.post("/board", addBoard)
boardRouter.get("/board/:boardId", getBoard)
boardRouter.delete("/board/:boardId", deleteBoard)
boardRouter.post("/board/:boardId/drawing", addDrawing)

export default boardRouter
