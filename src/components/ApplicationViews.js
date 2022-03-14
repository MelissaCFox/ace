import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Route } from "react-router-dom"
import UserRepository from "../repositories/UserRepository"
import { AdminHome } from "./Admin/AdminHome"
import { StudentManager } from "./Admin/StudentManager"
import { TestManager } from "./Admin/TestManager"
import { TutorManager } from "./Admin/TutorManager"
import { StudentProfile } from "./Profile/StudentProfile"
import { Schedule } from "./Tutor/Schedule"


export const ApplicationViews = () => {

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        UserRepository.getCurrentUser().then(setCurrentUser)

    }, [])


    return (
        <>

            <h1>Hello {currentUser.user?.first_name}</h1>

            <Route exact path="/" render={() => {
                if (currentUser.user?.is_superuser) {
                    return <AdminHome />
                } else if (currentUser.user?.is_staff) {
                    return <Schedule />
                } else {
                    return <StudentProfile />
                }
            }} />
            {
                currentUser.user?.is_superuser
                    ? <>
                        <Route path="/student-manager">
                            <StudentManager />
                        </Route>
                        <Route path="/tutor-manager">
                            <TutorManager />
                        </Route>
                        <Route path="/test-manager">
                            <TestManager />
                        </Route>

                    </>
                    : ""
            }

        </>
    )

}
