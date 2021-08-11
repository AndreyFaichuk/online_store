const Error_api = require("../error_handler/error_api")

module.exports = function (err, req, res, next){
    if(err instanceof Error_api) {
        return res.status(err.status).json({message: err.message})
    } else {
        return res.status(500).json({message: "unexpected error"})
    }
}