const sequelize = require("../db")
const {DataTypes} = require("sequelize")

const BrandAndType = sequelize.define("brand_type", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    phone: {type: DataTypes.INTEGER},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define("basket", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define("basket_device", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Device = sequelize.define("device", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Type = sequelize.define("type", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Brand = sequelize.define("brand", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Rating = sequelize.define("rating", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.STRING, allowNull: false}
})

const DeviceInfo = sequelize.define("device_info", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

// Describing the relationship between tables in the PostrgeSQL
Type.belongsToMany(Brand, {through: BrandAndType})
Brand.belongsToMany(Type, {through: BrandAndType})
/*relationship between type and brand is many to many, add intermediate table*/

User.hasOne(Basket)
Basket.belongsTo(User)
/*relationship between user and basket is one to one*/

User.hasMany(Rating)
Rating.belongsTo(User)
/*relationship between user and rating is one to many*/

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)
/*relationship between basket and basket device is one to many*/

Type.hasMany(Device)
Device.belongsTo(Type)
/*relationship between type and device is one to many*/

Brand.hasMany(Device)
Device.belongsTo(Brand)
/*relationship between brand and device is one to many*/

Device.hasMany(Rating)
Rating.belongsTo(Device)
/*relationship between device and rating is one to many*/

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)
/*relationship between device and basket device is one to many*/

Device.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Device)
/*relationship between device and device info is one to many*/

module.exports = {BrandAndType, Type, Brand, Basket, Rating, Device, DeviceInfo, User, BasketDevice}