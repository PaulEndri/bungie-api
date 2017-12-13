import axios from 'axios';
import env   from '../env/env';

const API_ROOT = "https://www.bungie.net/Platform";
const HEADER   = {
    'X-API-KEY': env.APIKey,
    'Content-Type': 'application/json'
}

export default class BungieApi {
    static get(route) {
        return new Promise((resolve, reject) => {
            axios({
                baseURL: API_ROOT,
                headers: HEADER,
                url:     route
            })
                .then(response => {
                    if (response.data.Message !== "Ok") {
                        reject(response.data);
                    } else {
                        resolve(response.data.Response);
                    }
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

}
