import { Response, Request } from "express"
import { prismaClient } from "../prisma/database"

export const getBoards = async (req: Request, res: Response) => {
    try {
        const boards = await prismaClient.board.findMany({
            orderBy: { id: "asc" }
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
                name: name,
                creator: creator,
                drawings: []
            }
        })

        res.status(201).json(newBoard)
    } catch (error) {
        console.error(error)
        res.status(500).send("Ошибка при создании нового борда")
    }
}
