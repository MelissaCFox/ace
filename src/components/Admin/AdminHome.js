import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import UserRepository from "../../repositories/UserRepository"

export const AdminHome = () => {
    const history = useHistory()
    const [unassignedStudents, setStudents] = useState([])
    useEffect(() => {
        UserRepository.getStudents().then((r) => {
            setStudents(r.filter(student => student.unassigned))
        })

    },[])

    return (<>
        <div className="">
            <div>There are currently {unassignedStudents.length} unassigned students</div>
        </div>

    </>)

}