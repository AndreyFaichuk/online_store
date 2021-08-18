import {makeAutoObservable} from "mobx";
import photo from "../imgs/f4965aa0b26d7b9c64a5fae7387adc6b.jpg"

export default class DeviceStore{
    constructor() {
        this._types = [
            {id: 1, name: "Smartphones"},
            {id: 2, name: "TV`s"},
            {id: 3, name: "Smartphones"},
            {id: 4, name: "TV`s"},
            {id: 5, name: "Smartphones"},
            {id: 6, name: "TV`s"}
        ]

        this._brands = [
            {id: 1, name: "Samsung"},
            {id: 2, name: "Apple"},
            {id: 3, name: "Asus"},
            {id: 4, name: "Lenovo"},
        ]

        this._devices = [
            {id: 1, name: "Iphone 11 pro", price: 99999, rating: 5, img: photo },
            {id: 2, name: "Iphone 11 pro", price: 99999, rating: 5, img: photo },
            {id: 3, name: "Iphone 11 pro", price: 99999, rating: 5, img: photo },
            {id: 4, name: "Iphone 11 pro", price: 99999, rating: 5, img: photo },
            {id: 5, name: "Iphone 11 pro", price: 99999, rating: 5, img: photo },
            {id: 6, name: "Iphone 11 pro", price: 99999, rating: 5, img: photo },
        ]

        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setIsTypes (types) {
        this._types = types
    }

    setBrands (brands) {
        this._brands = brands
    }

    setDevices (devices) {
        this._devices = devices
    }

    get types () {
        return this._types
    }

    get brands () {
        return this._brands
    }

    get devices () {
        return this._devices
    }

    get selectedType () {
        return this._selectedType
    }

    setSelectedType (type) {
        this._selectedType = type
    }

    setSelectedBrand (brand) {
        this._selectedBrand = brand
    }

    get selectedBrand () {
        return this._selectedBrand
    }
}