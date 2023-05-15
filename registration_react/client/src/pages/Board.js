import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import '../styles/Navbar.css'
import '../styles/Board.css'

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

const Board = () => {

    let sourceList = []
    let destinationList = []

    const [todoData, setTodoData] = useState([])
    const [inprogressData, setInprogressData] = useState([])
    const [fortestingData, setFortestingData] = useState([])
    const [doneData, setDoneData] = useState([])
    const [invalidData, setInvalidData] = useState([])

    const loadTodoData = async () => {
        const response = await axios.get(`http://localhost:3001/task/todo`)
        setTodoData(response.data)
    }

    const loadInprogressData = async () => {
        const response = await axios.get(`http://localhost:3001/task/inprogress`)
        setInprogressData(response.data)
    }

    const loadFortestingData = async () => {
        const response = await axios.get(`http://localhost:3001/task/fortesting`)
        setFortestingData(response.data)
    }

    const loadDoneData = async () => {
        const response = await axios.get(`http://localhost:3001/task/done`)
        setDoneData(response.data)
    }

    const loadInavlidData = async () => {
        const response = await axios.get(`http://localhost:3001/task/invalid`)
        setInvalidData(response.data)
    }

    const navigate = useNavigate()

    const isMountedRef = useRef(false);

    useEffect(() => {
        loadTodoData()
        loadInprogressData()
        loadFortestingData()
        loadDoneData()
        loadInavlidData()

        if (!(localStorage.getItem("lsIsLoggedIn"))) {
            setTimeout(() => navigate(`/login`))
        };

        // SOCKETS FOR REORDER SAME STATUS DATA
        socket.on("receive_changeSameStatusTodo", (data) => {
            setTodoData(data.todoItems)
        })
        socket.on("receive_changeSameStatusInprogress", (data) => {
            setInprogressData(data.inprogressItems)
        })
        socket.on("receive_changeSameStatusFortesting", (data) => {
            setFortestingData(data.fortestingItems)
        })
        socket.on("receive_changeSameStatusDone", (data) => {
            setDoneData(data.doneItems)
        })
        socket.on("receive_changeSameStatusInvalid", (data) => {
            setInvalidData(data.invalidItems)
        })

        // SOCKETS FOR CHANGE DIFFERENT STATUS DATA
        socket.on("receive_changeDiffStatusTodo", (data) => {
            setTodoData(data.Column)
        })
        socket.on("receive_changeDiffStatusInprogress", (data) => {
            setInprogressData(data.Column)
        })
        socket.on("receive_changeDiffStatusFortesting", (data) => {
            setFortestingData(data.Column)
        })
        socket.on("receive_changeDiffStatusDone", (data) => {
            setDoneData(data.Column)
        })
        socket.on("receive_changeDiffStatusInvalid", (data) => {
            setInvalidData(data.Column)
        })

        if (!isMountedRef.current) {
            // do some setup
            socket.on("receive_diffStatusNotification", (data) => {
                toast.info(`Task ${data.TaskId} has been moved from \"${data.Source}\" to \"${data.Destination}\"`) 
            })
            isMountedRef.current = true;
          } else {
            // do some cleanup
          }

    }, [socket])

    const handleLogout = async () => {
        setTimeout(() => navigate(`/login`))
        localStorage.clear()
    }

    const handleOnDragEnd = async (event) => {
        console.log(event)

        var Source
        var Destination

        if (!event.destination) return
        if (event.destination.droppableId === event.source.droppableId &&
            event.destination.index === event.source.index) {
            return
        }

        // IF MOVING TO DIFFERENT STATUS LOGIC
        if (event.source.droppableId !== event.destination.droppableId) {
            await axios.put(`http://localhost:3001/task/movetable/${event.source.droppableId}/${event.destination.droppableId}/${event.draggableId}/${event.destination.index}/${event.source.index}`)

            switch (event.source.droppableId) {
                case "todo":
                    sourceList = todoData
                    Source = "To Do"
                    break
                case "inprogress":
                    sourceList = inprogressData
                    Source = "In Progress"
                    break
                case "fortesting":
                    sourceList = fortestingData
                    Source = "For Testing"
                    break
                case "done":
                    sourceList = doneData
                    Source = "Done"
                    break
                case "invalid":
                    sourceList = invalidData
                    Source = "Invalid"
                    break
                default:
                    return
            }

            switch (event.destination.droppableId) {
                case "todo":
                    destinationList = todoData
                    Destination = "To Do"
                    break
                case "inprogress":
                    destinationList = inprogressData
                    Destination = "In Progress"
                    break
                case "fortesting":
                    destinationList = fortestingData
                    Destination = "For Testing"
                    break
                case "done":
                    destinationList = doneData
                    Destination = "Done"
                    break
                case "invalid":
                    destinationList = invalidData
                    Destination = "Invalid"
                    break
                default:
                    return
            }

            const sourceColumn = Array.from(sourceList)
            const [reorderedItem] = sourceColumn.splice(event.source.index, 1) // ("get index of item being dragged", "remove item from list")
            switch (event.source.droppableId) {
                case "todo":
                    socket.emit("send_changeDiffStatusTodo", { Column: sourceColumn })
                    setTodoData(sourceColumn)
                    break
                case "inprogress":
                    socket.emit("send_changeDiffStatusInprogress", { Column: sourceColumn })
                    setInprogressData(sourceColumn)
                    break
                case "fortesting":
                    socket.emit("send_changeDiffStatusFortesting", { Column: sourceColumn })
                    setFortestingData(sourceColumn)
                    break
                case "done":
                    socket.emit("send_changeDiffStatusDone", { Column: sourceColumn })
                    setDoneData(sourceColumn)
                    break
                case "invalid":
                    socket.emit("send_changeDiffStatusInvalid", { Column: sourceColumn })
                    setInvalidData(sourceColumn)
                    break
                default:
                    return
            }
            
            const destinationColumn = Array.from(destinationList)
            destinationColumn.splice(event.destination.index, 0, reorderedItem) // ("get index of where item is being placed", "remove 0", "add item being dragged")
            switch (event.destination.droppableId) {
                case "todo":
                    socket.emit("send_changeDiffStatusTodo", { Column: destinationColumn })
                    setTodoData(destinationColumn)
                    break
                case "inprogress":
                    socket.emit("send_changeDiffStatusInprogress", { Column: destinationColumn })
                    setInprogressData(destinationColumn)
                    break
                case "fortesting":
                    socket.emit("send_changeDiffStatusFortesting", { Column: destinationColumn })
                    setFortestingData(destinationColumn)
                    break
                case "done":
                    socket.emit("send_changeDiffStatusDone", { Column: destinationColumn })
                    setDoneData(destinationColumn)
                    break
                case "invalid":
                    socket.emit("send_changeDiffStatusInvalid", { Column: destinationColumn })
                    setInvalidData(destinationColumn)
                    break
                default:
                    return
            }

            socket.emit("send_diffStatusNotification", { Source: Source, Destination: Destination, TaskId: event.draggableId})
        } 
        // THIS LOGIC WILL RUN IF REORDERING TO THE SAME STATUS
        else {
            const conditionNum = (event.destination.index - event.source.index)

            if (conditionNum > 0) {
                await axios.put(`http://localhost:3001/task/movedown/${event.draggableId}/${event.destination.index}/${event.source.index}`)
            } 
            else if (conditionNum < 0) {
                await axios.put(`http://localhost:3001/task/moveup/${event.draggableId}/${event.destination.index}/${event.source.index}`)
            }

            switch (event.destination.droppableId) {
                case "todo":
                    // send todoData, event.source.index, event.destination.index
                    // receive processed data to setTodoData

                    const todoItems = Array.from(todoData)
                    const [reorderedTodoItem] = todoItems.splice(event.source.index, 1)
                    todoItems.splice(event.destination.index, 0, reorderedTodoItem)
                    socket.emit("send_changeSameStatusTodo", { todoItems: todoItems })
                    setTodoData(todoItems)
                    break
                case "inprogress":
                    const inprogressItems = Array.from(inprogressData)
                    const [reorderedInprogressItem] = inprogressItems.splice(event.source.index, 1)
                    inprogressItems.splice(event.destination.index, 0, reorderedInprogressItem)
                    socket.emit("send_changeSameStatusInprogress", { inprogressItems: inprogressItems })
                    setInprogressData(inprogressItems)
                    break
                case "fortesting":
                    const fortestingItems = Array.from(fortestingData)
                    const [reorderedFortestingItem] = fortestingItems.splice(event.source.index, 1)
                    fortestingItems.splice(event.destination.index, 0, reorderedFortestingItem)
                    socket.emit("send_changeSameStatusFortesting", { fortestingItems: fortestingItems })
                    setFortestingData(fortestingItems)
                    break
                case "done":
                    const doneItems = Array.from(doneData)
                    const [reorderedDoneItem] = doneItems.splice(event.source.index, 1)
                    doneItems.splice(event.destination.index, 0, reorderedDoneItem)
                    socket.emit("send_changeSameStatusDone", { doneItems: doneItems })
                    setDoneData(doneItems)
                    break
                case "invalid":
                    const invalidItems = Array.from(invalidData)
                    const [reorderedInvalidItem] = invalidItems.splice(event.source.index, 1)
                    invalidItems.splice(event.destination.index, 0, reorderedInvalidItem)
                    socket.emit("send_changeSameStatusInvalid", { invalidItems: invalidItems })
                    setInvalidData(invalidItems)
                    break
                default:
                    return
            }
        }
    }

    return (
        <div className="board--main">
            {/* --- Componentable?? --- */}
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
                    <button className="menubar--logout" onClick={handleLogout}>
                        <img 
                            src={require('../images/signout.png')}
                            className="menubar--logout-icon"
                            alt="sign out"
                        />
                    </button>
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
                        <div>
                            <p className="board--ticket-status-label">TO DO</p>
                            {todoData.length > 1 || todoData.length === 0 ? 
                                <p className="board-ticket-status-count">{todoData.length} TASKS</p> 
                            : 
                                <p className="board-ticket-status-count">{todoData.length} TASK</p>
                            }
                        </div>
                        <Droppable droppableId="todo">
                        {(provided) => (
                            <ul className="statusList" {...provided.droppableProps} ref={provided.innerRef}>
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
                                    )
                                })}
                            {provided.placeholder}
                            </ul>
                        )}
                        </Droppable>
                    </div>
                    
                    
                    <div className="board--ticket-status">
                        <div>
                            <p className="board--ticket-status-label">IN PROGRESS</p>
                            {inprogressData.length > 1 || inprogressData.length === 0 ? 
                                <p className="board-ticket-status-count">{inprogressData.length} TASKS</p> 
                            : 
                                <p className="board-ticket-status-count">{inprogressData.length} TASK</p>
                            }
                        </div>
                        <Droppable droppableId="inprogress">
                        {(provided) => (
                            <ul className="statusList" {...provided.droppableProps} ref={provided.innerRef}>
                                {inprogressData.map((item, index) => {
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
                                    )
                                })}
                            {provided.placeholder}
                            </ul>
                        )}
                        </Droppable>
                    </div>

                    <div className="board--ticket-status">
                        <div>
                            <p className="board--ticket-status-label">FOR TESTING</p>
                            {fortestingData.length > 1 || fortestingData.length === 0 ? 
                                <p className="board-ticket-status-count">{fortestingData.length} TASKS</p> 
                            : 
                                <p className="board-ticket-status-count">{fortestingData.length} TASK</p>
                            }
                        </div>
                        <Droppable droppableId="fortesting">
                        {(provided) => (
                            <ul className="statusList" {...provided.droppableProps} ref={provided.innerRef}>
                                {fortestingData.map((item, index) => {
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
                                    )
                                })}
                            {provided.placeholder}
                            </ul>
                        )}
                        </Droppable>
                    </div>

                    <div className="board--ticket-status">
                        <div>
                            <p className="board--ticket-status-label">DONE</p>
                            {doneData.length > 1 || doneData.length === 0 ? 
                                <p className="board-ticket-status-count">{doneData.length} TASKS</p> 
                            : 
                                <p className="board-ticket-status-count">{doneData.length} TASK</p>
                            }
                        </div>
                        <Droppable droppableId="done">
                        {(provided) => (
                            <ul className="statusList" {...provided.droppableProps} ref={provided.innerRef}>
                                {doneData.map((item, index) => {
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
                                    )
                                })}
                            {provided.placeholder}
                            </ul>
                        )}
                        </Droppable>
                    </div>

                    <div className="board--ticket-status">
                        <div>
                            <p className="board--ticket-status-label">INVALID</p>
                            {invalidData.length > 1 || invalidData.length === 0 ? 
                                <p className="board-ticket-status-count">{invalidData.length} TASKS</p> 
                            : 
                                <p className="board-ticket-status-count">{invalidData.length} TASK</p>
                            }
                        </div>
                        <Droppable droppableId="invalid">
                        {(provided) => (
                            <ul className="statusList" {...provided.droppableProps} ref={provided.innerRef}>
                                {invalidData.map((item, index) => {
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
                                    )
                                })}
                            {provided.placeholder}
                            </ul>
                        )}
                        </Droppable>
                    </div>
                        
                </div> 
            </DragDropContext>
        </div>
    )
}

export default Board