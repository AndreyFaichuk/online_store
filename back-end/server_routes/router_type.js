const Router = require("express")
const controller_type = require("../server_controllers/controller_type")

const router = new Router()

router.post("/", controller_type.create)
router.get("/", controller_type.all)
router.delete("/", controller_type.delete)

module.exports = router