import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import '../styles/Signup.css'

const initialSignupForm = {
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    birthdate: "",
    religionid: "",
    nationalityid: "",
    civilstatusid: "",
    email: "",
    password: "",
    confirmpassword: ""
}

const Signup = () => {

    const navigate = useNavigate()

    // Religion, Nationality, CivilStatus fetch for select options
    const [religionData, setReligionData] = useState([])
    const [nationalityData, setNationalityData] = useState([])
    const [civilstatusData, setCivilStatusData] = useState([])

    const loadReligionData = async () => {
        const response = await axios.get(`http://localhost:3001/religion`)
        setReligionData(response.data)
    }

    const loadNationalityData = async () => {
        const response = await axios.get(`http://localhost:3001/nationality`)
        setNationalityData(response.data)
    }

    const loadCivilStatusData = async () => {
        const response = await axios.get(`http://localhost:3001/civilstatus`)
        setCivilStatusData(response.data)
    }

    useEffect(() => {
        loadReligionData()
        loadNationalityData()
        loadCivilStatusData()
    }, [])

    // Signup Form
    const [signupForm, setSignupForm] = useState(initialSignupForm);

    const { 
        firstname, 
        middlename, 
        lastname, 
        gender, 
        birthdate, 
        religionid, 
        nationalityid, 
        civilstatusid, 
        email, 
        password,
        confirmpassword
    } = signupForm

    // this listens and assigns the inputs from the search form
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setSignupForm({ ...signupForm, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmpassword){
            toast.error("Confirm Password does not match!")
        } else {
            if(!firstname || !middlename || !lastname || !birthdate || !religionid || !nationalityid || !civilstatusid || !email || !password || !confirmpassword) {
                toast.error("Missing some input field/s!")
            } else {
                axios
                    .post('http://localhost:3001/user/signup', {
                        firstname,
                        middlename,    
                        lastname,
                        gender,
                        birthdate,
                        religionid,
                        nationalityid,
                        civilstatusid,
                        email,
                        password
                    })
                    .then(() => {
                        setSignupForm({
                            firstname: "",
                            middlename: "",
                            lastname: "",
                            birthdate: "",
                            religionid: "",
                            nationalityid: "",
                            civilstatusid: "",
                            email: "",
                            password: "",
                            confirmpassword: ""
                        })
                    })
                    .catch((err) => console.log(err.response.data))
                    toast.success("Signed Up Successfully") 
                setTimeout(() => navigate('/login'), 500)
            }
        }  
    }

    return (
        <div className="form--background">
            <div className="form--signup-container">
                <h1 className="form--title">Sign up</h1>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form--signup-leftside-contents">
                        <p className="form--signup-label">First Name</p>
                        <input className="form--signup-input"
                            type="text"
                            id="firstname"
                            name="firstname" 
                            onChange={handleInputChange}
                        />
                        <p className="form--signup-label">Middle Name</p>
                        <input className="form--signup-input"
                            type="text"
                            id="middlename"
                            name="middlename" 
                            onChange={handleInputChange}
                        />
                        <p className="form--signup-label">Last Name</p>
                        <input className="form--signup-input"
                            type="text"
                            id="lastname"
                            name="lastname" 
                            onChange={handleInputChange}
                        />
                        <p className="form--signup-label">Gender</p>
                        <select className="form--signup-gender" id="gender" name="gender" onChange={handleInputChange}>
                            <option hidden disabled selected value>Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <p className="form--signup-label">Birthdate</p>
                        <input className="form--signup-datepicker" 
                            type="date" 
                            id="birthdate"
                            name="birthdate"
                            onChange={handleInputChange}/>
                        <p className="form--signup-label">Religion</p>
                        <select className="form--signup-select" id="religionid" name="religionid"  onChange={handleInputChange}>
                                    <option hidden disabled selected value>Select</option>
                            {religionData.map((item) => {
                                return (
                                    <option key={item.religionid} value={item.religionid}>{item.religionname}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form--signup-rightside-contents">
                        <p className="form--signup-label">Nationality</p>
                        <select className="form--signup-select" id="nationalityid" name="nationalityid"  onChange={handleInputChange}>
                                    <option hidden disabled selected value>Select</option>
                            {nationalityData.map((item) => {
                                return (
                                    <option key={item.nationalityid} value={item.nationalityid}>{item.nationalityname}</option>
                                )
                            })}
                        </select>
                        <p className="form--signup-label">Civil Status</p>
                        <select className="form--signup-select" id="civilstatusid" name="civilstatusid"  onChange={handleInputChange}>
                                    <option hidden disabled selected value>Select</option>
                            {civilstatusData.map((item) => {
                                return (
                                    <option key={item.civilstatusid} value={item.civilstatusid}>{item.civilstatusname}</option>
                                )
                            })}
                        </select>
                        <p className="form--signup-label">Email</p>
                        <input className="form--signup-input"
                            type="text"
                            id="email"
                            name="email" 
                            onChange={handleInputChange}
                        />
                        <p className="form--signup-label">Password</p>
                        <input className="form--signup-input" 
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleInputChange}
                        />
                        <p className="form--signup-label">Confirm Password</p>
                        <input className="form--signup-input" 
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword" 
                            onChange={handleInputChange}
                        />
                    <input className="form--signup-submit" type="submit" value="SIGN UP"/>
                    <Link to='/login'>
                    <input className="form--signup-back" type="button" value="BACK"/>
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup