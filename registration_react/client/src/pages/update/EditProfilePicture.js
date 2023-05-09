import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const EditProfilePicture = () => {

    const navigate = useNavigate()

    const { userid } = useParams()

    // TEMPORARY PREVIEW
    const [previewFile, setPreviewFile] = useState(null)

    // PROFILE PICTURE
    const [profilePicture, setProfilePicture] = useState("defaultProfile.png")

    const loadProfilePicture = async () => {
        const response = await axios.get(`http://localhost:5000/user/profilepicture/${userid}`)
        setProfilePicture(response.data)
    }

    useEffect(() => {
        loadProfilePicture()
    }, [userid])


    // UPLOADING
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState("")

    const handleInputChange = (event) => {
        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)

        const preview = event.target.files[0]
        const reader = new FileReader()

        reader.onload = (event) => {
            localStorage.setItem("lsProfilePicturePreview", event.target.result)
            setPreviewFile(event.target.result)
        }

        reader.readAsDataURL(preview)
        toast.success("Image Selected") 
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
                </div>

                <div className="profile--loaded-container">
                    {previewFile ? 
                        <img 
                            src={previewFile} 
                            className="profile--loaded"
                        /> 
                    : 
                        <img 
                            src={require(`../../uploads/${profilePicture}`)} 
                            className="profile--loaded"
                        />
                    }
                </div>

                <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
                    <input className="form--upload-profile-picture-input"
                        type="file"
                        id="profile--upload"
                        name="image" 
                        onChange={handleInputChange}
                    />
                    <label for="profile--upload">UPLOAD PROFILE PICTURE</label>
                    <div className="form-buttons-container">
                        <input className="form--add-submit" type="submit" value="APPLY"/>
                        <Link to='/users'>
                        <input className="form--signup-back" type="button" value="BACK"/>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfilePicture