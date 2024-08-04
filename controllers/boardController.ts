import { Response, Request } from "express"
import { prismaClient } from "../prisma/database"

export const getBoards = async (req: Request, res: Response) => {
    try {
        const boards = await prismaClient.board.findMany({
            orderBy: { id: "asc" },
            select: {
                id: true,
                name: true,
                creator: true
            }
        })
        res.send(boards).status(200)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const addBoard = async (req: Request, res: Response) => {
    const { name, creator } = req.body

    try {
        const newBoard = await prismaClient.board.create({
            data: {
                name,
                creator
            }
        })
        res.status(201).json(newBoard)
    } catch (error) {
        console.error(error)
        res.status(500).send("Error creating new board")
    }
}

export const getBoard = async (req: Request, res: Response) => {
    try {
        const board = await prismaClient.board.findUnique({
            where: { id: Number(req.params.boardId) }
        })
        res.send(board).status(200)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const deleteBoard = async (req: Request, res: Response) => {
    try {
        const board = await prismaClient.board.delete({
            where: { id: Number(req.params.boardId) }
        })
        res.send(board).status(200)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const addDrawing = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const { boardId } = req.params
        const newDrawing = await prismaClient.drawing.create({
            data: {
                type: data.type,
                lineWidth: data.lineWidth,
                strokeColor: data.strokeColor,
                fillColor: data.fillColor,
                posX: data.posX,
                posY: data.posY,
                user: { connect: { username: data.username } },
                board: { connect: { id: Number(boardId) } }
            }
        })
        res.status(201).json(newDrawing)
    } catch (error) {
        console.error(error)
        res.status(500).send("Error creating new drawing")
    }
}

export const getDrawings = async (req: Request, res: Response) => {
    try {
        const { boardId } = req.params
        const drawings = await prismaClient.drawing.findMany({
            where: { boardId: Number(boardId) }
        })
        res.send(drawings).status(200)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const undoDrawing = async (req: Request, res: Response) => {
    try {
        const { boardId, username } = req.params

        const drawingToDelete = await prismaClient.drawing.findFirst({
            where: {
                boardId: Number(boardId),
                user: {
                    username
                }
            },
            orderBy: {
                id: "desc"
            },
            include: {
                user: true
            }
        })

        if (!drawingToDelete) {
            return res.status(404).send("Drawing not found")
        }

        await prismaClient.drawing.delete({
            where: {
                id: drawingToDelete.id
            }
        })

        res.status(200).send(drawingToDelete)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

export const redoDrawing = async (req: Request, res: Response) => {
    try {
        const { boardId, username } = req.params
        const data = req.body
        const newDrawing = await prismaClient.drawing.create({
            data: {
                type: data.type,
                lineWidth: data.lineWidth,
                strokeColor: data.strokeColor,
                fillColor: data.fillColor,
                posX: data.posX,
                posY: data.posY,
                user: { connect: { username: username } },
                board: { connect: { id: Number(boardId) } }
            }
        })
        res.status(201).json(newDrawing)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}
