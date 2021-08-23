import {$host, $authHost} from "./index";

export const createTypes = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const allTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

/*--------------*/

export const createBrands = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const allBrands = async (typeId, brandId, page, limit = 4) => {
    const {data} = await $host.get('api/brand')
    return data
}

/*--------------*/

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const allDevices = async (typeId, brandId, page, limit = 4) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const getOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const rating = async (id, page) => {
    const {data} = await $host.post('api/device/rating', {id}, {params: {
            page
        }})
    return data
}
