import {makeAutoObservable} from "mobx";

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
        this._basket = []
        makeAutoObservable(this)
    }


    setIsBasket (item) {
        const newBasket = JSON.parse(localStorage.getItem("basket"))
        if(newBasket !== null){
            this.setIsBasketFromLS(newBasket)
        }
        this._basket.push(item)
        localStorage.setItem("basket", JSON.stringify(this.basket))
    }

    setIsBasketFromLS (items) {
        this._basket = (items)
    }

    setRemoveFromBasket (item) {
        const newBasket = JSON.parse(localStorage.getItem("basket"))
        if(newBasket !== null){
            this.setIsBasketFromLS(newBasket)
        }
        let index = this.basket.findIndex(n => n.id === item.id)
        if (index !== -1) {
            this._basket.splice(index, 1)
            localStorage.setItem("basket", JSON.stringify(this.basket))
        }
    }

    get basket () {
        return this._basket
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