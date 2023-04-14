import React, { useState, useEffect, useContext } from 'react'
import { Username, ProfilePicture } from '../../Context'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import '../../styles/Signup.css'
import '../../styles/Form.css'

const initialAddTaskForm = {
    name: "",
    description: "",
    taskstatus: "",
    assignee: "",
    reporter: "",
    deadline: ""
}

const AddTask = () => {

    const { username, setUsername } = useContext(Username)
    const { profilePicture, setProfilePicture } = useContext(ProfilePicture)

    const navigate = useNavigate()

    // User fetch for select options
    const [userData, setUserData] = useState([])

    const loadUserData = async () => {
        const response = await axios.get(`http://localhost:5000/user`)
        setUserData(response.data)
    }

    useEffect(() => {
        loadUserData()
    }, [])

    // Add Task Form
    const [addTaskForm, setAddTaskForm] = useState(initialAddTaskForm);
    const { name, description, taskstatus, assignee, reporter, deadline } = addTaskForm

    // this listens and assigns the inputs from the search form
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setAddTaskForm({ ...addTaskForm, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!name || !description || !taskstatus || !assignee || !reporter || !deadline) {
            toast.error("Missing some input field/s!")
        } else {
            axios
                .post('http://localhost:5000/task/add', {
                    name,
                    description,    
                    taskstatus,
                    assignee,
                    reporter,
                    deadline
                })
                .then(() => {
                    setAddTaskForm({
                        name: "",
                        description: "",
                        taskstatus: "",
                        assignee: "",
                        reporter: "",
                        deadline: ""
                    })
                })
                .catch((err) => console.log(err.response.data))
                toast.success("Task Created!") 
            setTimeout(() => navigate('/board'), 500)
        }
    }

    return (
        <div className="form--background">
            <div className="form--addtask-container">
                <h1 className="form--title">Create Task</h1>
                <form onSubmit={handleSubmit}>
                    <input className="form--addtask-input"
                        type="text"
                        id="name"
                        name="name" 
                        placeholder="Task Name"
                        onChange={handleInputChange}
                    />
                    <textarea className="form--addtask-largeinput"
                        type="text"
                        id="description"
                        name="description" 
                        placeholder="Task Description"
                        onChange={handleInputChange}
                    />
                    <select className="form--addtask-select" id="userid" name="userid"  onChange={handleInputChange}>
                                <option hidden disabled selected value>Assignee</option>
                        {userData.map((item) => {
                            return (
                                <option key={item.userid} value={item.userid}>{item.firstname} {item.lastname}</option>
                            )
                        })}
                    </select>
                    <input className="form--addtask-datepicker" 
                        type="date" 
                        id="deadline"
                        name="deadline" 
                        onChange={handleInputChange}
                    />
                    <div>
                        <input className="form--addtask-submit" type="submit" value="CREATE"/>
                        <Link to='/board'>
                        <input className="form--addtask-back" type="button" value="BACK"/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask