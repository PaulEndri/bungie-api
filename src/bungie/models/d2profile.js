import ApiModel from '../apiModel';

export default class Destiny2Profile extends ApiModel{
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
} 