import ApiModel from '../apiModel';

export default class User extends ApiModel{
    get primaryKey() {
       return "membershipId";
    }

    async get(id) {
        let user = await this.api.get(`User/GetBungieNetUserById/${id}/`);

        return this.wrapResponse(user);
    }

    async getAliases(id) {
        return await this.recordCall('User/GetUserAliases/{id}/', "aliases", id);
    }

    async search(query) {
        return await this.api.get('User/SearchUsers/?q='+query);
    }

    async getAvailableThemes(id) {
        return await this.recordCall(`User/GetUserAliases/{id}/`, 'themes', id);
    }

    async getMemberships(type = 254, id) {
        return await this.recordCall(`/User/GetMembershipsById/{id}/${type}/`, 'memberships', id);
    }
} 