import React from "react"
import { Route, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import {ApplicationViews} from "./ApplicationViews"
import useSimpleAuth from "../repositories/useSimpleAuth"
import { NavBar } from "./nav/NavBar"


export const Ace = () => {
    const { isAuthenticated } = useSimpleAuth()

    return <>
        <Route render={() => {
            if (isAuthenticated()) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/login">
            <Login />
        </Route>
    </>
}