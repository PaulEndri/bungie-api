import API from '../api/bungieApi';

export default class ApiModel{
    constructor(id, access) {
        this.api = new API(access);
        this.isRecord = false;
        this.access = access || null;

        if(typeof this.get === 'function' && !isNaN(id)) {
            return this.get(id);
        } 
    }

    set id(val) {
        if(this.primaryKey == 'id') {
            return this._id = val;
        }
        return this[this.primaryKey] = val;
    }

    get id() {
        if(this.primaryKey == 'id') {
            return this._id;
        }

        return this[this.primaryKey];
    }

    static callAPI(route) {
        return API.get(route);
    }

    clean() {
        if(this.isRecord === false) {
            return false;
        }

        let cleanObject = {};

        for(var key of this._metaData) {
            cleanObject[key] = this[key];
        }

        return cleanObject;
    }

    enforceAuth() {
        if (!this.access) {
            throw new Error("Authentication data must be present to make this call");
        }
    }

    processId(id) {
        if(!id && this.isRecord === true && this.primaryKey !== false) {
            return this.id;
        } else if(this.primaryKey === false && !id && this.record === true) {
            throw Error("Please specify a primary key on a custom api model if it is to act as a proxy.");
        }

        return id;
    }

    recordCall(route, key, id, sub = false) {
        let callId  = this.processId(id);
        
        return this.api
            .get(route.replace("{id}", callId))
            .then(results => {
                if(this.isRecord === true) {
                    if(sub !== false) {
                        results = results[sub];
                    }
        
                    this[key] = results;
                
                    return this;
                }
        
                return results;
            });
    }

    async recordPost(route, data) {
        return await this.api.post(route, data)
    }

    wrapResponse(obj) {
        obj._metaData = Object.keys(obj);        
        obj.isRecord  = true;
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this, obj);
    }
};