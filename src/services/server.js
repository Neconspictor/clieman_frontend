import axios from 'axios'

/*async function loadHttpsAgent() {
    var data = await jbinary.loadData(
        '../assets/dateman_backend_certificate.crt'
    )
    console.log('data: ', data)

    return new https.Agent({
        ca: data,
    })
}*/

//https.globalAgent.options.rejectUnauthorized = false

export const apiClient = () => {
    return axios.create({
        baseURL: 'http://localhost:8443',
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
