import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Alert, Nav, Navbar, Carousel, Container, Form, FormControl } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { getDocs, collection } from 'firebase/firestore'
import { db } from "../firebase"
import RecipeCard from './RecipeCard'

export default function Dashboard() {
    const searchRef = useRef()
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const [recipes, setRecipes] = useState()
    const [postalCode, setPostalCode] = useState()

    const fetchRecipes = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "recipes"));
          const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          return newData;
        } catch (error) {
          console.error('Error fetching recipes:', error);
          return []; 
        }
      }

      useEffect(() => {
        const fetchData = async () => {
          const newData = await fetchRecipes();
          setRecipes(newData);
        };
    
        fetchData();
      }, []); 

    return (
        <>            
            <h1 className="Header text-center mt-4">Featured Recipes</h1>

            <Container className="d-flex flex-wrap gap-3 mt-4 justify-content-center" style={{ minHeight: "10vh", marginLeft: 'auto', marginRight:'auto' }}>
            {recipes ? (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipeTitle={recipe.recipeTitle}
            cookTime={recipe.cookTime}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            servingSize={recipe.servingSize}
            tags={recipe.tags}
          />
        ))
      ) : (
        <p>Loading recipes...</p>
      )}
    </Container>
        </>
    )
}
