import React from "react"
import Signup from "./Signup"
import { Container } from 'react-bootstrap'
import { AuthProvider } from "../contexts/AuthContext"  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Firestore from "./Firestore"

function App() {
  return (
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={
                  <PrivateRoute>
                    <div className="relative">
                      <Dashboard />
                    </div>
                  </PrivateRoute>
                  }
                />
                <Route path='/update-profile' element = {
                  <PrivateRoute>
                    <UpdateProfile/>
                  </PrivateRoute>}
                />
                <Route path='/add-recipe' element={
                  <PrivateRoute>
                    <Firestore/>
                  </PrivateRoute>}
                />

                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
              </Routes>
            </AuthProvider>
          </Router>
    
  )
}

export default App;
