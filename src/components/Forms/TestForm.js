import { Button, DialogContent, Input, Radio } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useEffect, useState } from "react"


export const TestForm = ({edit, toggleForm}) => {
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    const [test, setTest] = useState({
        "name": "",
        "year": "",
        "numSci": 0
    })

    const handleInputChange = (event) => {
        //! NOT WORKING YET - NEED TO REMEMBER HOW TO USE useRefs for change-handling
        const copy = { ...test }
        const name = event.target.name
        if (name === "name") {
            copy.name = event.target.value
        } else {
            copy.name = parseInt(event.target.value)
        }
        setTest(copy)
    }

    return (

        <DialogContent className="">
            <Input className="" type="text" name="name" defaultValue={test.name} placeholder="Name" onChange={handleInputChange}></Input>
            <Input className="" type="text" name="year" defaultValue={test.year} placeholder="Year" onChange={handleInputChange}></Input>
            <Radio name="numSci" value="6" color="default" onChange={handleInputChange} />
            <Radio name="numSci" value="7" color="default" onChange={handleInputChange} />
            <div className="">
                <div className=""><Button className="" variant="outlined" onClick={() => { }}>{edit? "Update" : "Add"}</Button></div>
                <div className=""><Button className="" variant="outlined" onClick={toggleForm}>Cancel</Button></div>
            </div>
        </DialogContent>


    )

}