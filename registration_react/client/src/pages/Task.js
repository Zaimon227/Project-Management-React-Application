import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Username } from '../Context'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialTaskDetailsForm = {
    name: "",
    description: "",
    assignee: "",
    reporter: "",
    start: "",
    deadline: "",
    comments: "",
}

const initialCommentForm = {
    comment: ""
}

const Task = () => {

    const { username, setUsername } = useContext(Username)

    // TASK
    const [taskDetailsForm, setTaskDetailsForm] = useState(initialTaskDetailsForm)
    const { name, description, assignee, reporter, start, deadline, comments } = taskDetailsForm

    // COMMENTS
    const [commentForm, setCommentForm] = useState(initialCommentForm)
    const {comment} = commentForm
    // const CommentsObj = JSON.parse(comments)

    const navigate = useNavigate()

    const { taskid } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/task/get/${taskid}`)
        .then((resp) => setTaskDetailsForm({...resp.data}))
    }, [taskid])

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setCommentForm({ ...commentForm, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const commenter = username
        if(!comment) {
            toast.error("Empty comment!")
        } else {
            axios
                .put(`http://localhost:5000/task/${taskid}/comment`, {
                    comment,
                    commenter
                })
                .then(() => {
                    setCommentForm({
                        comment: "",
                        commenter: ""
                    })
                })
                .catch((err) => console.log(err.response.data))
                toast.success("Comment Applied!")
        }
    }

    return (
        <div className="form--background">
            <div className="form--task-details-container">
                <h1 className="form--title">Task Details</h1>
                    <div className="form--task-leftside-contents">
                        <p className="form--task-details-taskid">{taskid}</p>
                        <p className="form--task-details-name">{name}</p>
                        <p className="form--task-details-description">{description}</p>
                        <div className="form--task-details-attachments-container">
                            <p className="form--task-details-attachments">Attachments</p>
                            <button className="form-attachments-button">
                                <img 
                                    src={require('../images/attachment.png')}
                                    className="form-attachment-icon"
                                    alt="phonebook"
                                />
                            </button>
                        </div>
                        <div className="form--task-details-comments-container">
                            <p className="form--task-details-comments">Comments</p>
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <input 
                                    className="form--input-comment" 
                                    type="text"
                                    name="comment"
                                    placeholder="Type comment here"
                                    onChange={handleInputChange}
                                />
                                <input className="form--comment-submit" type="submit" value="Comment"/>
                            </form>
                            
                                {/* {CommentsObj.map((item) => {
                                    return (
                                        <option key={item.index} value={item.comment + " " + item.lastname}>{item.firstname} {item.lastname}</option>
                                    )
                                })} */}
                            <div className="comment-component">
                                <p className="comment-commenter">Firstname Lastname</p>
                                <p className="comment-text">Testing a long string for comment. Now im putting random words that comes into my mind. I want to eat pizza</p>
                            </div>
                            <div className="comment-component">
                                <p className="comment-commenter">Firstname Lastname</p>
                                <p className="comment-text">Testing a long string for comment. Now im putting random words that comes into my mind. I want to eat pizza</p>
                            </div>
                            <div className="comment-component">
                                <p className="comment-commenter">Firstname Lastname</p>
                                <p className="comment-text">Testing a long string for comment. Now im putting random words that comes into my mind. I want to eat pizza</p>
                            </div>
                            <div className="comment-component">
                                <p className="comment-commenter">Firstname Lastname</p>
                                <p className="comment-text">Testing a long string for comment. Now im putting random words that comes into my mind. I want to eat pizza</p>
                            </div>
                        </div>
                    </div>
                    <div className="form--task-rightside-contents">
                        <div className="form--task-rightside-inner-container">
                            <p className="form--task-details-label">Assignee:</p>
                            <p className="form--task-details-assignee">{assignee}</p>

                            <p className="form--task-details-label">Reporter:</p>
                            <p className="form--task-details-reporter">{reporter}</p>

                            <br/>

                            <p className="form--task-details-label">Start:</p>
                            <p className="form--task-details-start">{!start ? start : format(new Date(start), 'MMM dd, yyyy')}</p>

                            <p className="form--task-details-label">Deadline:</p>
                            <p className="form--task-details-deadline">{!deadline ? deadline: format(new Date(deadline), 'MMM dd, yyyy')}</p>
                        </div>
                        <button className="form--task-edit">EDIT</button>
                        <Link to='/board'>
                        <button className="form--task-back">BACK</button>
                        </Link>
                    </div>
            </div>
        </div>
    )
}

export default Task