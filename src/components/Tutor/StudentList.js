import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import UserRepository from '../../repositories/UserRepository';


export const StudentList = ({ user, dayStudents }) => {
    const [students, setStudents] = useState([])
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    useEffect(() => {
        if (dayStudents) {
            setStudents(dayStudents)
        } else {
            UserRepository.getStudents().then((r) => {
                setStudents(r.filter(s => s.tutor_id === user?.user?.id))
            })
        }
    }, [newInfo, dayStudents])


    return (<>
        <div className="container">

            <div className="students">
                {
                    students.map((student) => {
                        return <div key={student.id}>
                            <Link to={`/student/${student.id}`}> {student.user?.first_name} {student.user?.last_name}</Link>
                            {` ${student.day.day}s, ${student.start_time} - ${student.end_time}`}

                        </div>
                    })
                }
            </div>


        </div>

    </>)

}