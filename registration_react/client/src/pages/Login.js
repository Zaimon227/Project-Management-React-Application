import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import '../styles/Login.css'

const initialLoginForm = {
    email: "",
    password: ""
}

const Login = () => {

    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const [data, setData] = useState([]);
    
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
                .post('http://localhost:5000/user/login', {
                    email,
                    password
                })
                .catch((err) => console.log(err.response.data))
                console.log(data)
                if (response.data.length > 0) {
                    toast.success("Logged in successfully")
                    setTimeout(() => navigate('/home'), 500)
                } else {
                    toast.error("Invalid Credentials")
                } 
        }
    }

    return (
        <div className="form--background">
            <div className="form--container">
                <h1 className="form--title">Welcome!</h1>
                <form onSubmit={handleSubmit}>
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