import {$host, $authHost} from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (email, password, phone, name) => {

    const user = {
        email: email,
        password: password,
        phone: +phone,
        name: name,
        role: "ADMIN"
    }

    const {data} = await $host.post('api/user/registration', user)
    localStorage.setItem("token", data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem("token", data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem("token", data.token)
    return jwt_decode(data.token)
}
