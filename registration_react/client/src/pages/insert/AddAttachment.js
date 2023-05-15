import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const AddAttachment = () => {

    const navigate = useNavigate()

    const { taskid } = useParams()

    // UPLOADING
    const [fileList, setFileList] = useState([])
    const fileListArray = Object.values(fileList)

    useEffect(() => {
        if (!(localStorage.getItem("lsIsLoggedIn"))) {
            setTimeout(() => navigate(`/login`))
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleInputChange = (event) => {
        setFileList(...fileList, event.target.files)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()

        for (let index = 0; index < fileList.length; index++) {
            const file = fileList[index]
            formData.append("file", file)
        }

        try {
            const result = await axios.put(`http://localhost:3001/task/attach/${taskid}`, formData)
            console.log(result)
            toast.success("File/s Uploaded!")
            setTimeout(() => navigate(`/task/${taskid}`), 500)
        } catch (error) {
            console.error(error)
            setTimeout(() => navigate(`/task/${taskid}`), 500)
        } 
    } 

    console.log(fileListArray)

    return (
        <div className="form--background">
            <div className="form--addattachments-container">
                <h1 className="form--title">Attach Files</h1>
                <div className="form--upload-status-container">
                    {fileList.length === 1  &&
                        <p className="form--upload-status">{fileList.length} file selected</p>
                    }
                    {fileList.length > 1 &&
                        <p className="form--upload-status">{fileList.length} files selected</p>
                    }
                </div>
                <div>
                    <ul className="form--attachments-preview-list">
                    {fileListArray.length !== 0 &&
                        fileListArray.map((item, index) => {
                        return (
                            <li className="form--attachments-preview-item" key={index}>{item.name}</li>
                        )
                        })
                    }
                    </ul>
                </div>
                <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
                    <input className="form--upload-profile-picture-input"
                        type="file"
                        multiple
                        id="attachment--upload"
                        name="attachments" 
                        onChange={handleInputChange}
                    />
                    <label htmlFor="attachment--upload">
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