import { Link } from "react-router-dom"
import useSimpleAuth from "../../repositories/useSimpleAuth";

import './NavBar.css';
import AceLogo from '../../media/ACE.png';
import { useHistory } from "react-router-dom";



export const NavBar = () => {
    const { isAuthenticated, logout } = useSimpleAuth()
    const history = useHistory()


    return (
        <div className="container">
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top onTop">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNavDropdown" className="navbar-collapse collapse header">
                    <ul className="navbar-nav mr-auto appLogo">
                        <button onClick={() => { }}>
                            <img src={AceLogo} alt="Ace Logo" className="appLogo-btn" />
                        </button>
                    </ul>
                    <div className="navbar-nav-links">

                        {

                        }

                        <ul className="navbar-nav logout">
                            <li className="nav-item dropdown">
                                <div className="logout-btn"><button className="nav-link logout-btn" onClick={() => {
                                    logout()
                                    history.push("/login")
                                }}><div className="logout-btn">Logout</div></button></div>

                            </li>
                        </ul>

                    </div>

                </div>
            </nav>
        </div>
    )
}
