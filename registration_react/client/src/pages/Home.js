import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import '../styles/Home.css'

const Home = () => {
    return (
        <div>
            <div className="home--menubar">
                <ul>
                    <Link>
                    <li>Home</li>
                    </Link>
                    <Link>
                    <li>Users</li>
                    </Link>
                    <Link>
                    <li>Phonebook</li>
                    </Link>
                    <Link>
                    <li>Maintenance</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Home