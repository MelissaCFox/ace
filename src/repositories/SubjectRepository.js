import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const SubjectRepository = {

    // Subjects
    async getSubject(id) {
        return await fetchIt(`${Settings.remoteURL}/subjects/${id}`)
    },

    async getAllSubjects() {
        return await fetchIt(`${Settings.remoteURL}/subjects`)
    },

    // Subject Areas
    async getArea(id) {
        return await fetchIt(`${Settings.remoteURL}/subjectareas/${id}`)
    },

    async getAllAreas() {
        return await fetchIt(`${Settings.remoteURL}/subjectareas`)
    },


    // Student Subject Areas
    async getFocusArea(id) {
        return await fetchIt(`${Settings.remoteURL}/studentareas/${id}`)
    },

    async getAllFocusAreas() {
        return await fetchIt(`${Settings.remoteURL}/studentareas`)
    },
    async addFocusArea(studentArea) {
        return await fetchIt(`${Settings.remoteURL}/studentareas`, "POST", JSON.stringify(studentArea))
    },

    async deleteFocusArea(id) {
        return await fetchIt(`${Settings.remoteURL}/studentareas/${id}`, "DELETE")
    },

}

export default SubjectRepository