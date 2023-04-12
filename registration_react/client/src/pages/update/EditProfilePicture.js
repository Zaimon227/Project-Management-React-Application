import React, { useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const EditProfilePicture = () => {

    const navigate = useNavigate()

    const { userid } = useParams()

    // UPLOADING
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState("")

    const handleInputChange = (event) => {
        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("image", file)
        formData.append("fileName", fileName)
        try {
            await axios.put(`http://localhost:5000/user/upload/${userid}`, formData)
        } catch (err) {
            console.log(err)
        }
        toast.success("Profile Picture Edited!") 
        setTimeout(() => navigate('/users'), 500) 
    } 

    return (
        <div className="form--background">
            <div className="form--editprofilepicture-container">
                <h1 className="form--title">Edit Profile Picture</h1>
                <div className="form--upload-status-container">
                    {fileName !== "" &&
                        <p className="form--upload-status">File Selected!</p>
                    }
                </div>
                <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
                    <input className="form--upload-profile-picture-input"
                        type="file"
                        id="profile--upload"
                        name="image" 
                        onChange={handleInputChange}
                    />
                    <label for="profile--upload">
                        <img 
                            src={require(`../../images/profile.png`)}
                            className="profile--upload-icon"
                            alt="upload icon"
                        />
                        Upload Profile Picture
                    </label>
                    <input className="form--add-submit" type="submit" value="APPLY"/>
                    <Link to='/users'>
                    <input className="form--signup-back" type="button" value="BACK"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default EditProfilePicture