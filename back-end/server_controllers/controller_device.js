const uuid = require("uuid")
const path = require("path")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
const {Device, DeviceInfo} = require("../modelDb/modelDb")
const Error_api = require("../error_handler/error_api")

class Controller_device {
    async create (req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body

            const {img} = req.files
            let nameOfFile = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static_files", nameOfFile))

            const device = await Device.create({name, price, brandId, typeId, img: nameOfFile})

            if(info){
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({    /*without "await" so as not to block main stream*/
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            }

            return res.json(device)
        } catch (e) {
            next(Error_api.request_bad(e.message))
        }
    }

    async all (req, res) {
        try{
            let devices
            let {brandId, typeId, limit, page} = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit

            if(!brandId && !typeId) devices = await Device.findAndCountAll({limit, offset, order: [['id', 'ASC']]})
            if(brandId && !typeId)  devices = await Device.findAndCountAll({where: {brandId}, limit, offset, order: [['id', 'ASC']] })
            if(!brandId && typeId)  devices = await Device.findAndCountAll({where: {typeId}, limit, offset, order: [['id', 'ASC']] })
            if(brandId && typeId)   devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset, order: [['id', 'ASC']] })

            /*findAndCountAll needs for pagination, how many pages we have on front-end side */

            return res.json(devices)
        } catch (e){
            console.log(e)
        }
    }

    async getById (req, res) {
        try{
            const{id} = req.params
            const deviseById = await Device.findOne({where: {id}, include: [{model: DeviceInfo, as: 'info'}]})
            return res.json(deviseById)
        } catch (e) {
            console.log(e)
        }
    }

    async changeStatusReserve (req, res) {
        try{
            const {id, userId} = req.body

            const deviseById = await Device.findOne({where: {id}})

            deviseById.isReserved = true
            deviseById.userId = userId

            await deviseById.save()

           const devices = await Device.findAll({order: [['id', 'ASC']]})

            return res.json(devices)
        } catch (e) {
            console.log(e)
        }
    }

    async changeStatusCancelReserve (req, res) {
        try{
            const {id} = req.body

            const deviseById = await Device.findOne({where: {id}})

            deviseById.isReserved = false
            deviseById.userId = null

            const devices = await Device.findAll({order: [['id', 'ASC']]})

            await deviseById.save()


            return res.json(devices)
        } catch (e) {
            console.log(e)
        }
    }

    async addRating (req, res) {
        try{
            const {id} = req.body

            const deviseById = await Device.findOne({where: {id}})

            deviseById.rating += 1

            await deviseById.save()

            let devices

            let {limit, page, brandId, typeId} = req.query
            page = page || 1
            limit = limit || 4
            let offset = page * limit - limit

            if(!brandId && !typeId) devices = await Device.findAndCountAll({limit, offset, order: [['id', 'ASC']]})
            if(brandId && !typeId)  devices = await Device.findAndCountAll({where: {brandId}, limit, offset, order: [['id', 'ASC']] })
            if(!brandId && typeId)  devices = await Device.findAndCountAll({where: {typeId}, limit, offset, order: [['id', 'ASC']] })
            if(brandId && typeId)   devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset, order: [['id', 'ASC']] })

            return res.json(devices)
        } catch (e) {
            console.log(e)
        }
    }

    async removeRating (req, res) {
        try{
            const {id} = req.body

            const deviseById = await Device.findOne({where: {id}})

            if(deviseById.rating > 0) {
                deviseById.rating -= 1

                await deviseById.save()
            }

            let devices

            let {limit, page, brandId, typeId} = req.query
            page = page || 1
            limit = limit || 4
            let offset = page * limit - limit

            if(!brandId && !typeId) devices = await Device.findAndCountAll({limit, offset, order: [['id', 'ASC']]})
            if(brandId && !typeId)  devices = await Device.findAndCountAll({where: {brandId}, limit, offset, order: [['id', 'ASC']] })
            if(!brandId && typeId)  devices = await Device.findAndCountAll({where: {typeId}, limit, offset, order: [['id', 'ASC']] })
            if(brandId && typeId)   devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset, order: [['id', 'ASC']] })

            return res.json(devices)
        } catch (e) {
            console.log(e)
        }
    }

}



module.exports = new Controller_device()