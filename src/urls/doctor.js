import { request } from "../utils";

export const scheduleMedication = (data) => request({
    url: `/doctor/schedule`,
    method: "POST",
    data,
})

export const getPatientSchedule = (id) => request({
    url: `schedules/${id}`,
    method: "GET",
})


export const getUsers = () => request({
    url: `/users`,
    method: "GET",
})