import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { format } from 'date-fns'
import { toast } from 'react-toastify'

const initialEditTaskForm = {
    name: "",
    description: "",
    taskstatus: "",
    assignee: "",
    deadline: "",
    ordernum: "",
}


const EditTask = () => {

    // TASK
    const [editTaskForm, setEditTaskForm] = useState(initialEditTaskForm)
    const { name, description, taskstatus, assignee, deadline, ordernum } = editTaskForm

    const [oldTaskStatus, setOldTaskStatus] = useState("")

    const navigate = useNavigate()

    const { taskid } = useParams()

    // fetch for task details
    const loadTaskData = async () => {
        axios.get(`http://localhost:3001/task/get/${taskid}`)
        .then((resp) => setEditTaskForm({...resp.data}))

        axios.get(`http://localhost:3001/task/taskstatus/${taskid}`)
        .then((resp) => setOldTaskStatus(resp.data))
    }

    console.log("oldTaskStatus")
    console.log(oldTaskStatus)

    // User fetch for select options
    const [userData, setUserData] = useState([])

    const loadUserData = async () => {
        const response = await axios.get(`http://localhost:3001/user`)
        setUserData(response.data)
    }

    useEffect(() => {
        loadTaskData()
        loadUserData()

        if (!(localStorage.getItem("lsIsLoggedIn"))) {
            setTimeout(() => navigate(`/login`))
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskid])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!name || !description || !assignee || !deadline) {
            toast.error("Please provide value into each input field")
        } else {
            axios
                .put(`http://localhost:3001/task/update/${taskid}`, {
                    name,
                    description,
                    taskstatus,
                    oldTaskStatus,
                    assignee,
                    deadline,
                    ordernum
                })
                .then(() => {
                    setEditTaskForm({ name: "", description: "", taskstatus: "", assignee: "", deadline: ""})
                })
                .catch((err) => console.log(err.response.data))
            toast.success("Task Updated Successfully")
            setTimeout(() => navigate(`/task/${taskid}`), 500)
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setEditTaskForm({ ...editTaskForm, [name]: value })
    }

    return (
        <div className="form--background">
            <div className="form--edittask-container">
                <h1 className="form--title">Create Task</h1>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <p className="form--label">Task Name</p>
                    <input className="form--addtask-input"
                        type="text"
                        id="name"
                        name="name" 
                        value={name || ""} 
                        onChange={handleInputChange}
                    />
                    <p className="form--label">Task Description</p>
                    <textarea className="form--addtask-largeinput"
                        type="text"
                        id="description"
                        name="description"
                        value={description || ""}  
                        onChange={handleInputChange}
                    />
                    <p className="form--label">Task Status</p>
                    <select className="form--addtask-select" id="taskstatus" name="taskstatus"  onChange={handleInputChange}>
                        {taskstatus === "todo" && <option value="todo" defaultValue>To Do</option> }
                        {taskstatus === "inprogress" && <option value="inprogress" defaultValue>In Progress</option> }
                        {taskstatus === "fortesting" && <option value="fortesting" defaultValue>For Testing</option> }
                        {taskstatus === "done" && <option value="done" defaultValue>Done</option> }
                        {taskstatus === "invalid" && <option value="invalid" defaultValue>Invalid</option> }

                        <option key="1" value="todo">To Do</option>
                        <option key="2" value="inprogress">In Progress</option>
                        <option key="3" value="fortesting">For Testing</option>
                        <option key="4" value="done">Done</option>
                        <option key="5" value="invalid">Invalid</option>
                    </select>
                    <p className="form--label">Assignee</p>
                    <select className="form--addtask-select" id="assignee" name="assignee"  onChange={handleInputChange}>
                                <option value>{assignee || ""}</option>
                        {userData.map((item) => {
                            return (
                                <option key={item.userid} value={item.firstname + " " + item.lastname}>{item.firstname} {item.lastname}</option>
                            )
                        })}
                    </select>
                    <p className="form--label">Deadline</p>
                    <input className="form--addtask-datepicker" 
                        type="date" 
                        id="deadline"
                        name="deadline" 
                        value={ deadline ? format(new Date(deadline), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd")}
                        onChange={handleInputChange}
                    />
                    <div>
                        <input className="form--addtask-submit" type="submit" value="APPLY"/>
                        <Link to={`/task/${taskid}`}>
                        <input className="form--addtask-back" type="button" value="BACK"/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTask