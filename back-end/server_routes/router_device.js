const Router = require("express")
const controller_device = require("../server_controllers/controller_device")
const checkRole = require("../middleware/checkRole_middleware")

const router = new Router()

router.post("/", checkRole("ADMIN"), controller_device.create)
router.post("/reserve", checkRole("ADMIN"), controller_device.changeStatusReserve)
router.delete("/reserve", checkRole("ADMIN"), controller_device.changeStatusCancelReserve)
router.get("/", controller_device.all)
router.get("/:id", controller_device.getById)

module.exports = router