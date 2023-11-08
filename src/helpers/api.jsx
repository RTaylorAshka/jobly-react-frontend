import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001'
});

// Wraps all api requests to check if backend is down, return 500 error message if unable to connect
async function connectionHandler(req) {
    try {
        const res = await req()
        return res.data
    } catch (e) {
        console.log(e)
        return {
            error: {
                message: "Unable to connect to database",
                status: 500
            }
        }
    }
}

class JoblyApi {

    static async getAllJobs() {
        return await connectionHandler(() => instance.get('/jobs').catch(e => { return (e.response) }))
    }

    static async getJobsBySearch(query) {
        let searchQuery = []
        Object.keys(query).forEach((p) => query[p] ? searchQuery.push(`${p}=${query[p]}`) : undefined)
        return await connectionHandler(() => instance.get(`/jobs?${searchQuery.join('&')}`).catch(e => { return (e.response) }))
    }

    static async getJobDetails(id) {
        return await connectionHandler(() => instance.get(`/jobs/${id}`).catch(e => { return (e.response) }))
    }

    static async getAllCompaines() {
        return await connectionHandler(() => instance.get('/companies').catch(e => { return (e.response) }))
    }

    static async getcompaniesBySearch(query) {
        let searchQuery = []
        Object.keys(query).forEach((p) => query[p] ? searchQuery.push(`${p}=${query[p]}`) : undefined)
        return await connectionHandler(() => instance.get(`/companies?${searchQuery.join('&')}`).catch(e => { return (e.response) }))
    }

    static async getCompanyDetails(id) {
        return await connectionHandler(() => instance.get(`/companies/${id}`).catch(e => { return (e.response) }))
    }

    static async loginUser(input) {
        return await connectionHandler(() => instance.post(`/auth/token`, input).catch(e => { return (e.response) }))
    }

    static async registerUser(input) {
        return await connectionHandler(() => instance.post(`/auth/register`, input).catch(e => { return (e.response) }))
    }

    static async getUser({ username, token }) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
        return await connectionHandler(() => instance.get(`/users/${username}`, config).catch(e => { return (e.response) }))
    }

    static async editUser({ username, token }, input) {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }

        console.log(input)
        return await connectionHandler(() => instance.patch(`/users/${username}`, input, config).catch(e => { return (e.response) }))
    }

    static async apply({ username, token }, jobId) {
        console.log(username, token, jobId)
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
        return await connectionHandler(() => instance.post(`/users/${username}/jobs/${jobId}`, {}, config))
    }

}



export default JoblyApi;
