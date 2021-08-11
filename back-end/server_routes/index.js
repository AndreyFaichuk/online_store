const Router = require("express")
const routerDevice = require("./router_device")
const routerBrand = require("./router_brand")
const routerType = require("./router_type")
const routerUser = require("./router_user")

const router = new Router()

router.use("/user", routerUser)
router.use("/brand", routerBrand)
router.use("/type", routerType)
router.use("/device", routerDevice)

module.exports = router