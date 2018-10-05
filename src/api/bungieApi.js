import axios from 'axios';
import env   from '../env/env';
import { isNullOrUndefined } from 'util';

const API_ROOT = "https://www.bungie.net/Platform";
const HEADER   = {
    'X-API-KEY': env.BUNGIE_API_KEY,
    'Content-Type': 'application/json'
}

export default class BungieApi {
    constructor(access) {
        this.access = access
    }

    static get(url, access) {
        const headers = HEADER

        if (!isNullOrUndefined(access)) {
            headers.Authorization = `Bearer ${access}`
        }

        return new Promise((resolve, reject) => {
            axios({
                baseURL: API_ROOT,
                headers,
                url
            })
                .then(response => {
                    if (response.data.Message !== "Ok") {
                        reject(response.data);
                    } else {
                        resolve(response.data.Response);
                    }
                })
                .catch(e => {
                    console.log(e);
                    reject(e);
                })
        })
    }

    async get(route) {
        return await BungieApi.get(route, this.access)
    }

    post(url, data) {
        const headers = HEADER

        if (!isNullOrUndefined(this.access)) {
            headers.Authorization = `Bearer ${this.access}`
        }

        return new Promise((resolve, reject) => {
            axios.post(url, data || {}, {headers})
                .then(response => {
                    if (response.data.Message !== "Ok") {
                        reject(response.data);
                    } else {
                        resolve(response.data.Response);
                    }
                })
                .catch(e => {
                    console.log(e);
                    reject(e);
                })
        })
    }
}
