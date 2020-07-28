import axios from 'axios'

export const apiClient = () =>
    axios.create({
        baseURL: 'https://localhost:8443',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })

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
