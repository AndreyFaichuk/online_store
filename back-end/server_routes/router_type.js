const Router = require("express")
const controller_type = require("../server_controllers/controller_type")
const checkRole = require("../middleware/checkRole_middleware")

const router = new Router()

router.post("/", checkRole("ADMIN"), controller_type.create)
router.get("/", controller_type.all)
router.delete("/", checkRole("ADMIN"), controller_type.delete)

module.exports = router