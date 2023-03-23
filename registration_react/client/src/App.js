import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Users from './pages/Users'
import Phonebook from './pages/Phonebook.js'
import Religion from './pages/Religion.js'
import Nationality from './pages/Nationality.js'
import CivilStatus from './pages/CivilStatus.js'

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
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;