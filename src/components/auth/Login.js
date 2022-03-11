import React, { useState, useRef } from "react"
import useSimpleAuth from "../../repositories/useSimpleAuth";
import { useHistory } from "react-router-dom";
import AceLogo from '../../media/ACE.png';
import "./Login.css"


const Login = () => {
    const [credentials, syncAuth] = useState({
        username: "",
        password: "",
        remember: false
    })
    const { login } = useSimpleAuth()
    const history = useHistory()
    const invalidDialog = useRef()

    // Simplistic handler for login submit
    const handleLogin = (e) => {
        e.preventDefault()

        console.log("*** Initiate authentication ***")

        login(credentials)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    debugger
                    localStorage.setItem("ace__token", res.token)
                    console.log("*** Authenticated! ***")
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    const handleUserInput = (event) => {
        const copy = { ...credentials }
        copy[event.target.id] = event.target.value
        syncAuth(copy)
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section className="form-container">
                <form className="form--login" onSubmit={handleLogin}>
                    <h2 className="h3 mb-3 font-weight-normal">Please Sign In</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username </label>
                        <input type="username" onChange={handleUserInput}
                            id="username"
                            className="form-control"
                            placeholder="username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password" onChange={handleUserInput}
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required autoFocus />
                    </fieldset>

                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>

            </section>

            <section className="appLogo">
                <img src={AceLogo} alt="Ace Logo" id="login-logo" />
            </section>

        </main>
    )
}
export default Login
