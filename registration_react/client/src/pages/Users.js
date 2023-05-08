import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import axios from 'axios'

import '../styles/Navbar.css'
import '../styles/Table.css'
import '../styles/Search.css'
import '../styles/Pagination.css'

const initialSearchForm = {
    search: ""
}

var page = 1

const Users = () => {

    // Users
    const [data, setData] = useState([])

    const loadData = async () => {
        const response = await axios.get(`http://localhost:5000/user/${page}`)
        setData(response.data)
    }

    useEffect(() => {
        loadData()
        nextPreviousPageChecker()
    }, [])

    // Pagination
    const [previousButtonStatus, setPreviousButtonStatus] = useState(true)
    const [nextButtonStatus, setNextButtonStatus] = useState(true)

    const nextPreviousPageChecker = async () => {
        let previousPage = page - 1
        if (previousPage <= 0) {
            setPreviousButtonStatus(true)
        } else {
            setPreviousButtonStatus(false)
        }

        let nextPage = page + 1
        if (!search) {
            const check = await axios.get(`http://localhost:5000/user/${nextPage}`)
            if (check.data.length === 0) {
                setNextButtonStatus(true)
            } else {
                setNextButtonStatus(false)
            }
        } else {
            const check = await axios.get(`http://localhost:5000/user/${nextPage}/${search}`)
            if (check.data.length === 0) {
                setNextButtonStatus(true)
            } else {
                setNextButtonStatus(false)
            }
        }
    }

    async function handlePreviousPage() {
        page -= 1
        if (!search) {     
            loadData()
        } else {
            searchData()
        }
        nextPreviousPageChecker()
    }

    async function handleNextPage()  {
        page += 1
        if (!search) {
            loadData()
        } else {
            searchData()
        }
        nextPreviousPageChecker()
    }

    // Search
    const [searchForm, setSearchForm] = useState(initialSearchForm);
    const { search } = searchForm

    const searchData = async () => {
        const response = await axios.get(`http://localhost:5000/user/${page}/${search}`)
        setData(response.data)
        nextPreviousPageChecker()
    }

    // this listens and assigns the inputs from the search form
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setSearchForm({ ...searchForm, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!search) {
            loadData()
        } else {
            page = 1
            searchData()
        }
    }

    // Delete Religion
    const deleteUser = (userid) => {
        if(window.confirm("Are you sure that you want to delete that user?")){
            axios.delete(`http://localhost:5000/user/delete/${userid}`)
            toast.success("User Deleted Successfully")
            setTimeout(() => loadData(), 500);
        }
    }

    return (
        <div className="home--main">
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
                    <li>
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
                    <li className="menubar--current">
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

            <h2 className="table--title">Users Table</h2>

            <form className="form--search" onSubmit={handleSubmit} autoComplete="off">
                <input
                    className="form--input-search"
                    type="text"
                    id="search"
                    name="search"
                    placeholder="First Name"
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
                                <th>Complete Name</th>
                                <th>Gender</th>
                                <th>Birthdate</th>
                                <th>Religion</th>
                                <th>Nationality</th>
                                <th>Civil Status</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => {
                                return (
                                    <tr key={item.userid}>
                                        <td>{item.userid}</td>
                                        <td>
                                            <div className="table--profile-container">
                                                { item.profilepicture !== null &&
                                                <img 
                                                    src={require(`../uploads/${item.profilepicture}`)}
                                                    className="table--profile-picture"
                                                    alt="profile"
                                                />
                                                }
                                                { item.profilepicture == null &&
                                                <img 
                                                    src={require(`../uploads/defaultProfile.png`)}
                                                    className="table--profile-picture"
                                                    alt="profile"
                                                />
                                                }
                                                {item.completename}
                                            </div>
                                        </td>
                                        <td>{item.gender}</td>
                                        <td>{format(new Date(item.birthdate), 'MMM dd, yyyy')}</td>
                                        <td>{item.religionname}</td>
                                        <td>{item.nationalityname}</td>
                                        <td>{item.civilstatusname}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <Link to={`/users/profile/${item.userid}`}>
                                            <button className="table--action-button">
                                                <img 
                                                    src={require('../images/profile.png')}
                                                    className="table--action-icon"
                                                    alt="profile"
                                                />
                                            </button>
                                            </Link>
                                            <button className="table--action-button" onClick={() => deleteUser(item.userid)}>
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

                <div className="pagination--container">
                    <button disabled={previousButtonStatus} className="pagination--button-previous" onClick={handlePreviousPage}>
                        <img 
                            src={require('../images/previous.png')}
                            className="pagination--navigate-icon"
                            alt="delete"
                        />
                    </button>
                    <h3 className="pagination--pagenumber">Page {page}</h3>
                    <button disabled={nextButtonStatus} className="pagination--button-next" onClick={handleNextPage}>
                        <img 
                            src={require('../images/next.png')}
                            className="pagination--navigate-icon"
                            alt="delete"
                        />
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default Users