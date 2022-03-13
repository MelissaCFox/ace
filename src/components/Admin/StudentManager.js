import { Settings } from '@material-ui/icons';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UserRepository from "../../repositories/UserRepository"

export const StudentManager = () => {
    const [allStudents, setAllStudents] = useState([])
    const [tutors, setTutors] = useState([])
    const [pairs, setPairs] = useState([])
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    useEffect(() => {
        UserRepository.getStudents().then(setAllStudents)
        UserRepository.getTutors().then((r) => setTutors(r.filter(tutor => !tutor.user.is_superuser)))
        UserRepository.getPairs().then(setPairs)
    }, [newInfo])


    const assignTutor = (studentId, tutorId) => {
        const pair = pairs.find(pair => pair.student.id === studentId)
        if (tutorId !== "0") {
            const new_pair = {
                studentId: studentId,
                tutorId: tutorId
            }
            if (pair) {
                UserRepository.updatePair(pair.id, new_pair).then(alertNewInfo)
            } else {
                UserRepository.addPair(new_pair).then(alertNewInfo)
            }

        } else {
            UserRepository.deletePair(pair.id).then(alertNewInfo)
        }
    }

    return (<>
        <div className="container">
            <div className="">
                {
                    allStudents.map((student) => {
                        return <div key={student.id}>
                            <Link to={`student/${student.id}`}>{student.user.first_name}</Link> {student.unassigned ? " - NOT ASSIGNED" : ""}
                            <button><Settings /></button>
                            <select defaultValue={student.tutor_id} onChange={e => assignTutor(student.id, e.target.value)}>
                                <option value="0">Assign Tutor</option>
                                {
                                    tutors.map(tutor => <option key={tutor.id} value={tutor.id}>{tutor.user?.firstName} {tutor.user?.last_name}</option>)
                                }
                            </select>
                        </div>
                    })
                }
            </div>
        </div>

    </>)

}