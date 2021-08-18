const jwt = require("jsonwebtoken")
const secret = process.env.SECRET

module.exports = function (role) {
    return function (req, res, next){
        if(req.message === "OPTIONS"){
            next()
        }
        try {
            const token = req.headers.authorization.split(" ")[1]
            if(!token){
                res.status(403).json({message: "User is not logged in"})
            }

            const decoded = jwt.verify(token, secret)

            if(decoded.role !== role){
                return res.status(403).json({message: "You don`t have an access!"})
            }
            req.user = decoded

            next()
        } catch (e) {
            console.log(e)
            res.status(403).json({message: "User is not logged in"})
        }
    }
}
