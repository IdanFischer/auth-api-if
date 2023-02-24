import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { login, signup } from "./src/users.js"

const app = express()
app.use(cors())
app.use(express.json())

//login and signup routes
app.post("/signup", signup)

app.post("/login", login)

export const api = functions.https.onRequest(app)