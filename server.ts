import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import { initSocketRoutes } from "./router/socketRoutes"
import boardRouter from "./router/boardRoutes"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

const corsOptions = {
    origin: "http://localhost:5173"
}

app.use(cors(corsOptions))
app.use("/api", boardRouter)
initSocketRoutes(io)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`)
})
