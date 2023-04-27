import React, { useState, useEffect, useContext } from 'react'
import { Username, ProfilePicture } from '../Context'
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

const CivilStatus = () => {

    const { username, setUsername } = useContext(Username)
    const { profilePicture, setProfilePicture } = useContext(ProfilePicture)

    // Civil Status
    const [data, setData] = useState([])

    const loadData = async () => {
        const response = await axios.get(`http://localhost:5000/civilstatus/${page}`)
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
            const check = await axios.get(`http://localhost:5000/civilstatus/${nextPage}`)
            if (check.data.length == 0) {
                setNextButtonStatus(true)
            } else {
                setNextButtonStatus(false)
            }
        } else {
            const check = await axios.get(`http://localhost:5000/civilstatus/${nextPage}/${search}`)
            if (check.data.length == 0) {
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
        const response = await axios.get(`http://localhost:5000/civilstatus/${page}/${search}`)
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

    // Delete Civil Status
    const deleteCivilStatus = (civilstatusid) => {
        if(window.confirm("Are you sure that you want to delete that civil status?")){
            axios.delete(`http://localhost:5000/civilstatus/delete/${civilstatusid}`)
            toast.success("Civil Status Deleted Successfully")
            setTimeout(() => loadData(), 500);
        }
    }

    return (
        <div className="civilstatus--main">
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
                                <Link to="/nationality"><li>Nationality</li></Link>
                                <Link to="/civilstatus"><li className="menubar--current">Civil Status</li></Link>
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

            <h2 className="table--title">Civil Status Table</h2>

            <div className="searchbar">
                <form className="form--search" onSubmit={handleSubmit} autoComplete="off">
                    <input
                        className="form--input-search"
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Civil Status Name"
                        value={search}
                        onChange={handleInputChange}
                    />
                    <input className="form--submit-search" type="submit" value="Search"/>
                </form>
                <Link to={`/civilstatus/add`}>
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
                                    <tr key={item.civilstatusid}>
                                        <td>{item.civilstatusid}</td>
                                        <td>{item.civilstatusname}</td>
                                        <td className="column--description">{item.description}</td>
                                        <td>{item.created_by}</td>
                                        <td>{format(new Date(item.created_datetime), 'yyyy/mm/dd')}</td>
                                        <td>
                                            <Link to={`/civilstatus/update/${item.civilstatusid}`}>
                                                <button className="table--action-button">
                                                    <img 
                                                        src={require('../images/edit.png')}
                                                        className="table--action-icon"
                                                        alt="edit"
                                                    />
                                                </button>
                                            </Link>
                                                <button className="table--action-button" onClick={() => deleteCivilStatus(item.civilstatusid)}>
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

export default CivilStatus