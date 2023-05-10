import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const initialAddNationalityForm = {
    nationalityname: "",
    description: ""
}

const AddNationality = () => {

    // NATIONALITY
    const [addNationalityForm, setAddNationalityForm] = useState(initialAddNationalityForm)
    const { nationalityname, description } = addNationalityForm

    const navigate = useNavigate()

    useEffect(() => {
        if (!(localStorage.getItem("lsIsLoggedIn"))) {
            setTimeout(() => navigate(`/login`))
        };
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!nationalityname || !description) {
            toast.error("Please provide value into each input field")
        } else {
            axios
                .post('http://localhost:3001/nationality/add', {
                    nationalityname,
                    description
                })
                .then(() => {
                    setAddNationalityForm({ nationalityname: "", description: "" })
                })
                .catch((err) => console.log(err.response.data))
            toast.success("Nationality Added Successfully")
            setTimeout(() => navigate('/nationality'), 500)
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setAddNationalityForm({ ...addNationalityForm, [name]: value})
    }

    return (
        <div className="form--background">
            <div className="form--addmaintenance-container">
                <h1 className="form--title">Add Nationality</h1>
                <form onSubmit={handleSubmit} autocomplete="off">
                    <p className="form--label">Nationality Name</p>
                    <input className="form--addmaintenace-input"
                        type="text"
                        id="nationalityname"
                        name="nationalityname" 
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
                    <Link to='/nationality'>
                    <input className="form--back" type="button" value="BACK"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default AddNationality