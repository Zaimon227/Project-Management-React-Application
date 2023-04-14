import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const initialAddCivilStatusForm = {
    civilstatusname: "",
    description: ""
}

const AddCivilStatus = () => {

    // CIVIL STATUS
    const [addCivilStatusForm, setAddCivilStatusForm] = useState(initialAddCivilStatusForm)
    const { civilstatusname, description } = addCivilStatusForm

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!civilstatusname || !description) {
            toast.error("Please provide value into each input field")
        } else {
            axios
                .post('http://localhost:5000/civilstatus/add', {
                    civilstatusname,
                    description
                })
                .then(() => {
                    setAddCivilStatusForm({ civilstatusname: "", description: "" })
                })
                .catch((err) => console.log(err.response.data))
            toast.success("Civil Status Added Successfully")
            setTimeout(() => navigate('/civilstatus'), 500)
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setAddCivilStatusForm({ ...addCivilStatusForm, [name]: value})
    }

    return (
        <div className="form--background">
            <div className="form--addmaintenance-container">
                <h1 className="form--title">Add Civil Status</h1>
                <form onSubmit={handleSubmit} autocomplete="off">
                    <p className="form--label">Civil Status Name</p>
                    <input className="form--addmaintenace-input"
                        type="text"
                        id="civilstatusname"
                        name="civilstatusname" 
                        onChange={handleInputChange}
                    />
                    <p className="form--label">Description</p>
                    <textarea className="form--addmaintenance-largeinput"
                        type="text"
                        id="description"
                        name="description" 
                        placeholder="Civil Status Description"
                        onChange={handleInputChange}
                    />
                    <input className="form--add-submit" type="submit" value="ADD"/>
                    <Link to='/civilstatus'>
                    <input className="form--back" type="button" value="BACK"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default AddCivilStatus