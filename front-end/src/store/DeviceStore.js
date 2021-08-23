import {makeAutoObservable} from "mobx";
import photo from "../imgs/f4965aa0b26d7b9c64a5fae7387adc6b.jpg"

export default class DeviceStore{
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 4
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
        this.setPage(1)
        this._selectedType = type
    }

    setPage (page) {
        this._page = page
    }

    setTotalCount (count) {
        this._totalCount = count
    }

    setSelectedBrand (brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }

    get selectedBrand () {
        return this._selectedBrand
    }

    get totalCount () {
        return this._totalCount
    }

    get page () {
        return this._page
    }

    get limit () {
        return this._limit
    }
}