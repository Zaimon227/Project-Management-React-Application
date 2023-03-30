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
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;