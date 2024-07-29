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
                creator,
                drawings: []
            }
        })

        res.status(201).json(newBoard)
    } catch (error) {
        console.error(error)
        res.status(500).send("Ошибка при создании нового борда")
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
