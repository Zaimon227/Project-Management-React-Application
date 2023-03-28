import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

import '../styles/Navbar.css'
import '../styles/Table.css'
import '../styles/Search.css'

const initialSearchForm = {
    search: ""
}

const Nationality = () => {

    // Nationality
    const [data, setData] = useState([])

    const loadData = async () => {
        const response = await axios.get(`http://localhost:5000/nationality/${pageNumber}`)
        setData(response.data)
    }

    useEffect(() => {
        loadData();
    }, [])

    // Pagination
    const [pageNumber, setPageNumber] = useState(1)

    // Search
    const [searchForm, setSearchForm] = useState(initialSearchForm);
    const { search } = searchForm

    // this listens and assigns the inputs from the search form
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setSearchForm({ ...searchForm, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!search) {
            loadData()
        } else {
            setPageNumber(1)
            const response = await axios
            .get(`http://localhost:5000/nationality/${pageNumber}/${search}`)
            setData(response.data)
        }
    }

    return (
        <div className="nationality--main">
            <div className="menubar">
                <ul>
                    <Link to="/home">
                    <li>
                        <img 
                            src={require('../images/home.png')}
                            className="menubar--icon"
                            alt="phonebook"
                        />
                        Home
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
                    <li className="menubar--maintenance menubar--current">
                        <img 
                            src={require('../images/maintenance.png')}
                            className="menubar--icon"
                            alt="maintenance"
                        />
                        Maintenance
                        <div className="maintenance--submenu">
                            <ul>
                                <Link to="/religion"><li>Religion</li></Link>
                                <Link to="/nationality"><li className="menubar--current">Nationality</li></Link>
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
            <h2 className="table--title">Nationality Table</h2>

            <form className="form--search" onSubmit={handleSubmit} autoComplete="off">
                <input
                    className="form--input-search"
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Name"
                    value={search}
                    onChange={handleInputChange}
                />
                <input className="form--submit-search" type="submit" value="Search"/>
            </form>

            <div className="main--container">
                <div className="table--container">
                    <table className="table--general">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th className="column--description">Description</th>
                                <th>Created By</th>
                                <th>Created Date Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => {
                                return (
                                    <tr key={item.nationalityid}>
                                        <td>{item.nationalityid}</td>
                                        <td>{item.nationalityname}</td>
                                        <td className="column--description">{item.description}</td>
                                        <td>{item.created_by}</td>
                                        <td>{item.created_datetime}</td>
                                        <td>
                                            <Link>
                                                <button className="table--action-button">
                                                    <img 
                                                        src={require('../images/edit.png')}
                                                        className="table--action-icon"
                                                        alt="edit"
                                                    />
                                                </button>
                                            </Link>
                                                <button className="table--action-button">
                                                    <img 
                                                        src={require('../images/delete.png')}
                                                        className="table--action-icon"
                                                        alt="delete"
                                                    />
                                                </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Nationality