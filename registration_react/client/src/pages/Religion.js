import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

const Religion = () => {

    // Religion
    const [data, setData] = useState([])

    const loadData = async () => {
        const response = await axios.get(`http://localhost:3001/religion/${page}`)
        setData(response.data)
    }

    const navigate = useNavigate()

    useEffect(() => {
        loadData()
        nextPreviousPageChecker()

        if (!(localStorage.getItem("lsIsLoggedIn"))) {
            setTimeout(() => navigate(`/login`))
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogout = async () => {
        setTimeout(() => navigate(`/login`))
        localStorage.clear()
    }

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
            const check = await axios.get(`http://localhost:3001/religion/${nextPage}`)
            if (check.data.length === 0) {
                setNextButtonStatus(true)
            } else {
                setNextButtonStatus(false)
            }
        } else {
            const check = await axios.get(`http://localhost:3001/religion/${nextPage}/${search}`)
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

    async function handleNextPage() {
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
        const response = await axios.get(`http://localhost:3001/religion/${page}/${search}`)
        setData(response.data)
        nextPreviousPageChecker()
    }

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
            page = 1
            searchData()
        }
    }

    // Delete Religion
    const deleteReligion = (religionid) => {
        if(window.confirm("Are you sure that you want to delete that religion?")){
            axios.delete(`http://localhost:3001/religion/delete/${religionid}`)
            toast.success("Religion Deleted Successfully")
            setTimeout(() => loadData(), 500);
        }
    }

    return (
        <div className="religion--main">
            <div className="menubar">
                <div className="menubar--leftside">
                    <div className="menubar--profile-container">
                        {(!localStorage.getItem("lsProfilePicture")) ? 
                            <img 
                                src={require(`../uploads/defaultProfile.png`)}
                                className="menubar--profile-picture"
                                alt="phonebook"
                            />
                        :
                            <img 
                                src={require(`../uploads/${localStorage.getItem("lsProfilePicture")}`)}
                                className="menubar--profile-picture"
                                alt="phonebook"
                            />
                        }
                        {(!localStorage.getItem("lsUsername")) ?
                            <p className="menubar--profile-username">Username</p>
                        :
                            <p className="menubar--profile-username">{localStorage.getItem("lsUsername")}</p>
                        }
                    </div>
                </div>
                <ul>
                    <Link to="/">
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
                                <Link to="/religion"><li className="menubar--current">Religion</li></Link>
                                <Link to="/nationality"><li>Nationality</li></Link>
                                <Link to="/civilstatus"><li>Civil Status</li></Link>
                            </ul>
                        </div>
                    </li>
                    <button className="menubar--logout" onClick={handleLogout}>
                        <img 
                            src={require('../images/signout.png')}
                            className="menubar--logout-icon"
                            alt="sign out"
                        />
                    </button>
                </ul>
            </div>

            <h2 className="table--title">Religion Table</h2>

            <div className="searchbar">
                <form className="form--search" onSubmit={handleSubmit} autoComplete="off">
                    <input
                        className="form--input-search"
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Religion Name"
                        value={search}
                        onChange={handleInputChange}
                    />
                    <input className="form--submit-search" type="submit" value="Search"/>
                </form>
                <Link to={`/religion/add`}>
                    <button className="button--add">
                        <img 
                            src={require('../images/add.png')}
                            className="button--add-icon"
                            alt="add"
                        />
                    </button>
                </Link>
            </div>

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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => {
                                return (
                                    <tr key={item.religionid}>
                                        <td>{item.religionid}</td>
                                        <td>{item.religionname}</td>
                                        <td className="column--description">{item.description}</td>
                                        <td>{item.created_by}</td>
                                        <td>{format(new Date(item.created_datetime), 'yyyy/mm/dd')}</td>
                                        <td>
                                            <Link to={`/religion/update/${item.religionid}`}>
                                                <button className="table--action-button">
                                                    <img 
                                                        src={require('../images/edit.png')}
                                                        className="table--action-icon"
                                                        alt="edit"
                                                    />
                                                </button>
                                            </Link>
                                                <button className="table--action-button" onClick={() => deleteReligion(item.religionid)}>
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

export default Religion