import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const initialEditCivilStatusForm = {
    civilstatusname: "",
    description: ""
}

const EditCivilStatus = () => {

    // CIVIL STATUS
    const [editCivilStatusForm, setEditCivilStatusForm] = useState(initialEditCivilStatusForm)
    const { civilstatusname, description } = editCivilStatusForm

    const navigate = useNavigate()

    const { civilstatusid } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/civilstatus/get/${civilstatusid}`)
        .then((resp) => setEditCivilStatusForm({...resp.data}))

        if (!(localStorage.getItem("lsIsLoggedIn"))) {
            setTimeout(() => navigate(`/login`))
        };
    }, [civilstatusid])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!civilstatusname || !description) {
            toast.error("Please provide value into each input field")
        } else {
            axios
                .put(`http://localhost:3001/civilstatus/update/${civilstatusid}`, {
                    civilstatusname,
                    description
                })
                .then(() => {
                    setEditCivilStatusForm({ civilstatusname: "", description: "" })
                })
                .catch((err) => console.log(err.response.data))
            toast.success("Civil Status Updated Successfully")
            setTimeout(() => navigate('/civilstatus'), 500)
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setEditCivilStatusForm({ ...editCivilStatusForm, [name]: value })
    }

    return (
        <div className="form--background">
            <div className="form--addmaintenance-container">
                <h1 className="form--title">Edit Civil Status</h1>
                <form onSubmit={handleSubmit} autocomplete="off">
                    <p className="form--label">Civil Status Name</p>
                    <input className="form--addmaintenace-input"
                        type="text"
                        id="civilstatusname"
                        name="civilstatusname" 
                        value={civilstatusname || ""}
                        onChange={handleInputChange}
                    />
                    <p className="form--label">Description</p>
                    <textarea className="form--addmaintenance-largeinput"
                        type="text"
                        id="description"
                        name="description" 
                        placeholder="Civil Status Description"
                        value={description || ""}
                        onChange={handleInputChange}
                    />
                    <input className="form--add-submit" type="submit" value="APPLY"/>
                    <Link to='/civilstatus'>
                    <input className="form--back" type="button" value="BACK"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default EditCivilStatus