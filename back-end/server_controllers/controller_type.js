const {Type} = require("../modelDb/modelDb")
const Error_api = require("../error_handler/error_api")

class Controller_type {
    async create (req, res) {
        try {
            const {name} = req.body
            const type = await Type.create({name})
            return res.json(type)

        } catch (e) {
            console.log(e)
        }
    }

    async all (req, res) {
        try {
            const types = await Type.findAll()
            return res.json(types)
        }
        catch (e) {
            console.log(e)
        }
    }

    async delete (req, res) {
        try{
            const {name} = req.body
            await Type.destroy({where:{name}})
            return res.json({message: "type has been deleted"})
        }
        catch(e){
            console.log(e)
        }
    }
}

module.exports = new Controller_type()