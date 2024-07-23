import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())

const corsOptions = {
  origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`)
})

export default app
