import React, { useState, useEffect, useContext } from 'react'
import { Username, ProfilePicture } from '../Context'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import '../styles/Navbar.css'
import '../styles/Home.css'

const Home = () => {

    const { username, setUsername } = useContext(Username)
    const { profilePicture, setProfilePicture } = useContext(ProfilePicture)

    console.log(profilePicture)

    return (
        <div className="home--main">
            {/* --- Componentable?? --- */}
            <div className="menubar">
                <div className="menubar--leftside">
                    <div className="menubar--profile-container">
                        <img 
                            src={require(`../uploads/${localStorage.getItem("lsProfilePicture")}`)}
                            className="menubar--profile-picture"
                            alt="phonebook"
                        />
                        <p className="menubar--profile-username">{localStorage.getItem("lsUsername")}</p>
                    </div>
                </div>
                <ul>
                    <Link to="/home">
                    <li className="menubar--current">
                        <img 
                            src={require('../images/home.png')}
                            className="menubar--icon"
                            alt="phonebook"
                        />
                        Home
                    </li>
                    </Link>
                    <Link to="/board">
                    <li>
                        <img 
                            src={require('../images/board.png')}
                            className="menubar--icon"
                            alt="phonebook"
                        />
                        Board
                    </li>
                    </Link>
                    <Link to="/users">
                    <li>
                        <img 
                            src={require('../images/user.png')}
                            className="menubar--icon"
                            alt="users"
                        />
                        Users
                    </li>
                    </Link>
                    <Link to="/phonebook">
                    <li>
                        <img 
                            src={require('../images/phonebook.png')}
                            className="menubar--icon"
                            alt="phonebook"
                        />
                        Phonebook
                    </li>
                    </Link>
                    <li className="menubar--maintenance">
                        <img 
                            src={require('../images/maintenance.png')}
                            className="menubar--icon"
                            alt="maintenance"
                        />
                        Maintenance
                        <div className="maintenance--submenu">
                            <ul>
                                <Link to="/religion"><li>Religion</li></Link>
                                <Link to="/nationality"><li>Nationality</li></Link>
                                <Link to="/civilstatus"><li>Civil Status</li></Link>
                            </ul>
                        </div>
                    </li>
                    <Link to="/">
                        <button className="menubar--logout">
                            <img 
                                src={require('../images/signout.png')}
                                className="menubar--logout-icon"
                                alt="sign out"
                            />
                        </button>
                    </Link>
                </ul>
            </div>

            <div className="home--content">
                <img 
                    src={require('../images/home2.png')}
                    className="home--icon"
                    alt="home"
                />
                <h2 className="home--greetings">Welcome { username }!</h2>
                <p className="home--about">Manage users, phonebook, religion, nationality, or civil status</p>
            </div>
        </div>
    )
}

export default Home