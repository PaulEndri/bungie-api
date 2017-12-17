import API from '../api/bungieApi';

export default class ApiModel{
    constructor(id) {
        this.api = API;
        this.isRecord = false;

        if(typeof this.get === 'function' && !isNaN(id)) {
            return this.get(id);
        } 
    }

    set id(val) {
        return this[this.primaryKey] = val;
    }

    get id() {
        return this[this.primaryKey];
    }

    static callAPI(route) {
        return API.get(route);
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
};