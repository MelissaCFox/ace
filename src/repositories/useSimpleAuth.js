import Settings from "./Settings"


const useSimpleAuth = () => {

    const isAuthenticated = () => localStorage.getItem("ace__token") !== null
        || sessionStorage.getItem("ace__token") !== null

    const register = (user) => {
        return fetch(`${Settings.remoteURL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(_ => _.json())
    }

    const login = (user) => {
        return fetch(`${Settings.remoteURL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
        .then(res => res.json())
        
    }

    const logout = () => {
        console.log("*** Toggling auth state and removing credentials ***")
        localStorage.removeItem("ace__token")
        sessionStorage.removeItem("ace__token")
    }

    return { isAuthenticated, logout, login, register}
}

export default useSimpleAuth
