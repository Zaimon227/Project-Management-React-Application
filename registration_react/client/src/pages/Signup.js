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
        const response = await axios.get(`http://localhost:5000/religion`)
        setReligionData(response.data)
    }

    const loadNationalityData = async () => {
        const response = await axios.get(`http://localhost:5000/nationality`)
        setNationalityData(response.data)
    }

    const loadCivilStatusData = async () => {
        const response = await axios.get(`http://localhost:5000/civilstatus`)
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
                    .post('http://localhost:5000/user/signup', {
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
                setTimeout(() => navigate('/'), 500)
            }
        }  
    }

    return (
        <div className="form--background">
            <div className="form--signup-container">
                <h1 className="form--title">Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <input className="form--signup-input"
                        type="text"
                        id="firstname"
                        name="firstname" 
                        placeholder="First Name"
                        onChange={handleInputChange}
                    />
                    <input className="form--signup-input"
                        type="text"
                        id="middlename"
                        name="middlename" 
                        placeholder="Middle Name"
                        onChange={handleInputChange}
                    />
                    <input className="form--signup-input"
                        type="text"
                        id="lastname"
                        name="lastname" 
                        placeholder="Last Name"
                        onChange={handleInputChange}
                    />
                    <select className="form--signup-gender" id="gender" name="gender" onChange={handleInputChange}>
                        <option hidden disabled selected value>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <input className="form--signup-datepicker" 
                        type="date" 
                        id="birthdate"
                        name="birthdate" 
                        onChange={handleInputChange}/>

                    <select className="form--signup-select" id="religionid" name="religionid"  onChange={handleInputChange}>
                                <option hidden disabled selected value>Religion</option>
                        {religionData.map((item) => {
                            return (
                                <option key={item.religionid} value={item.religionid}>{item.religionname}</option>
                            )
                        })}
                    </select>
                    <select className="form--signup-select" id="nationalityid" name="nationalityid"  onChange={handleInputChange}>
                                <option hidden disabled selected value>Nationality</option>
                        {nationalityData.map((item) => {
                            return (
                                <option key={item.nationalityid} value={item.nationalityid}>{item.nationalityname}</option>
                            )
                        })}
                    </select>
                    <select className="form--signup-select" id="civilstatusid" name="civilstatusid"  onChange={handleInputChange}>
                                <option hidden disabled selected value>Civil Status</option>
                        {civilstatusData.map((item) => {
                            return (
                                <option key={item.civilstatusid} value={item.civilstatusid}>{item.civilstatusname}</option>
                            )
                        })}
                    </select>
                    <input className="form--signup-input"
                        type="text"
                        id="email"
                        name="email" 
                        placeholder="Email"
                        onChange={handleInputChange}
                    />
                    <input className="form--signup-input" 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                    />
                    <input className="form--signup-input" 
                        type="password"
                        id="confirmpassword"
                        name="confirmpassword" 
                        placeholder="Confirm Password"
                        onChange={handleInputChange}
                    />
                    <input className="form--signup-submit" type="submit" value="SIGN UP"/>
                    <Link to='/'>
                    <input className="form--signup-back" type="button" value="BACK"/>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Signup