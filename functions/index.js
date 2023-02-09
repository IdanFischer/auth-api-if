import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { signup } from "./src/users.js"

const app = express()
app.use(cors())
app.use(express.json())

//login and signup routes
app.post("/signup", signup)

export const api = functions.https.onRequest(app)