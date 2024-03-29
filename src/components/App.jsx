import React, { useState, useEffect } from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import AddRecipe from "./AddRecipe"
import NavComponent from "./NavComponent"
import Location from "./Location"
import SearchResults from "./SearchResults"

function App() {

  return (
          <Router>
            <AuthProvider>
              <Routes>
              <Route path="/search-results" element={
                  <PrivateRoute>
                      <NavComponent/>
                      <SearchResults />
                  </PrivateRoute>
                  }
                />
                <Route path="/" element={
                  <PrivateRoute>
                      <NavComponent/>
                      <Dashboard/>
                  </PrivateRoute>
                  }
                />
                <Route path='/update-profile' element = {
                  <PrivateRoute>
                    <NavComponent/>
                    <UpdateProfile/>
                  </PrivateRoute>}
                />
                <Route path='/add-recipe' element={
                  <PrivateRoute>
                    <NavComponent/>
                    <AddRecipe/>
                  </PrivateRoute>}
                />
                <Route path='/stores-near-me' element={
                  <PrivateRoute>
                    <NavComponent/>
                    <Location/>
                  </PrivateRoute>
                }></Route>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
              </Routes>
            </AuthProvider>
          </Router>
    
  )
}

export default App;
