import { Link } from "react-router-dom"
import useSimpleAuth from "../../repositories/useSimpleAuth";

import './NavBar.css';
import AceLogo from '../../media/ACE.png';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import UserRepository from "../../repositories/UserRepository";



export const NavBar = () => {
    const { isAuthenticated, logout } = useSimpleAuth()
    const history = useHistory()

    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        UserRepository.getCurrentUser().then(setCurrentUser)
    },[])

    return (
        <div className="container">
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top onTop">
                <div id="navbarNavDropdown" className="navbar-collapse collapse header">
                    <ul className="navbar-nav mr-auto appLogo">
                        <button onClick={() => {history.push("/")}}>
                            <img src={AceLogo} alt="Ace Logo" className="appLogo-btn" />
                        </button>
                    </ul>
                    <div className="navbar-nav-links">

                        {
                            currentUser.user?.is_staff
                                ? currentUser.user?.is_superuser
                                    ? <>
                                        <ul className="navbar-nav">
                                            <li className="nav-item"><Link to="/student-manager">Student Manager</Link></li>
                                        </ul>
                                        <ul className="navbar-nav">
                                            <li className="nav-item"><Link to="/tutor-manager">Tutor Manager</Link></li>
                                        </ul>
                                        <ul className="navbar-nav">
                                            <li className="nav-item"><Link to="/test-manager">Test Manager</Link></li>
                                        </ul>
                                    </>

                                    : <>
                                        <ul className="navbar-nav">
                                            <li className="nav-item"><Link to="/students">My Students</Link></li>
                                        </ul>
                                        <ul className="navbar-nav">
                                            <li className="nav-item"><Link to="/schedule">Schedule</Link></li>
                                        </ul>
                                        <ul className="navbar-nav">
                                            <li className="nav-item"><Link to="/profile">Profile</Link></li>
                                        </ul>
                                    </>

                                : <>
                                    <ul className="navbar-nav">
                                    <li className="nav-item"><Link to="/profile">Profile</Link></li>
                                    </ul>
                                    <ul className="navbar-nav">
                                    <li className="nav-item"><Link to="/scores">Scores</Link></li>
                                    </ul>
                                </>
                        }


                        <ul className="navbar-nav logout">
                            <li className="nav-item dropdown">
                                {
                                    isAuthenticated()
                                        ? <div className="logout-btn"><button className="nav-link logout-btn" onClick={() => {
                                            setCurrentUser({})
                                            logout()
                                            history.push("/login")
                                        }}><div className="logout-btn">Logout</div></button></div>
                                        : <Link className="nav-link" to="/login">Login</Link>
                                }
                            </li>

                        </ul>

                    </div>

                </div>
            </nav>
        </div>
    )
}
