import express from "express"
import {
    getBoards,
    addBoard,
    getBoard,
    deleteBoard,
    undoDrawing,
    redoDrawing,
    addDrawing,
    getDrawings
} from "../controllers/boardController"

const boardRouter = express.Router()

boardRouter.get("/boards", getBoards)
boardRouter.post("/board", addBoard)
boardRouter.get("/board/:boardId", getBoard)
boardRouter.delete("/board/:boardId", deleteBoard)
boardRouter.post("/board/:boardId/drawing", addDrawing)
boardRouter.get("/board/:boardId/drawings", getDrawings)
boardRouter.delete("/board/deletedraw/:boardId/:username", undoDrawing)
boardRouter.post("/board/postdraw/:boardId/:username", redoDrawing)

export default boardRouter
