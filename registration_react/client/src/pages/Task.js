import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialTaskDetailsForm = {
    name: "",
    description: "",
    assignee: "",
    reporter: "",
    start: "",
    deadline: "",
}

const Task = () => {

    // RELIGION
    const [taskDetailsForm, setTaskDetailsForm] = useState(initialTaskDetailsForm)
    const { name, description, assignee, reporter, start, deadline } = taskDetailsForm

    const navigate = useNavigate()

    const { taskid } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/task/get/${taskid}`)
        .then((resp) => setTaskDetailsForm({...resp.data}))
    }, [taskid])

    return (
        <div className="form--background">
            <div className="form--task-details-container">
                <h1 className="form--title">Task Details</h1>
                <form autocomplete="off">
                    <div className="form--signup-leftside-contents">
                        <p className="form--task-details-taskid">{taskid}</p>
                        <p className="form--task-details-name">{name}</p>
                        <p className="form--task-details-description">{description}</p>
                        <p className="form--task-details-comments">Comments</p>
                        
                    </div>
                    <div className="form--signup-rightside-contents">
                        <p>Assignee:</p>
                        <p className="form--task-details-assignee">{assignee}</p>
                        <p>Reporter:</p>
                        <p className="form--task-details-reporter">{reporter}</p>
                        <p>Start:</p>
                        <p className="form--task-details-start">{format(new Date(start), 'MMM dd, yyyy')}</p>
                        <p>Deadline:</p>
                        <p className="form--task-details-deadline">{format(new Date(deadline), 'MMM dd, yyyy')}</p>
                        <input className="form--add-submit" type="submit" value="EDIT"/>
                        <Link to='/board'>
                        <input className="form--back" type="button" value="BACK"/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Task