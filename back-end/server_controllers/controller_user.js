const Error_api = require("../error_handler/error_api")

class Controller_user {
    async registration (req, res) {

    }

    async isAuth (req, res, next) {
        const {id} = req.query
        if(!id){
           return next(Error_api.request_bad("no ID"))
        }
        res.json(id)
    }

    async login (req, res) {

    }

}

module.exports = new Controller_user()