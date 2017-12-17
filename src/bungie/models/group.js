import ApiModel from '../apiModel';

export default class Group extends ApiModel{
    get primaryKey() {
        return "id";
    }

    static get(id) {
        return this.callAPI(`GroupV2/${id}/`);
    }

    static getMembers(id) {
        return this.callAPI(`GroupV2/${id}/Members/`);
    }

    get(id) {
        return this.api
            .get(`GroupV2/${id}/`)
            .then(group => {
                if(group) {
                    group.id = id;
                }
        
                return this.wrapResponse(group);
            });
    }

    getMembers(id) {
        return this.recordCall('GroupV2/{id}/Members/', "members", id, "results");
    }
} 