import { Link } from "react-router-dom"
import useSimpleAuth from "../../repositories/useSimpleAuth";
import './NavBar.css';
import AceLogo from '../../media/ACE.png';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import UserRepository from "../../repositories/UserRepository";
import { Button } from "@material-ui/core"



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
                        <Button onClick={() => {history.push("/")}}>
                            <img src={AceLogo} alt="Ace Logo" className="appLogo-btn" />
                        </Button>
                    </ul>
                    <div className="navbar-nav-links">

                        {
                            currentUser.user?.is_staff
                                ? currentUser.user?.is_superuser
                                    ? <>
                                        <ul className="navbar-nav">
                                            <li className="nav-item"><Button onClick={() => history.push('/student-manager')}>Student Manager</Button></li>
                                        </ul>
                                        <ul className="navbar-nav">
                                            <li className="nav-item"><Button onClick={() => history.push('/tutor-manager')}>Tutor Manager</Button></li>
                                        </ul>
                                        <ul className="navbar-nav">
                                            <li className="nav-item"><Button onClick={() => history.push('/test-manager')}>Test Manager</Button></li>
                                        </ul>
                                    </>

                                    : <>
                                        <ul className="navbar-nav">
                                            <li className=" nav-item">
                                                <Button onClick={() => history.push('/students')}>My Students</Button>
                                                </li>
                                        </ul>
                                        <ul className="navbar-nav">
                                            <li className="nav-item"><Button onClick={() => history.push('/profile')}>Profile</Button></li>
                                        </ul>
                                    </>

                                : <>
                                    <ul className="navbar-nav">
                                    <li className="nav-item"><Button onClick={() => history.push('/profile')}>Profile</Button></li>
                                    </ul>
                                    <ul className="navbar-nav">
                                    <li className="nav-item"><Button onClick={() => history.push('/my-scores')}>My Scores</Button></li>
                                    </ul>
                                </>
                        }


                        <ul className="navbar-nav logout">
                            <li className="nav-item dropdown">
                                {
                                    isAuthenticated()
                                        ? <div className="logout-btn"><Button className="nav-link logout-btn" onClick={() => {
                                            setCurrentUser({})
                                            logout()
                                            history.push("/login")
                                        }}><div className="logout-btn">Logout</div></Button></div>
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
