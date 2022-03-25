import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import UserRepository from '../../repositories/UserRepository';


export const StudentList = ({ user, dayStudents, schedule }) => {
    const [days, setDays] = useState([])
    const [students, setStudents] = useState([])
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const history = useHistory()

    useEffect(() => {
        UserRepository.getDays().then(setDays)
        if (dayStudents) {
            dayStudents.sort((a, b) => a.user?.start_time?.split(":").join("") - b.user?.start_time?.split(":").join(""))
            setStudents(dayStudents)
        } else {
            UserRepository.getStudents().then((r) => {
                let students = r.filter(s => s.tutor_id === user?.user?.id)
                students.sort((a, b) => a.user?.start_time?.split(":").join("") - b.user?.start_time?.split(":").join(""))
                setStudents(students)
            })
        }
    }, [newInfo, dayStudents])


    return (<>
        <div className="schedule-container">


                    <h2>Weekly Schedule</h2>
                    <div className="item week">
                        {
                            days.map(day => {
                                return <div className="stack day" key={day.id}>
                                    <h3 className="heading">{day.day}</h3>
                                    {
                                        students.filter(student => student.user?.is_active && student.day.id === day.id).map((student) => {
                                            return <div key={student.id}>
                                                <Button className="name-btn"
                                                    outline
                                                    color={student.user?.is_active ? "success" : "danger"}
                                                    onClick={() => { history.push(`/student/${student.id}`) }}>
                                                    {student.user?.first_name} {student.user?.last_name.charAt(0)}
                                                </Button>
                                            </div>
                                        })
                                    }
                                </div>
                            })
                        }


            </div>
            <div className="stack">
                <h3>Inactive Students</h3>
                {
                    students.filter(student => !student.user?.is_active).map((student) => {
                        return <div key={student.id}>
                            <Button className="name-btn" outline color={student.user?.is_active ? "success" : "danger"} onClick={() => { history.push(`/student/${student.id}`) }}>{student.user?.first_name} {student.user?.last_name}</Button>
                        </div>
                    })
                }
            </div>
        </div>

    </>)

}