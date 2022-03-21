import { Form, InputGroup, InputGroupText, Input, Button, Label, FormGroup } from 'reactstrap';

import React, { useEffect, useState } from "react"
import NoteRepository from '../../repositories/NoteRepository';
import { Dialog } from '@material-ui/core';
import { StudentTestForm } from './StudentTestForm';
import TestRepository from '../../repositories/TestRepository';


export const NoteForm = ({ toggleNoteForm, alertNewInfo, student, editNote, currentUser }) => {
    const [tests, setTests] = useState([])
    const [confirm, setConfirm] = useState(false)
    const toggleConfirm = () => setConfirm(!confirm)
    const [testFormTest, setTestFormTest] = useState({})
    const [note, setNote] = useState({
        "studentId": "",
        "note": "",
        "pinned": false
    })

    useEffect(() => {
        TestRepository.getAll().then(setTests)
    },[])

    useEffect(() => {
        let copy = { ...note }
        if (editNote.note) {
            copy.studentId = editNote.student.id
            copy.note = editNote.note
            copy.pinned = editNote.pinned
        } else {
            copy.studentId = student.id
        }
        setNote(copy)
    }, [student])

    const addNote = () => {
        if (note.note) {
            if (editNote.note) {
                NoteRepository.update(editNote.id, note).then(() => {
                    alertNewInfo()
                    toggleNoteForm()
                })
            } else {
                NoteRepository.add(note).then(() => {
                    alertNewInfo()
                    toggleNoteForm()
                })

            }
        }
    }

    const deleteNote = () => {
        NoteRepository.delete(editNote.id).then(() => {
            alertNewInfo()
            toggleNoteForm()
        })
    }



    return (

        <Form className="">

            <Input className="" type="textarea" name="note" defaultValue={note.note} placeholder="Note"
                onChange={(e) => {
                    const copy = { ...note }
                    copy.note = e.target.value
                    setNote(copy)
                }}>
            </Input>

            {
                editNote.note
                    ? ""
                    : <>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" checked={note.pinned ? "checked" : ""} onChange={() => {
                                    const copy = { ...note }
                                    copy.pinned = !copy.pinned
                                    setNote(copy)
                                }} />
                                Pin Note?
                            </Label>
                        </FormGroup>

                        {
                            currentUser.user?.is_staff
                                ? <div>
                                    <div className="item">
                                        <Input type="select"
                                            onChange={(e) => {
                                                if (e.target.value !== "") {
                                                    setTestFormTest(student.tests[parseInt(e.target.value)])
                                                } else {
                                                    setTestFormTest({})
                                                }
                                            }}
                                        >
                                            <option value="">Update Test</option>
                                            {
                                                student?.tests?.map(test => <option key={test.id} value={student.tests.indexOf(test)}>{test.test?.name}</option>)
                                            }
                                        </Input>
                                        
                                        <Input type="select"
                                        onChange={(e) => {
                                            if (e.target.value !== "") {
                                                setTestFormTest(tests[parseInt(e.target.value)])
                                            } else {
                                                setTestFormTest({})
                                            }
                                        }}
                                        >
                                            <option value="">Start New Test</option>
                                            {
                                                tests.filter(test => !student.tests.find(st => st.test.id === test.id)).map(test => {
                                                return <option value={tests.indexOf(test)}>{test.name}</option>
                                            })
                                            }
                                        </Input>

                                    </div>
                                    {
                                        testFormTest.test
                                            ? <StudentTestForm thisTest={testFormTest} setTestFormTest={setTestFormTest} noteForm={true} />
                                            : testFormTest.num_sci
                                                ? <StudentTestForm blank={testFormTest} studentId={student.id} setTestFormTest={setTestFormTest} noteForm={true} />
                                                : ""
                                    }
                                </div>
                                : ""
                        }

                    </>
            }




            <div className="">
                <div className=""><Button className="" variant="outlined" onClick={addNote}>{editNote.note ? "Update" : "Add"}</Button></div>
                {editNote.note ? <div className=""><Button className="" variant="outlined" onClick={toggleConfirm}>Delete</Button></div> : ""}
            </div>

            <Dialog open={confirm} toggle={toggleConfirm}>
                Are You Sure?
                <Button onClick={deleteNote}>Yes, Delete Note</Button>
                <Button onClick={toggleConfirm}>Cancel</Button>
            </Dialog>

        </Form>




    )

}