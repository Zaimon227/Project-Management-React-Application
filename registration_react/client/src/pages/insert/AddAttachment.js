import React, { useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const AddAttachment = () => {

    const navigate = useNavigate()

    const { taskid } = useParams()

    // ATTACHMENT
    const [attachmentData, setAttachmentData] = useState([])

    // UPLOADING
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState("")

    const handleInputChange = (event) => {
        setFile(event.target.files)
        setFileName(event.target.files.name)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()

        for (let i = 0; i < file.length; i++) {
            formData.append("attachment", file[i])
        }

        // formData.append("attachment", file)
        // formData.append("fileName", fileName)
        console.log(formData)

        axios.put(`http://localhost:5000/task/attach/${taskid}`, formData)
        .then ((response) => response.data)

        toast.success("File/s Uploaded!")
        setTimeout(() => navigate(`/task/${taskid}`), 500)
    } 

    return (
        <div className="form--background">
            <div className="form--editprofilepicture-container">
                <h1 className="form--title">Attach Files</h1>
                <div className="form--upload-status-container">
                    {fileName !== "" &&
                        <p className="form--upload-status">File Selected!</p>
                    }
                </div>
                <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
                    <input className="form--upload-profile-picture-input"
                        type="file"
                        multiple
                        id="attachment--upload"
                        name="attachment" 
                        onChange={handleInputChange}
                    />
                    <label for="attachment--upload">
                        <img 
                            src={require(`../../images/attachment.png`)}
                            className="profile--upload-icon"
                            alt="attachment icon"
                        />
                        Upload File
                    </label>
                    <div className="form-buttons-container">
                        <input className="form--add-submit" type="submit" value="APPLY"/>
                        <Link to={`/task/${taskid}`}>
                        <input className="form--signup-back" type="button" value="BACK"/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAttachment