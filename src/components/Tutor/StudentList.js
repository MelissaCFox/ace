import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import UserRepository from '../../repositories/UserRepository';


export const StudentList = ({ user, dayStudents, schedule }) => {
    const [students, setStudents] = useState([])
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const history = useHistory()

    useEffect(() => {
        if (dayStudents) {
            dayStudents.sort((a, b) => a.user?.first_name - b.user?.first_name)
            setStudents(dayStudents)
        } else {
            UserRepository.getStudents().then((r) => {
                let students = r.filter(s => s.tutor_id === user?.user?.id)
                students.sort((a, b) => a.user?.first_name - b.user?.first_name)
                setStudents(students)
            })
        }
    }, [newInfo, dayStudents])


    return (<>
        <div className="container">

            <div className="students item space-between">
                <div className="stack">
                    {
                        schedule
                            ? ""
                            : ""
                    }
                    {schedule ? "" : <h2>Active Students</h2>}
                    {
                        students.filter(student => student.user?.is_active).map((student) => {

                            let startTime = student.start_time.slice(0, -3)
                            let endTime = student.end_time.slice(0, -3)
                            return <div key={student.id}>
                                {
                                    schedule
                                        ? <>{`${startTime} - ${endTime}`} <Link to={`/student/${student.id}`}> {student.user?.first_name} {student.user?.last_name}</Link></>
                                        : <>
                                            <Button outline color={student.user?.is_active ? "success" : "danger"} onClick={() => { history.push(`/student/${student.id}`) }}>{student.user?.first_name} {student.user?.last_name}</Button>
                                        </>
                                }


                            </div>
                        })
                    }

                </div>

                <div className="stack">
                    {schedule
                        ? ""
                        : <>
                            <h2>Inactive Students</h2>
                            {
                                students.filter(student => !student.user?.is_active).map((student) => {

                                    let startTime = student.start_time.slice(0, -3)
                                    let endTime = student.end_time.slice(0, -3)
                                    return <div key={student.id}>
                                        {
                                            schedule
                                                ? <>{`${startTime} - ${endTime}`} <Link to={`/student/${student.id}`}> {student.user?.first_name} {student.user?.last_name}</Link></>
                                                : <>
                                                    <Button outline color={student.user?.is_active ? "success" : "danger"} onClick={() => { history.push(`/student/${student.id}`) }}>{student.user?.first_name} {student.user?.last_name}</Button>
                                                </>
                                        }


                                    </div>
                                })
                            }
                        </>
                    }
                </div>
            </div>


        </div>

    </>)

}