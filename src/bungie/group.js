import ApiModel from './apiModel';

export default class Group extends ApiModel{
    get primaryKey() {
        return "id";
    }

    async get(id) {
        let group = await this.api.get(`GroupV2/${id}/`);

        if(group) {
            group.id = id;
        }

        return this.wrapResponse(group);
    }

    async getMembers(id) {
        return await this.recordCall('GroupV2/{id}/Members/', "members", id, "results");
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