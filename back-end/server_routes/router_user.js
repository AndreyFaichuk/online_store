const Router = require("express")
const router = new Router()
const controller_user = require("../server_controllers/controller_user")

router.post("/registration", controller_user.registration)
router.post("/login", controller_user.login)
router.get("/auth", controller_user.isAuth)


module.exports = router