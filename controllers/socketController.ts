import { Server, Socket } from "socket.io"

export const handleSocketConnection = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        const _id = socket.id
        let _room: string
        let _username: string

        socket.on("joinRoom", (data: { roomId: string; username: string }) => {
            const { roomId, username } = data
            _room = roomId
            _username = username
            socket.join(_room)
            console.log("User joined room: " + _room)

            io.to(roomId).emit("userJoined", username)
        })

        socket.on("disconnect", () => {
            io.to(_room).emit("userLeft", _username)
            socket.leave(_room)
        })
        socket.on("leaveRoom", () => {
            io.to(_room).emit("userLeft", _username)
            socket.leave(_room)
        })

        socket.on("giveUserInfo", (data: { username: string }) => {
            const { username } = data

            io.to(_room).emit("passUserInfo", username)
        })

        socket.on("message", (data: any) => {
            const { room, message } = data
            io.to(room).emit("message", message)
        })

        socket.on("draw", (data) => {
            const { id: roomId } = data
            io.to(roomId).emit("draw", data)
        })
    })
}
