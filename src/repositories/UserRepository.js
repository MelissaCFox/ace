import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const UserRepository = {

    async getCurrentUser() {
        return await fetchIt(`${Settings.remoteURL}/users/current`)
    },

    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}`)
    },

    async getStudents() {
        return await fetchIt(`${Settings.remoteURL}/users/students`)
    },

    async getTutors() {
        return await fetchIt(`${Settings.remoteURL}/users/tutors`)
    },

    async update(id, user) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}`, "PUT", JSON.stringify(user))
    },

    async activate(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}/activate`, "PUT")
    },

    async searchTutors(term) {
        return await fetchIt(`${Settings.remoteURL}/users/tutors?q=${term}`)
    },

    async setAreas(id, newAreas) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}/set_areas`, "PUT", JSON.stringify(newAreas))
    },


    // TutorStudents (aka Pairs)
    async getPairs() {
        return await fetchIt(`${Settings.remoteURL}/pairs`)
    },

    async addPair(pair) {
        return await fetchIt(`${Settings.remoteURL}/pairs`, "POST", JSON.stringify(pair))
    },

    async updatePair(id, newPair) {
        return await fetchIt(`${Settings.remoteURL}/pairs/${id}`, "PUT", JSON.stringify(newPair))
    },

    async deletePair(id) {
        return await fetchIt(`${Settings.remoteURL}/pairs/${id}`, "DELETE")
    },


    // Days
    async getDays() {
        return await fetchIt(`${Settings.remoteURL}/days`)
    },

}

export default UserRepository