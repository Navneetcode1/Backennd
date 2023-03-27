const express = require('express')
const cors = require("cors")

const {connection} = require("./db")
const {UserRouter} = require("./Routes/User.route")
const {postRouter} = require("./Routes/Post.route")
const { authenticate } = require('./Middelware/authenticate')


const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send("Welecome to Ravi Sharma TODO api")
})

app.use("/users",UserRouter)

app.use(authenticate)

app.use("/posts",postRouter)



app.listen(3002,async()=>{
    try{
        await connection 
        console.log('Connected to db at 3002')
    }
    catch(err){
        console.log(err)
        console.log('connection failed')
    }
})