import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import '../styles/Home.css'

const Home = () => {
    return (
        <div className="home--main">
            <div className="home--menubar">
                <ul>
                    <Link>
                    <li className="menubar--current">
                        <img 
                            src={require('../images/home.png')}
                            className="menubar--icon"
                            alt="phonebook"
                        />
                        Home
                    </li>
                    </Link>
                    <Link>
                    <li>
                        <img 
                            src={require('../images/user.png')}
                            className="menubar--icon"
                            alt="users"
                        />
                        Users
                    </li>
                    </Link>
                    <Link>
                    <li>
                        <img 
                            src={require('../images/phonebook.png')}
                            className="menubar--icon"
                            alt="phonebook"
                        />
                        Phonebook
                    </li>
                    </Link>
                    <Link>
                    <li className="menubar--maintenance">
                        <img 
                            src={require('../images/maintenance.png')}
                            className="menubar--icon"
                            alt="maintenance"
                        />
                        Maintenance
                        <div className="maintenance--submenu">
                            <ul>
                                <Link><li>Religion</li></Link>
                                <Link><li>Nationality</li></Link>
                                <Link><li>Civil Status</li></Link>
                            </ul>
                        </div>
                    </li>
                    </Link>
                    <button className="menubar--logout">
                        <img 
                            src={require('../images/signout.png')}
                            className="menubar--logout-icon"
                            alt="sign out"
                        />
                    </button>
                </ul>
            </div>
            <div>
                <h2>Welcome to the home page</h2>
            </div>
        </div>
    )
}

export default Home