const Error_api = require("../error_handler/error_api")
const bcrypt = require("bcrypt")
const {User} = require("../modelDb/modelDb")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const secret = process.env.SECRET

const createJWT = (id, email, role) => {
   return jwt.sign({id, email, role}, secret, {expiresIn: "12h"})
}

class Controller_user {
    async registration (req, res, next) {
        const {name, email, phone, password, role} = req.body

        if(!email && !password && !phone && !name) return next (Error_api.request_bad("All fields are empty!"))
        if(!email || !password) return next (Error_api.request_bad("Incorrect email or password"))

        const condidate = await User.findOne({where: {email}})

        if(condidate) return next (Error_api.request_bad(`User with this email already exists`))

        const password_hash = await bcrypt.hash(password, 6)

        const new_user = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: password_hash,
            role: role
        })

        const token = createJWT(new_user.id, new_user.email, new_user.role)

        return res.json({token})
    }

    async isAuth (req, res, next) {
        const token = createJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async login (req, res, next) {
        const {email, password} = req.body

        const user = await User.findOne({where: {email}})

        if(!email) return next(Error_api.inner(`Email field is empty!`))
        if(!password) return next(Error_api.inner(`Password field is empty!`))

        if(!user) return next(Error_api.inner(`User with email ${email} not found`))

        let compare_password = bcrypt.compareSync(password, user.password)

        if(!compare_password) return next(Error_api.inner("Wrong password!"))

        const token = createJWT(user.id, user.email, user.role)
        return res.json({token})
    }

}

module.exports = new Controller_user()

