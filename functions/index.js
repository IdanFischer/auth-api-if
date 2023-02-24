import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { login, signup } from "./src/users.js"
import { getSecrets } from "./src/protectedRoutes.js"

const app = express()
app.use(cors())
app.use(express.json())

//login and signup routes
app.post("/signup", signup)

app.post("/login", login)

app.get("/secrets", getSecrets) // protected route

export const api = functions.https.onRequest(app)