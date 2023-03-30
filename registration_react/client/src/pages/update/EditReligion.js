import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const initialEditReligionForm = {
    religionname: "",
    description: ""
}

const EditReligion = () => {

    // RELIGION
    const [editReligionForm, setEditReligionForm] = useState(initialEditReligionForm)
    const { religionname, description } = editReligionForm

    const navigate = useNavigate()

    const { religionid } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/religion/get/${religionid}`)
        .then((resp) => setEditReligionForm({...resp.data}))
    }, [religionid])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!religionname || !description) {
            toast.error("Please provide value into each input field")
        } else {
            axios
                .put(`http://localhost:5000/religion/update/${religionid}`, {
                    religionname,
                    description
                })
                .then(() => {
                    setEditReligionForm({ religionname: "", description: "" })
                })
                .catch((err) => console.log(err.response.data))
            toast.success("Religion Updated Successfully")
            setTimeout(() => navigate('/religion'), 500)
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setEditReligionForm({ ...editReligionForm, [name]: value })
    }

    return (
        <div className="form--background">
            <div className="form--addmaintenance-container">
                <h1 className="form--title">Edit Religion</h1>
                <form onSubmit={handleSubmit} autocomplete="off">
                    <input className="form--addmaintenace-input"
                        type="text"
                        id="religionname"
                        name="religionname" 
                        placeholder="Religion Name"
                        value={religionname || ""}
                        onChange={handleInputChange}
                    />
                    <textarea className="form--addmaintenance-largeinput"
                        type="text"
                        id="description"
                        name="description" 
                        placeholder="Religion Description"
                        value={description || ""}
                        onChange={handleInputChange}
                    />
                    <input className="form--add-submit" type="submit" value="EDIT"/>
                    <Link to='/religion'>
                    <input className="form--back" type="button" value="BACK"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default EditReligion