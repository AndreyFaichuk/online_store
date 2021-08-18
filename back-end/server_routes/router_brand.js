const Router = require("express")
const controller_brand = require("../server_controllers/controller_brand")
const checkRole = require("../middleware/checkRole_middleware")

const router = new Router()

router.post("/", checkRole("ADMIN"), controller_brand.create)
router.get("/", controller_brand.all)
router.delete("/", controller_brand.delete)

module.exports = router