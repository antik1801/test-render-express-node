const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const userRouter = require("./routes/user.route")
require("./config/db")

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// api/users: GET
// api/users/:id: GET
// api/users/: POST
// api/users/:id: PATCH
// api/users/:id: DELETE

app.use("/api/users", userRouter)


app.get("/", (req,res) =>{
    res.sendFile(__dirname+"/views/index.html")
})

// handle api error
app.use((req,res,next)=>{
    res.status(404).json({
        message: "Route not found"
    })
})

// handle server error
app.use((err,req,res,next)=>{
    res.status(404).json({
        status: 402,
        message: "Server Error",
        slag: err.message
    })
})

module.exports = app