const Router = require("express")
const controller_brand = require("../server_controllers/controller_brand")

const router = new Router()

router.post("/", controller_brand.create)
router.get("/", controller_brand.all)
router.delete("/", controller_brand.delete)

module.exports = router