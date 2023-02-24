import jwt from "jsonwebtoken"
import dbConnect from "./dbConnect.js";
import { secret_key } from "../service_account.js";

export function signup(req, res) {
  const { email, password } = req.body
  const newUser = {
    email: email.toLowerCase(),
    password: password
  }
  const db = dbConnect()
  db.collection("users").add(newUser) 
  .then(doc => {
    const user = {email, uid: doc.id}
    const token = jwt.sign(user, secret_key)
    res.status(201).send({ success: true, user, token })
  })
  .catch(err => {
    res.status(500).send({success: false, message: err.message})
  })
}

export function login(req, res) {
  const { email, password } = req.body
  // const newUser = {
  //   email: email.toLowerCase(),
  //   password
  // }
  console.log({email, password})
  const db = dbConnect()
  db.collection("users")
  .where("email", '==', email.toLowerCase())
  .where('password', '==', password)
  .get()

  .then(collection => {
    const users = collection.docs.map(doc => ({...doc.data(), userId: doc.id}))
    console.log(users)
    if(!users.length) {
      res.status(401).send({success: false, message: "User not found" })
      return
    }
    let user = users[0]
    user.password = undefined
    const token = jwt.sign(user, secret_key)
    res.status(200).send({ user, token })
    .catch(err => {
      res.status(500).send({success: false, message: err.message})
    })

  })
}

