const Router = require("express")
const router = new Router()
const controller_user = require("../server_controllers/controller_user")
const auth_middleware = require("../middleware/auth_middleware")

router.post("/registration", controller_user.registration)
router.post("/login", controller_user.login)
router.get("/auth", auth_middleware, controller_user.isAuth)


module.exports = router

