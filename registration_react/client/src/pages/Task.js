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
    deadline: ""
}

const initialCommentForm = {
    comment: ""
}

const Task = () => {

    const username = localStorage.getItem("lsUsername")

    // TASK
    const [taskDetailsForm, setTaskDetailsForm] = useState(initialTaskDetailsForm)
    const { name, description, assignee, reporter, start, deadline } = taskDetailsForm

    // COMMENTS
    const [commentForm, setCommentForm] = useState(initialCommentForm)
    const {comment} = commentForm

    const [commentData, setCommentData] = useState([])
    const [addCommentData, setAddCommentData] = useState([])

    // ATTACHMENTS
    const [attachmentData, setAttachmentData] = useState([])

    const loadTaskData = async () => {
        await axios.get(`http://localhost:3001/task/get/${taskid}`)
        .then((resp) => setTaskDetailsForm({...resp.data}))
    }

    var commentsData
    var parsedCommentsData

    const loadCommentData = async () => {
        const response = await axios.get(`http://localhost:3001/task/${taskid}/comments`)

        commentsData = (response.data)
        parsedCommentsData = JSON.parse(commentsData[0].comments)
        setCommentData(parsedCommentsData)
        setAddCommentData(parsedCommentsData)
    }

    var attachmentsData
    var parsedAttachmentsData

    const loadAttachmentData = async () => {
        const response = await axios.get(`http://localhost:3001/task/${taskid}/attachments`)

        attachmentsData = (response.data)
        parsedAttachmentsData = JSON.parse(attachmentsData[0].attachments)
        setAttachmentData(parsedAttachmentsData)
    }
    
    const { taskid } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        loadTaskData()
        loadCommentData()
        loadAttachmentData()

        if (!(localStorage.getItem("lsIsLoggedIn"))) {
            setTimeout(() => navigate(`/login`))
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskid])


    const handleInputChange = (event) => {
        const {name, value} = event.target
        setCommentForm({ ...commentForm, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        var commenter = username
        var today = new Date()
        var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        var commentTime = date + " " + time

        const jsonComment = {
            comment: comment,
            commenter: commenter,
            commentTime: commentTime
        }
        
        var conditionalAddingCommentData
        
        if (addCommentData == null) {
            conditionalAddingCommentData = [jsonComment]
        } else {
            addCommentData.splice(0, 0, jsonComment)
            conditionalAddingCommentData = addCommentData
        }

        if(!comment) {
            toast.error("Empty comment!")
        } else {
            axios
                .put(`http://localhost:3001/task/${taskid}/comment`, {
                    conditionalAddingCommentData
                })
                .then(() => {
                    setCommentForm({
                        comment: ""
                    })
                    commenter = ""
                    commentTime = ""
                })
                .catch((err) => console.log(err.response.data))
                toast.success("Comment Applied!")
        }

        setCommentData(conditionalAddingCommentData)
        setAddCommentData(conditionalAddingCommentData)
    }

    const downloadFileAtURL = (filename) => {
        const aTag = document.createElement('a')
        aTag.href = `http://localhost:3001/attachments/${filename}`
        aTag.setAttribute('download', `${filename}`)
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
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
                            <Link to={`/task/${taskid}/attachment`}>
                            <button className="form-attachments-button">
                                <img 
                                    src={require('../images/attachment.png')}
                                    className="form-attachment-icon"
                                    alt="phonebook"
                                />
                            </button>
                            </Link>
                            {attachmentData !== null && attachmentData.map((item, index) => {
                                    return (
                                        <div className="attachment-component" key={index}>
                                            <p className="attachment-filename" onClick={() => downloadFileAtURL(item.filename)}>{item.filename}</p>
                                        </div>
                                    )
                                })}
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
                                {commentData !== null && commentData.map((item, index) => {
                                    return (
                                        <div className="comment-component" key={index}>
                                            <p className="comment-commenter">{item.commenter}</p>
                                            <p className="comment-text">{item.comment}</p>
                                            <p className="comment-time">{format(new Date(item.commentTime), 'MMM dd, yyyy - h:mm a')}</p>
                                        </div>
                                    )
                                })}
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
                        <Link to={`/task/update/${taskid}`}>
                        <button className="form--task-edit">EDIT</button>
                        </Link>
                        <Link to='/board'>
                        <button className="form--task-back">BACK</button>
                        </Link>
                    </div>
            </div>
        </div>
    )
}

export default Task