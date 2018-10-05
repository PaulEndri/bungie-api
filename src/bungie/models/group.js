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

    async getLeaderboards(id, modes) {
        return await this.recordCall(`Destiny2/Stats/Leaderboards/Clans/{id}/?maxtop=200&modes=${modes.join(',')}`, 'leaderboards', id)
    }
    async getAggregateStats(id, modes) {
        return await this.recordCall(`GroupV2/{id}/?modes=${modes.join(',')}`, 'stats', id)
    }

    async getMembers(id) {
        return await this.recordCall('GroupV2/{id}/Members/', "members", id, "results");
    }

    async getBannedMembers() {
        this.enforceAuth();

        return await this.api.get(`GroupV2/${this.id}/Banned/`)
    }

    async getPendingMembers() {
        this.enforceAuth();

        return await this.api.get(`GroupV2/${this.id}/Members/Pending/`)
    }

    async getInvitedPlayers() {
        this.enforceAuth();

        return await this.api.get(`GroupV2/${this.id}/Members/InvitedIndividuals/`)
    }

    async editMember(oldType, memberId, newType) {
        this.enforceAuth();

        return await this.recordPost(`GroupV2/${this.id}/Members/${oldType}/${memberId}/SetMembershipType/${newType}/`)
    }

    async kickMember(memberType, memberId) {
        this.enforceAuth();

        return await this.recordPost(`GroupV2/${this.id}/Members/${memberType}/${memberId}/Kick/`)
    }

    async banMember(memberType, memberId) {
        this.enforceAuth();

        return await this.recordPost(`GroupV2/${this.id}/Members/${memberType}/${memberId}/Ban/`)
    }

    async unbanMember(memberType, memberId) {
        this.enforceAuth();

        return await this.recordPost(`GroupV2/${this.id}/Members/${memberType}/${memberId}/Unban/`)
    }

    async approveAllPending() {
        this.enforceAuth();

        return await this.recordPost(`Groupv2/${this.id}/Members/ApproveAll/`)
    }

    async denyAllPending() {
        this.enforceAuth();

        return await this.recordPost(`Groupv2/${this.id}/Members/DenyAll/`)
    }

    async approvePending(members) {
        this.enforceAuth();

        return await this.recordPost(`GroupV2/${this.id}/Members/ApproveList/`, members)
    }

    async invitePlayer(memberType, memberId) {
        this.enforceAuth();

        return await this.recordPost(`GroupV2/${this.id}/Members/IndividualInvite/${memberType}/${memberId}/`)
    }

    async cancelInvite(memberType, memberId) {
        this.enforceAuth();

        return await this.recordPost(`GroupV2/${this.id}/Members/IndividualInviteCancel/${memberType}/${memberId}/`)
    }
}