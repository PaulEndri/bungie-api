export default class ApiModel{
    constructor(api) {
        this.api = api;
        this.isRecord = false;
        this.primaryKey = false;
    }

    get id() {
        return this[this.primaryKey];
    }

    async recordCall(route, key, id, sub = false) {
        let callId  = this.processId(id);
        let results = await this.api.get(route.replace("{id}", callId));
        
        if(this.isRecord === true) {
            if(sub !== false) {
                results = results[sub];
            }

            this[key] = results;
        
            return this;
        }

        return results;
    }

    processId(id) {
        if(!id && this.isRecord === true && this.primaryKey !== false) {
            return this.id;
        } else if(this.primaryKey === false && !id && this.record === true) {
            throw Error("Please specify a primary key on a custom api model if it is to act as a proxy.");
        }

        return id;
    }

    wrapResponse(obj) {
        obj.isRecord = true;

        return Object.assign(Object.create(Object.getPrototypeOf(this)), this, obj);
    }
}