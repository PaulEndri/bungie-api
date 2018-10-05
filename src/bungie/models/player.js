import ApiModel from '../apiModel';

export default class Player extends ApiModel{
    get primaryKey() {
       return "id";
    }

    static getProfile(type = 4, components = [100], id) {
        return this.callAPI(`/Destiny2/${type}/Profile/${id}/?components=${components}`);
    }

    async get(id) {
        this.id = id;

        return this;
    }

    async getProfile(type = 4, components = [100], id) {
        components = components.join(',');

        return await this.recordCall(`/Destiny2/${type}/Profile/{id}/?components=${components}`, 'data', id);
    }

    async getStats(type = 4, characterId = 0, params = {}, prefix = '', id) {
        let urlParams = '';

        if (Object.keys(params).length > 0) {
            urlParams = '?' + Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
        }

        if (prefix !== '') {
            urlParams = `${prefix}/${urlParams}`
        }

        return await this.api.get(`/Destiny2/${type}/Account/${this.processId(id)}/Character/${characterId}/Stats/${urlParams}`)
    }

    async getAggregateStats(type = 4, characterId, id) {
        if (!characterId) {
            return Promise.reject('Character ID is required')
        }

        return await this.getStats(type, characterId, {}, 'AggregateActivityStats', id)
    }

    async getActivities(type = 4, characterId, params, id) {
        if (!characterId) {
            return Promise.reject('Character ID is required')
        }

        return await this.getStats(type, characterId, params, 'Activities', id)
    }
}