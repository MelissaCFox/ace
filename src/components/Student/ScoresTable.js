import React, { useEffect, useState } from "react"
import { Table } from 'reactstrap';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const ScoresTable = ({ thisStudent, newInfo }) => {
    const [student, setStudent] = useState({})
    const [firstTest, setFirstTest] = useState({})
    const [superscore, setSuperscore] = useState({})
    const [progress, setProgress] = useState({})

    useEffect(() => {
        if (thisStudent.scores?.length > 0) {
            setStudent(thisStudent)
            // find score with earliest date and setFirstTest
            let scores = thisStudent.scores.sort((a,b) => a.date.split("-").join("") - b.date.split("-").join(""))
            let firstTest = scores[0]
            firstTest.overall = Math.ceil((firstTest.english + firstTest.math + firstTest.reading + firstTest.science) / 4)
            setFirstTest(firstTest)
            // setSuperscore info from thisStudent data
            setSuperscore(thisStudent.superscore)
            setProgress({
                english: thisStudent.superscore.english - firstTest.english,
                math: thisStudent.superscore.math - firstTest.math,
                reading: thisStudent.superscore.reading - firstTest.reading,
                science: thisStudent.superscore.science - firstTest.science,
                overall: thisStudent.superscore.overall - firstTest.overall
            })
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
                        <td>{superscore.english}</td>
                        <td>{superscore.math}</td>
                        <td>{superscore.reading}</td>
                        <td>{superscore.science}</td>
                        <td>{superscore.overall}</td>
                    </tr>
                    <tr>
                        <td>Progress</td>
                        <td></td>
                        <td>{progress.english ? <ArrowDropUpIcon /> : ""}{progress.english}</td>
                        <td>{progress.math ? <ArrowDropUpIcon /> : ""}{progress.math}</td>
                        <td>{progress.reading ? <ArrowDropUpIcon /> : ""}{progress.reading}</td>
                        <td>{progress.science ? <ArrowDropUpIcon /> : ""}{progress.science}</td>
                        <td>{progress.overall ? <ArrowDropUpIcon /> : ""}{progress.overall}</td>
                    </tr>
                </tbody>

            </Table>
    </>)
    } else return false


}