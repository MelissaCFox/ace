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

}

export default UserRepository