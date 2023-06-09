import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'
import '../../styles/Form.css'

const initialAddContactForm = {
    name: "",
    address: "",
    email: "",
    contact: ""
}

const AddContact = () => {

    // CONTACT
    const [addContactForm, setAddContactForm] = useState(initialAddContactForm);
    const { name, address, email, contact } = addContactForm

    const navigate = useNavigate()

    useEffect(() => {
        if (!(localStorage.getItem("lsIsLoggedIn"))) {
            setTimeout(() => navigate(`/login`))
        };
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!name || !address || !email || !contact) {
            toast.error("Please provide value into each input field")
        } else {
            axios
                .post('http://localhost:3001/contact/add', {
                    name,
                    address,    
                    email,
                    contact
                })
                .then(() => {
                    setAddContactForm({ name: "", address: "", email: "", contact: ""})
                })
                .catch((err) => console.log(err.response.data))
            toast.success("Contact Added Successfully") 
            setTimeout(() => navigate('/phonebook'), 500)
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setAddContactForm({ ...addContactForm, [name]: value })
    }

    return (
        <div className="form--background">
            <div className="form--addcontact-container">
                <h1 className="form--title">Add Contact</h1>
                <form onSubmit={handleSubmit} autocomplete="off">
                    <p className="form--label">Name</p>
                    <input className="form--addcontact-input"
                        type="text"
                        id="name"
                        name="name" 
                        onChange={handleInputChange}
                    />
                    <p className="form--label">Address</p>
                    <input className="form--addcontact-input"
                        type="text"
                        id="address"
                        name="address" 
                        onChange={handleInputChange}
                    />
                    <p className="form--label">Email</p>
                    <input className="form--addcontact-input"
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleInputChange}
                    />
                    <p className="form--label">Contact Number</p>
                    <input className="form--addcontact-input" 
                        type="text"
                        id="contact"
                        name="contact" 
                        onChange={handleInputChange}
                    />
                    <input className="form--add-submit" type="submit" value="ADD"/>
                    <Link to='/phonebook'>
                    <input className="form--signup-back" type="button" value="BACK"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default AddContact