import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import '../styles/Login.css'

const initialLoginForm = {
    email: "",
    password: ""
}

const Login = () => {

    const [loginForm, setLoginForm] = useState(initialLoginForm)
    
    const { email, password } = loginForm

    const navigate = useNavigate()

    // this listens and assigns the inputs from the form
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setLoginForm({ ...loginForm, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!email || !password) {
            toast.error("Please provide value to each input field")
        } else {
            const response = await axios
                .post('http://localhost:3001/user/login', {
                    email,
                    password
                })
                .catch((err) => console.log(err.response.data))
                if (response.data.body.length > 0) {
                    const firstlastname = response.data.body[0].firstname + " " + response.data.body[0].lastname

                    localStorage.setItem("lsProfilePicture", response.data.body[0].profilepicture)
                    localStorage.setItem("lsUsername", firstlastname)
                    localStorage.setItem("lsIsLoggedIn", "true")
                    
                    setTimeout(() => navigate('/'), 500)
                } else {
                    toast.error("Invalid Credentials")
                } 
        }
    }

    return (
        <div className="form--background">
            <div className="form--container">
                <h1 className="form--title">Welcome!</h1>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        id="password"
                        name="password" 
                        placeholder="Password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    <input className="form--submit" type="submit" value="LOGIN"/>
                    <br/>
                    <label className="form--signuplabel">Don't have an account yet?</label>
                    <Link to='/signup'>
                    <input className="form--signup" type="button" value="Signup"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login