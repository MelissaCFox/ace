import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import UserRepository from "../../repositories/UserRepository"

export const AdminHome = () => {
    const history = useHistory()
    const [allStudents, setAllStudents] = useState([])
    const [unassignedStudents, setStudents] = useState([])
    
    useEffect(() => {
        UserRepository.getStudents().then((r) => {
            setAllStudents(r)
            setStudents(r.filter(student => student.unassigned))
        })

    },[])

    return (<>
        <div className="">
            <div>There are currently <Link to="/student-manager">{unassignedStudents.length}</Link> unassigned students</div>
        </div>

    </>)

}