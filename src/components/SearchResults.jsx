import React, { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import { Container, Form, Button } from 'react-bootstrap'
import { db } from "../firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

export default function SearchResults() {
    const [searchQuery, setSearchQuery] = useState()
    const [searchResults, setSearchResults] = useState()
    const recipes = collection(db, 'recipes')

    const handleSearchSubmit = async () => {

    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const q = query(recipes, where('recipeTitle', '==', searchQuery))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map((doc) => doc.data());
            setSearchResults(data);
          } catch (error) {
            console.error('Error fetching data from Firestore:', error);
          }
        };
        console.log(searchQuery)
        if (searchQuery) {
          fetchData();
        }
      }, [searchQuery]);

  return (
    <>
      <div className="mt-4 d-flex justify-content-center" style={{ maxWidth: '100vw' }}>
        <Form.Control
          type="text"
          placeholder="Search recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: '25vw', backgroundColor: '#d9d6d0' }}
        />
      </div>
       <h1 className="Header text-center mt-4">Search Results</h1>
      <Container className="d-flex flex-wrap gap-3 mt-4 justify-content-center" style={{ minHeight: "10vh", marginLeft: 'auto', marginRight:'auto' }}>
      {searchResults ? (
        searchResults.map((recipe) => (
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
        <p>No results found.</p>
      )}
      </Container>
    </>
  )
}
