import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import '../styles/Login.css'

const Login = () => {
    return (
        <div className="form--background">
            <div className="form--container">
                <h1 className="form--title">Welcome!</h1>
                <form>
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