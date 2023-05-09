import React, { useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const AddAttachment = () => {

    const navigate = useNavigate()

    const { taskid } = useParams()

    // UPLOADING
    const [fileList, setFileList] = useState([])

    const handleInputChange = (event) => {
        setFileList(event.target.files)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(fileList)
        const formData = new FormData()

        for (let index = 0; index < fileList.length; index++) {
            const file = fileList[index]
            formData.append("file", file)
        }

        console.log(formData)

        try {
            const result = await axios.put(`http://localhost:5000/task/attach/${taskid}`, formData)
            console.log(result)
            toast.success("File/s Uploaded!")
            setTimeout(() => navigate(`/task/${taskid}`), 500)
        } catch (error) {
            console.error(error)
            setTimeout(() => navigate(`/task/${taskid}`), 500)
        } 
    } 

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
                    {/* <div>
                        {fileList !== null &&
                            fileList.map((item, index) => {
                            return (
                                <div className="attachment-component" key={index}>
                                    <p className="attachment-filename">{item.file.name}</p>
                                </div>
                            )
                            })
                        }
                    </div> */}
                    
                </div>
                <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
                    <input className="form--upload-profile-picture-input"
                        type="file"
                        multiple
                        id="attachment--upload"
                        name="attachments" 
                        onChange={handleInputChange}
                    />
                    <label for="attachment--upload">
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