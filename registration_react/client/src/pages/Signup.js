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
                    <input/>
                    <input/>
                    <input/>
                    <select className="form--signup-gender" id="gender" name="gender">
                        <option value="Male">Male</option>
                        <option value="Gender">Male</option>
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
                    <input/>
                    <input type="password"/>
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