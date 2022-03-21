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
import { Today } from "./Tutor/Today"
import { StudentList } from "./Tutor/StudentList"
import { Schedule } from "./Tutor/Schedule"
import { TutorProfile } from "./Profile/TutorProfile"
import { FocusAreaManager } from "./Tutor/FocusAreaManager"
import { StudentScores } from "./Profile/StudentScores"
import { StudentTestManager } from "./Tutor/StudentTestManager"


export const ApplicationViews = () => {

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        UserRepository.getCurrentUser().then(setCurrentUser)

    }, [])


    return (
        <div className="main-container">

            <Route exact path="/" render={() => {
                if (currentUser.user?.is_superuser) {
                    return <AdminHome />
                } else if (currentUser.user?.is_staff) {
                    return <Today user={currentUser} />
                } else if (currentUser.user) {
                    return <StudentProfile user={currentUser} thisStudent={currentUser} />
                }
            }} />
            {
                currentUser.user?.is_staff
                    ? currentUser.user?.is_superuser
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
                            <Route exact path="/student/:studentId(\d+)">
                                <StudentProfile user={currentUser} />
                            </Route>
                            <Route exact path="/student-scores/:studentId(\d+)">
                                <StudentScores user={currentUser} />
                            </Route>

                        </>
                        : <>
                            <Route path="/students">
                                <StudentList user={currentUser} />
                            </Route>
                            <Route path="/schedule">
                                <Schedule user={currentUser} />
                            </Route>
                            <Route path="/profile">
                                <TutorProfile currentUser={currentUser} />
                            </Route>
                            <Route exact path="/student/:studentId(\d+)">
                                <StudentProfile user={currentUser} />
                            </Route>
                            <Route exact path="/student-scores/:studentId(\d+)">
                                <StudentScores user={currentUser} />
                            </Route>
                            <Route exact path="/focus-areas/:studentId(\d+)">
                                <FocusAreaManager user={currentUser} />
                            </Route>
                            <Route exact path="/tests/:studentId(\d+)">
                                <StudentTestManager user={currentUser} />
                            </Route>
                        </>
                    : <>
                        <Route path="/profile">
                            <StudentProfile user={currentUser} thisStudent={currentUser} />
                        </Route>
                        <Route path="/my-scores">
                            <StudentScores user={currentUser} thisStudent={currentUser} />
                        </Route>

                    </>
            }

            <Route exact path="/tutor/:tutorId(\d+)">
                <TutorProfile user={currentUser} />
            </Route>

        </div>
    )

}
