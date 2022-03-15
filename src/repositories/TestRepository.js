import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const TestRepository = {

    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/tests/${id}`)
    },

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/tests`)
    },

    async like(id) {
        return await fetchIt(`${Settings.remoteURL}/tests/${id}/like`, "PUT")
    },

    async add(test) {
        return await fetchIt(`${Settings.remoteURL}/tests`, "POST", JSON.stringify(test))
    },

    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/tests/${id}`, "DELETE")
    },

}

export default TestRepository