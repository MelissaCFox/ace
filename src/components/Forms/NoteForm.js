import { Form, InputGroup, InputGroupText, Input, Button, Label, FormGroup } from 'reactstrap';

import React, { useEffect, useState } from "react"
import NoteRepository from '../../repositories/NoteRepository';
import { Dialog } from '@material-ui/core';


export const NoteForm = ({ toggleNoteForm, alertNewInfo, student, editNote }) => {
    const [confirm, setConfirm] = useState(false)
    const toggleConfirm = () => setConfirm(!confirm)
    const [note, setNote] = useState({
        "studentId": "",
        "note": "",
        "pinned": false
    })

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
                    : <FormGroup check>
                        <Label check>
                            <Input type="checkbox" checked={note.pinned ? "checked" : ""} onChange={() => {
                                const copy = { ...note }
                                copy.pinned = !copy.pinned
                                setNote(copy)
                            }} />
                            Pin Note?
                        </Label>
                    </FormGroup>
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