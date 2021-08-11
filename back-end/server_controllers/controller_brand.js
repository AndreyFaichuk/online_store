const {Brand} = require("../modelDb/modelDb")
const Error_api = require("../error_handler/error_api")

class Controller_brand {
    async create (req, res) {
        try {
            const {name} = req.body
            const brand = await Brand.create({name})
            return res.json(brand)

        } catch (e) {
            console.log(e)
        }
    }

    async all (req, res) {
        try {
            const brands = await Brand.findAll()
            return res.json(brands)
        }
        catch (e) {
            console.log(e)
        }
    }

    async delete (req, res) {
        try{
            const {name} = req.body
            await Brand.destroy({where:{name}})
            return res.json({message: "brand has been deleted"})
        }
        catch(e){
            console.log(e)
        }
    }
}

module.exports = new Controller_brand()