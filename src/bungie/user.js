export default class User{
    constructor(api) {
        this.api = api;
    }

    async get(id) {
        let user = await this.api.get(`User/GetBungieNetUserById/${id}/`);

        return this.wrapResponse(user);
    }

    async getAliases(id) {
        if(!id && this.isRecord === true) {
            userid = this.membershipId;
        }

        let aliases = await this.api.get(`User/GetUserAliases/${id}/`);

        if(this.isRecord === true) {
            this.aliases = aliases;

            return this;
        }

        return aliases;
    }

    async search(query) {
        return await this.api.get('User/SearchUsers/?q='+query);
    }

    async getAvailableThemes(id) {
        if (!id && this.isRecord === true) {
            userid = this.membershipId;
        }

        let aliases = await this.api.get(`User/GetUserAliases/${id}/`);

        if (this.isRecord === true) {
            this.aliases = aliases;

            return this;
        }

        return aliases;
    }

    wrapResponse(obj) {
        obj.isRecord = true;

        return Object.assign(Object.create(Object.getPrototypeOf(this)), this, obj);
    }
}