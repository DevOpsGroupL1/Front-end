import { request } from "../utils";

export const registerPatient = (data) => request({
    url: `/user-register`,
    method: "POST",
    data,
})