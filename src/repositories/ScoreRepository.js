import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const ScoreRepository = {

    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/scores/${id}`)
    },

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/scores`)
    },

    async getForStudent(studentId) {
        return await fetchIt(`${Settings.remoteURL}/scores?studentId=${studentId}`)
    },

    async add(score) {
        return await fetchIt(`${Settings.remoteURL}/scores`, "POST", JSON.stringify(score))
    },

    async update(id, newScore) {
        return await fetchIt(`${Settings.remoteURL}/scores/${id}`, "PUT", JSON.stringify(newScore))
    },
    
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/scores/${id}`, "DELETE")
    },

}

export default ScoreRepository