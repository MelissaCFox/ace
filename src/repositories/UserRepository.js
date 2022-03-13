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

}

export default UserRepository