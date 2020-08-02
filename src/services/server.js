import axios from 'axios'

export const apiClient = () => {
    return axios.create({
        baseURL: process.env.VUE_APP_BACKEND_BASE_URL,
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        //httpsAgent: httpsAgent,
    })
}

export function getErrorArray(error) {
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errors
    ) {
        return error.response.data.errors
    } else {
        return [error.toString()]
    }
}
