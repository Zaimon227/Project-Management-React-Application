import React, { useState, useEffect, useContext } from 'react'
import { Username, ProfilePicture } from '../Context'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import '../styles/Navbar.css'
import '../styles/Board.css'

const Board = () => {

    const { username, setUsername } = useContext(Username)
    const { profilePicture, setProfilePicture } = useContext(ProfilePicture)

    const [todoData, setTodoData] = useState([])
    
    const [nationalityData, setNationalityData] = useState([])
    const [civilstatusData, setCivilStatusData] = useState([])

    const loadTodoData = async () => {
        const response = await axios.get(`http://localhost:5000/task/todo`)
        setTodoData(response.data)
    }

    useEffect(() => {
        loadTodoData()
    }, [])

    const handleOnDragEnd = (event) => {
        if (!event.destination) return

        const items = Array.from(todoData)
        const [reorderedItem] = items.splice(event.source.index, 1)
        items.splice(event.destination.index, 0, reorderedItem)

        setTodoData(items)
    }

    return (
        <div className="board--main">
            {/* --- Componentable?? --- */}
            <div className="menubar">
                <div className="menubar--leftside">
                    <div className="menubar--profile-container">
                        <img 
                            src={require(`../uploads/${profilePicture}`)}
                            className="menubar--profile-picture"
                            alt="phonebook"
                        />
                        <p className="menubar--profile-username">{username}</p>
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
                    <li className="menubar--current">
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

            <div className="board--create-task-container">
                <Link to='/board/add'>
                <button className="button--add-task">
                    <img 
                        src={require('../images/add2.png')}
                        className="button--add-icon-task"
                        alt="add task"
                    />
                    Create Task
                </button>
                </Link>
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="board--main-container">
                    <div className="board--ticket-status">
                        <p className="board--ticket-status-label">TO DO</p>
                        <Droppable droppableId="todoList">
                            {(provided) => (
                                <ul className="todoList" {...provided.droppableProps} ref={provided.innerRef}>
                                {todoData.map((item, index) => {
                                    return (
                                        <Draggable key={item.taskid} draggableId={`${item.taskid}`} index={index}>
                                            {(provided) => (
                                                <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <div className="board--ticket-container">
                                                    <Link to={`/task/${item.taskid}`}>
                                                        <button className="board--details-button">
                                                            <img 
                                                                src={require('../images/details.png')}
                                                                className="board--details-icon"
                                                                alt="phonebook"
                                                            />
                                                        </button>
                                                    </Link>
                                                    <p className="board--ticket-container-taskname">{item.name}</p>
                                                    <p className="board--ticket-container-deadline">{format(new Date(item.deadline), 'MMM dd, yyyy')}</p>
                                                    <p className="board--ticket-container-taskid">{item.taskid}</p>
                                                    <p className="board--ticket-container-assignee">{item.assignee}</p>
                                                    </div>
                                                </li>
                                            )}
                                        </Draggable>
                                        //<option key={item.religionid} value={item.religionid}>{item.religionname}</option>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                    <div className="board--ticket-status">
                        <p className="board--ticket-status-label">IN PROGRESS</p>
                    </div>
                    <div className="board--ticket-status">
                        <p className="board--ticket-status-label">FOR TESTING</p>
                    </div>
                    <div className="board--ticket-status">
                        <p className="board--ticket-status-label">DONE</p>
                    </div>
                    <div className="board--ticket-status">
                        <p className="board--ticket-status-label">INVALID</p>
                    </div>
                </div> 
            </DragDropContext>
        </div>
    )
}

export default Board