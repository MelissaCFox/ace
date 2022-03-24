import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import UserRepository from '../../repositories/UserRepository';
import { StudentList } from "./StudentList";


export const Schedule = ({ user }) => {
    const [days, setDays] = useState([])
    const [students, setStudents] = useState([])
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)



    useEffect(() => {
        UserRepository.getDays().then(setDays)
        UserRepository.getStudents().then((r) => {
            setStudents(r.filter(s => s.tutor_id === user?.user?.id))
        })

    }, [newInfo])


    return (<>
        <div className="container">

            <div className="days item space-between">
                {
                    days.map((day) => {
                        let dayStudents = students.sort((a,b) => a.start_time.split(":").join("") - b.start_time.split(":").join("")).filter(student => student.day.id === day.id)
                        return <div key={day.id}>
                            <h3 className="heading">{day.day}</h3>
                            <div>
                                <StudentList dayStudents={dayStudents} schedule={true} />
                            </div>
                        </div>
                    })
                }
            </div>

        </div>

    </>)

}