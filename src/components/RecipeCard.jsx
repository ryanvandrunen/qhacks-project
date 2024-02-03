import React, { useState } from 'react'
import { Card, Modal, Button, Badge } from 'react-bootstrap'

export default function RecipeCard(props) {
    const [modalContent, setModalContent] = useState({
        ingredients: '',
        cookTime: '',
        servingSize: '',
        instructions: '',
        tags: '',
        title: ''
    })

    const modalId = `exampleModal_${props.id}`

    const handleModalOpen = () => {
        setModalContent({
            ingredients: props.ingredients,
            cookTime: props.cookTime,
            servingSize: props.servingSize,
            title: props.recipeTitle,
            tags: props.tags,
            instructions: props.instructions
        })
    }

  return (
    <div>
      <Card className="card mb-4" style={{ width: '15vw', borderRadius: '15px'}}>
                <Card.Body key={props.id} className="align-items-center gap-4">
                            <Card.Title className="mb-3 recipeName" >{props.recipeTitle}</Card.Title>
                            <Card.Text className="cookTime">Cook Time: {props.cookTime}</Card.Text>
                            <Card.Text className="servingSize">Serving Size: {props.servingSize}</Card.Text>   
                            {props.tags && props.tags.split(',').length > 0 && (
                                <div className="mb-3 d-flex gap-2">
                                {props.tags.split(',').map((tag) => (
                                    <Badge key={tag} bg='dark'>{tag.trim()}</Badge>
                                ))}
                            </div>
                            )}
                        <Button class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`} onClick={handleModalOpen}>
                            Expand for modal
                        </Button>
                </Card.Body>
            </Card>
            <div class="modal fade" id={modalId} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{modalContent.title}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        <div class="modal-body">
                            <p className="card-text mb-3">Ingredients: {modalContent.ingredients}</p>
                            <p className="card-text">Cooking time: {modalContent.cookTime}</p>
                            <p className="card-text">Serves: {modalContent.servingSize}</p>
                            <p className="card-text">Instructions: {modalContent.instructions}</p>
                            <p className="card-text">Tags: {modalContent.tags}</p>
                         </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
