import React, { useEffect, useState } from "react"
import { Table } from 'reactstrap';

export const ScoresTable = ({ thisStudent, newInfo }) => {
    const [student, setStudent] = useState({})
    const [firstTest, setFirstTest] = useState({})
    const [superscore, setSuperscore] = useState({})

    useEffect(() => {
        if (thisStudent.scores) {
            setStudent(thisStudent)
            // find score with earliest date and setFirstTest
            let scores = thisStudent.scores.sort((a,b) => a.date.split("-").join("") - b.date.split("-").join(""))
            let firstTest = scores[0]
            firstTest.overall = Math.ceil((firstTest.english + firstTest.math + firstTest.reading + firstTest.science) / 4)
            setFirstTest(firstTest)
            // setSuperscore info from thisStudent data
        }
    }, [thisStudent])

    useEffect(() => {
        if (newInfo) {
            // get latest superscore data from student and setSuperScore
        }
    },[])

    if (firstTest) {

    return (<>
            <Table>
                <thead>

                    <tr>
                        <th>{student.user?.first_name}</th>
                        <th>Date</th>
                        <th>English</th>
                        <th>Math</th>
                        <th>Reading</th>
                        <th>Science</th>
                        <th>Overall</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <td>Initial</td>
                        <td>{firstTest.date}</td>
                        <td>{firstTest.english}</td>
                        <td>{firstTest.math}</td>
                        <td>{firstTest.reading}</td>
                        <td>{firstTest.science}</td>
                        <td>{firstTest.overall}</td>
                    </tr>
                    <tr>
                        <td>Superscore</td>
                        <td></td>
                        <td>22</td>
                        <td>20</td>
                        <td>24</td>
                        <td>21</td>
                        <td>22</td>
                    </tr>
                    <tr>
                        <td>Progress</td>
                        <td></td>
                        <td>{22 - firstTest.english}</td>
                        <td>{20 - firstTest.math}</td>
                        <td>{24 - firstTest.reading}</td>
                        <td>{21 - firstTest.science}</td>
                        <td>{22 - firstTest.overall}</td>
                    </tr>
                </tbody>

            </Table>
    </>)
    } else return false


}