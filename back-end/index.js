const express = require("express")
const fileUpload = require("express-fileupload")
const sequelize = require("./DB-setings")
const modelDB = require("./modelDb/modelDb")
const router  = require("./server_routes/index")
const error_middleware = require("./middleware/error_middleware")
const path = require("path")
const cors = require("cors")
require("dotenv").config()

const port = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static_files"))) /*absolute path to the static directory*/
app.use(fileUpload({}))
app.use("/api", router)
app.use(error_middleware) /*it goes last and sends response to the client*/

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
