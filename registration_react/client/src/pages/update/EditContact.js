import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const initialEditContactForm = {
    name: "",
    address: "",
    email: "",
    contact: ""
}

const EditContact = () => {

    // CONTACT
    const [editContactForm, setEditContactForm] = useState(initialEditContactForm)
    const { name, address, email, contact } = editContactForm

    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/contact/get/${id}`)
        .then((resp) => setEditContactForm({...resp.data}))

        if (!(localStorage.getItem("lsIsLoggedIn"))) {
            setTimeout(() => navigate(`/login`))
        };
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!name || !address || !email || !contact) {
            toast.error("Please provide value into each input field")
        } else {
            axios
                .put(`http://localhost:3001/contact/update/${id}`, {
                    name,
                    address,
                    email,
                    contact
                })
                .then(() => {
                    setEditContactForm({ name: "", address: "", email: "", contact: ""})
                })
                .catch((err) => console.log(err.response.data))
            toast.success("Contact Updated Successfully")
            setTimeout(() => navigate('/phonebook'), 500)
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setEditContactForm({ ...editContactForm, [name]: value })
    }

    return (
        <div className="form--background">
            <div className="form--addcontact-container">
                <h1 className="form--title">Edit Contact</h1>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <p className="form--label">Name</p>
                    <input className="form--addcontact-input"
                        type="text"
                        id="name"
                        name="name"
                        value={name || ""} 
                        onChange={handleInputChange}
                    />
                    <p className="form--label">Address</p>
                    <input className="form--addcontact-input"
                        type="text"
                        id="address"
                        name="address" 
                        value={address || ""} 
                        onChange={handleInputChange}
                    />
                    <p className="form--label">Email</p>
                    <input className="form--addcontact-input" 
                        type="text"
                        id="email"
                        name="email"
                        value={email || ""} 
                        onChange={handleInputChange}
                    />
                    <p className="form--label">Contact Number</p>
                    <input className="form--addcontact-input" 
                        type="text"
                        id="contact"
                        name="contact" 
                        value={contact || ""} 
                        onChange={handleInputChange}
                    />
                    <input className="form--add-submit" type="submit" value="APPLY"/>
                    <Link to='/phonebook'>
                    <input className="form--signup-back" type="button" value="BACK"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default EditContact