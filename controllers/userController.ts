import { Response, Request } from "express"
import { prismaClient } from "../prisma/database"

export const addUser = async (req: Request, res: Response) => {
    const { username } = req.body

    try {
        const user = await prismaClient.user.findUnique({ where: { username } })

        if (user) {
            return res.status(200).send("User already exists")
        }
        const newUser = await prismaClient.user.create({
            data: {
                username
            }
        })
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
        res.status(500).send("Error creating new user")
    }
}
