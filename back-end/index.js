const express = require("express")
const sequelize = require("./db")
const modelDB = require("./modelDb/modelDb")
const cors = require("cors")
require("dotenv").config()

const port = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) =>{
    res.status(200).json({message: "workcccc"})
})

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(port, () => console.log("server started on port " + port))
    } catch (e) {
        console.log("start error ", e)
    }
}

start()
