import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config({path: './config/.env'})
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import likeRoutes from './routes/likes.js'


const PORT = process.env.PORT || 8800
const app = express()

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/likes', likeRoutes)

app.listen(PORT, ()=>{
    console.log("server up and running!", `${PORT}`)
})