import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import { initSocketRoutes } from "./router/socketRouter"
import boardRouter from "./router/boardRouter"
import userRouter from "./router/userRouter"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

app.use(express.json())

const corsOptions = {
    origin: [
        "https://paint-online-taratuta.netlify.app",
        "http://localhost:5173"
    ]
}

app.use(cors(corsOptions))

app.use("/api", boardRouter)
app.use("/api", userRouter)

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Origin",
        "https://paint-online-taratuta.netlify.app"
    )
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, DELETE, OPTIONS"
    )
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})

initSocketRoutes(io)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`)
})

export default app
