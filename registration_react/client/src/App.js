import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/Login.js'
import Signup from './pages/Signup.js'

import Home from './pages/Home.js'
import Users from './pages/Users.js'
import Phonebook from './pages/Phonebook.js'
import Religion from './pages/Religion.js'
import Nationality from './pages/Nationality.js'
import CivilStatus from './pages/CivilStatus.js'

import AddContact from './pages/insert/AddContact.js'
import AddReligion from './pages/insert/AddReligion.js'
import AddNationality from './pages/insert/AddNationality.js'
import AddCivilStatus from './pages/insert/AddCivilStatus.js'

import EditProfilePicture from './pages/update/EditProfilePicture.js'
import EditContact from './pages/update/EditContact.js'
import EditReligion from './pages/update/EditReligion.js'
import EditNationality from './pages/update/EditNationality.js'
import EditCivilStatus from './pages/update/EditCivilStatus.js'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>

          <Route path="/home" element={<Home />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/phonebook" element={<Phonebook />}/>
          <Route path="/religion" element={<Religion />}/>
          <Route path="/nationality" element={<Nationality />}/>
          <Route path="/civilstatus" element={<CivilStatus />}/>

          <Route path="/phonebook/add" element={<AddContact />}/>
          <Route path="/religion/add" element={<AddReligion />}/>
          <Route path="/nationality/add" element={<AddNationality />}/>
          <Route path="/civilstatus/add" element={<AddCivilStatus />}/>

          <Route path="/users/profile/:userid" element={<EditProfilePicture />}/>
          <Route path="/phonebook/update/:id" element={<EditContact />}/>
          <Route path="/religion/update/:religionid" element={<EditReligion />}/>
          <Route path="/nationality/update/:nationalityid" element={<EditNationality />}/>
          <Route path="/civilstatus/update/:civilstatusid" element={<EditCivilStatus />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;