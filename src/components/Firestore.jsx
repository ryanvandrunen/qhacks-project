import React, { useState, useEffect } from 'react';
import { db } from '../firebase'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Button, Form } from 'react-bootstrap';

 
 
const AddRecipe = () => {
    const [recipeTitle, setRecipeTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [cookTime, setCookTime] = useState([])
    const [instructions, setInstructions] = useState([])
    const [tags, setTags] = useState([])
 
    const addRecipe = async (e) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(db, "recipes"), {
              recipeTitle: recipeTitle,    
              ingredients: ingredients,
              cookTime: cookTime,
              instructions: instructions,
              tags: tags
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
 
    const fetchPost = async () => {
       
        await getDocs(collection(db, "todos"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setRecipes(newData);                
                console.log(recipes, newData);
            })
       
    }
   
    useEffect(()=>{
        fetchPost();
    }, [])
 
 
    return (
        <section className="todo-container">
            <div className="todo">
                <h1 className="header">
                    Add Recipe
                </h1>
   
                <Form>
   
                    <Form.Group>
                        <Form.Control type="text" placeholder="Recipe title" onChange={(e)=>setRecipeTitle(e.target.value)}
                        required />
                    </Form.Group>
                    <Form.Group>
                        <input type="text" 
                        placeholder="List of ingredients (,)"
                        onChange={(e)=>setIngredients(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <input type="text" 
                        placeholder="Cooking time"
                        onChange={(e)=>setCookTime(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <input type="text" 
                        placeholder="Instructions (,)"
                        onChange={(e)=>setInstructions(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <input type="text" 
                        placeholder="tags"
                        onChange={(e)=>setTags(e.target.value)}/>
                    </Form.Group>
                    <div className="btn-container">
                        <Button
                            type="submit"
                            className="btn-primary"
                            onClick={addRecipe}
                        >
                            Submit
                        </Button>
                    </div>
   
                </Form>
   
                <div className="todo-content">
                    {
                        recipes?.map((fieldTitle,i)=>(
                            <p key={i}>
                                {fieldTitle.fieldContents}
                            </p>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default AddRecipe