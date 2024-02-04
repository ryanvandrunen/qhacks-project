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
import { db } from "../firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

function App() {
  const [hasFunctionRun, setHasFunctionRun] = useState(false)
  const [recipes, setRecipes] = useState([])
  
  useEffect(() => {
    // Your function to run once
    if (!hasFunctionRun) {
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const shuffledRecipes = newData.sort(() => 0.5 - Math.random());
        const slicedRecipes = shuffledRecipes.slice(0, 16);
        setRecipes(slicedRecipes);
        setHasFunctionRun(true);
        console.log(recipes)
      }
      fetchData()
    }
  }, [hasFunctionRun]);

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
                      <Dashboard {...recipes}/>
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
