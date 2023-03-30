import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const initialEditNationalityForm = {
    nationalityname: "",
    description: ""
}

const EditNationality = () => {

    // NATIONALITY
    const [editNationalityForm, setEditNationalityForm] = useState(initialEditNationalityForm)
    const { nationalityname, description } = editNationalityForm

    const navigate = useNavigate()

    const { nationalityid } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/nationality/get/${nationalityid}`)
        .then((resp) => setEditNationalityForm({...resp.data}))
    }, [nationalityid])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!nationalityname || !description) {
            toast.error("Please provide value into each input field")
        } else {
            axios
                .put(`http://localhost:5000/nationality/update/${nationalityid}`, {
                    nationalityname,
                    description
                })
                .then(() => {
                    setEditNationalityForm({ nationalityname: "", description: "" })
                })
                .catch((err) => console.log(err.response.data))
            toast.success("Nationality Updated Successfully")
            setTimeout(() => navigate('/nationality'), 500)
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setEditNationalityForm({ ...editNationalityForm, [name]: value })
    }

    return (
        <div className="form--background">
            <div className="form--addmaintenance-container">
                <h1 className="form--title">Edit Nationality</h1>
                <form onSubmit={handleSubmit} autocomplete="off">
                    <input className="form--addmaintenace-input"
                        type="text"
                        id="nationalityname"
                        name="nationalityname" 
                        placeholder="Nationality Name"
                        value={nationalityname || ""}
                        onChange={handleInputChange}
                    />
                    <textarea className="form--addmaintenance-largeinput"
                        type="text"
                        id="description"
                        name="description" 
                        placeholder="Nationality Description"
                        value={description || ""}
                        onChange={handleInputChange}
                    />
                    <input className="form--add-submit" type="submit" value="EDIT"/>
                    <Link to='/nationality'>
                    <input className="form--back" type="button" value="BACK"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default EditNationality