import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import '../styles/Signup.css'

const Login = () => {
    return (
        <div className="form--background">
            <div className="form--signup-container">
                <h1 className="form--title">Sign up</h1>
                <form>
                    <input className="form--signup-input"
                        type="text"
                        id="firstname"
                        name="firstname" 
                        placeholder="First Name"
                    />
                    <input className="form--signup-input"
                        type="text"
                        id="middlename"
                        name="middlename" 
                        placeholder="Middle Name"
                    />
                    <input className="form--signup-input"
                        type="text"
                        id="lastname"
                        name="lastname" 
                        placeholder="Last Name"
                    />
                    <select className="form--signup-gender" id="gender" name="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input className="form--signup-datepicker" type="date"/>
                    <select className="form--signup-select" id="gender" name="gender">
                        <option value="Male">Male</option>
                        <option value="Gender">Male</option>
                    </select>
                    <select className="form--signup-select" id="gender" name="gender">
                        <option value="Male">Male</option>
                        <option value="Gender">Male</option>
                    </select>
                    <select className="form--signup-select" id="gender" name="gender">
                        <option value="Male">Male</option>
                        <option value="Gender">Male</option>
                    </select>
                    <input className="form--signup-input"
                        type="text"
                        id="email"
                        name="email" 
                        placeholder="Email"
                    />
                    <input className="form--signup-input" 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                    />
                    <input className="form--signup-input" 
                        type="password"
                        id="confirmpassword"
                        name="confirmpassword" 
                        placeholder="Confirm Password"
                    />
                    <input className="form--signup-submit" type="submit" value="SIGN UP"/>
                    <Link to='/'>
                    <input className="form--signup-back" type="button" value="BACK"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login