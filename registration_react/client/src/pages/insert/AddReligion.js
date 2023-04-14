import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const initialAddReligionForm = {
    religionname: "",
    description: ""
}

const AddReligion = () => {

    // RELIGION
    const [addReligionForm, setAddReligionForm] = useState(initialAddReligionForm)
    const { religionname, description } = addReligionForm

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!religionname || !description) {
            toast.error("Please provide value into each input field")
        } else {
            axios
                .post('http://localhost:5000/religion/add', {
                    religionname,
                    description
                })
                .then(() => {
                    setAddReligionForm({ religionname: "", description: "" })
                })
                .catch((err) => console.log(err.response.data))
            toast.success("Religion Added Successfully")
            setTimeout(() => navigate('/religion'), 500)
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setAddReligionForm({ ...addReligionForm, [name]: value })
    }
    return (
        <div className="form--background">
            <div className="form--addmaintenance-container">
                <h1 className="form--title">Add Religion</h1>
                <form onSubmit={handleSubmit} autocomplete="off">
                    <p className="form--label">Religion Name</p>
                    <input className="form--addmaintenace-input"
                        type="text"
                        id="religionname"
                        name="religionname" 
                        onChange={handleInputChange}
                    />
                    <p className="form--label">Description</p>
                    <textarea className="form--addmaintenance-largeinput"
                        type="text"
                        id="description"
                        name="description" 
                        onChange={handleInputChange}
                    />
                    <input className="form--add-submit" type="submit" value="ADD"/>
                    <Link to='/religion'>
                    <input className="form--back" type="button" value="BACK"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default AddReligion