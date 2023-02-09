import dbConnect from "./dbConnect.js";

export function signup(req, res) {
  const { email, password } = req.body
  const newUser = {
    email: email.toLowerCase(),
    password
  }
  const db = dbConnect()
  db.collection("users").add({ newUser }) 
  .then(doc => 
    res.status(201).send({ success: true, user: { email, uid: doc.id} }))
  .catch(err => {
    res.status(500).send({success: false, message: err.message})
  })
}
