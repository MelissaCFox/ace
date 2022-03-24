import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { Input } from "reactstrap"
import UserRepository from "../../repositories/UserRepository"


export const Today = ({ user }) => {
    const [allStudents, setAllStudents] = useState([])
    const [students, setStudents] = useState([])
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    useEffect(() => {
        UserRepository.getStudents().then((r) => {
            let day = new Date().getDay()
            if (day === 6) {
                day = day - 5
            } else {
                day = day + 1
            }
            r.sort((a, b) => a.start_time - b.start_time)
            setAllStudents(r.filter(s => s.tutor_id === user?.user?.id))
            setStudents(r.filter(s => s.tutor_id === user?.user?.id && s.day.id === day))
        })
    }, [newInfo])

    const changeDate = (event) => {
        let date = event.target.value
        let day = new Date(date).getDay()
        if (day === 6) {
            day = day - 5
        } else {
            day = day + 2
        }

        setStudents(allStudents.filter(student => student.day.id === day))
    }

    return (<>
        <div className="">
            <div className="item">
                <h2>Students on the Schedule</h2>
                <Input type="date" onChange={changeDate} />
            </div>

            <div className="students">
                {
                    students.filter(student => student.user?.is_active).sort((a, b) => a.start_time.split(":").join("") - b.start_time.split(":").join("")).map((student) => {
                        let startTime = student.start_time.slice(0, -3)
                        let endTime = student.end_time.slice(0, -3)
                        return <div className="single-student item" key={student.id}>
                            <div className="flex-one">{startTime}-{endTime}</div>
                            <Link className="flex-six" to={`/student/${student.id}`}> {student.user?.first_name} {student.user?.last_name} </Link>

                        </div>
                    })
                }
            </div>

        </div>

    </>)

}