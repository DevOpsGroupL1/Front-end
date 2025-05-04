import { request } from "../utils";

export const getDashboard = () => request({
    url: `/dashboard`,
    method: "GET",
})

export const getUpcoming = () => request({
    url: `/dosage/upcoming`,
    method: "GET",
})

export const getLastTaken = () => request({
    url: `/dosage/lasttaken`,
    method: "GET",
})


export const getMyReports = () => request({
    url: `/patient/report`,
    method: "GET",
})


export const markAsTaken = (dosageId, sechduleId) => request({
    url: `/dosage/${dosageId}/schedule/${sechduleId}`,
    method: "PUT",
})
