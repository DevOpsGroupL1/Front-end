import { request } from "../utils";

export const registerPatient = (data) => request({
    url: `/user-register`,
    method: "POST",
    data,
})

export const registerDoctor = (data) => request({
    url: `/doctor-register`,
    method: "POST",
    data,
})

export const activateUser = (id) => request({
    url: `/activate-register/${id}`,
    method: "PUT",
})


export const loginUser = (data) => {
    return request({
        url: `/token`,
        method: "POST",
        data
    })
}