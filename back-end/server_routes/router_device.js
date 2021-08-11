const Router = require("express")
const controller_device = require("../server_controllers/controller_device")

const router = new Router()

router.post("/", controller_device.create)
router.get("/", controller_device.all)
router.get("/:id", controller_device.getById)

module.exports = router