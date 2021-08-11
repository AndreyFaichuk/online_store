class Error_api extends Error{
    constructor(status, message) {
        super()   /*call the parent constructor*/
        this.status = status
        this.message = message
    }

    static request_bad (message) {
        return new Error_api(404, message)
    }

    static unallowable (message) {
        return new Error_api(403, message)
    }

    static inner (message) {
        return new Error_api(500, message)
    }
    /*create static functions (without object creating)*/
}

module.exports = Error_api
