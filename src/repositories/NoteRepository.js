import Settings from "./Settings";
import { fetchIt } from "./Fetch";

const NoteRepository = {

    // Notes
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/notes/${id}`)
    },

    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/notes`)
    },

    async add(note) {
        return await fetchIt(`${Settings.remoteURL}/notes`, "POST", JSON.stringify(note))
    },

    async update(id, note) {
        return await fetchIt(`${Settings.remoteURL}/notes/${id}`, "PUT", JSON.stringify(note))
    },

    async pin(id) {
        return await fetchIt(`${Settings.remoteURL}/notes/${id}/pin`, "PUT")
    },

    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/notes/${id}`, "DELETE")
    },

}

export default NoteRepository