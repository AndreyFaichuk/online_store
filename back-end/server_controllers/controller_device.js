const uuid = require("uuid")
const path = require("path")
const {Device} = require("../modelDb/modelDb")
const Error_api = require("../error_handler/error_api")

class Controller_device {
    async create (req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let nameOfFile = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static_files", nameOfFile))

            const device = await Device.create({name, price, brandId, typeId, img: nameOfFile})
        } catch (e) {
            next(Error_api.request_bad(e.message))
        }
    }

    async all (req, res) {
        try{
            const types = await Device.findAll()
            return res.json(types)
        } catch (e){

        }
    }

    async getById (req, res) {

    }

}

module.exports = new Controller_device()