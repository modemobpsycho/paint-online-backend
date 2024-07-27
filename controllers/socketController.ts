import { Server, Socket } from "socket.io"

export const handleSocketConnection = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        socket.on("joinRoom", (data: { roomId: string; username: string }) => {
            const { roomId, username } = data

            socket.join(roomId)
            io.to(roomId).emit("userJoined", `${username} joined the room`)
        })

        socket.on("message", (data: any) => {
            const { room, message } = data
            io.to(room).emit("message", message)
        })

        socket.on("disconnect", () => {
            io.emit("userLeft", "A user has left the chat")
        })

        socket.on("draw", (data) => {
            const { id: roomId } = data
            io.to(roomId).emit("draw", data)
        })
    })
}
