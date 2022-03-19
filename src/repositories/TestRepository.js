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

    async getStudentTests(studentId) {
        return await fetchIt(`${Settings.remoteURL}/studenttests?studentId=${studentId}`)
    },

    async updateStudentTest(id, newTest) {
        return await fetchIt(`${Settings.remoteURL}/studenttests/${id}`, "PUT", JSON.stringify(newTest))
    },

    async addStudentTest(test) {
        return await fetchIt(`${Settings.remoteURL}/studenttests`, "POST", JSON.stringify(test))
    },

}

export default TestRepository