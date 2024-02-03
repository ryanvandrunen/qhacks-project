import React, { useState } from 'react';
import { Card, Modal, Button, Badge } from 'react-bootstrap';

export default function RecipeCard(props) {
  const [modalContent, setModalContent] = useState({
    ingredients: '',
    cookTime: '',
    servingSize: '',
    instructions: '',
    tags: '',
    title: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setModalContent({
      ingredients: props.ingredients,
      cookTime: props.cookTime,
      servingSize: props.servingSize,
      title: props.recipeTitle,
      tags: props.tags,
      instructions: props.instructions,
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Card className="card mb-4" style={{ width: '15vw', borderRadius: '15px' }}>
        <Card.Body key={props.id} className="align-items-center gap-4">
          <Card.Title className="mb-3 recipeName">{props.recipeTitle}</Card.Title>
          <Card.Text className="cookTime">Cook Time: {props.cookTime}</Card.Text>
          <Card.Text className="servingSize">Serving Size: {props.servingSize}</Card.Text>
          {props.tags && props.tags.split(',').length > 0 && (
            <div className="mb-3 d-flex gap-2">
              {props.tags.split(',').map((tag) => (
                <Badge key={tag} bg="dark">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          )}
          <Button class="btn btn-primary" onClick={handleModalOpen}>
            Expand for modal
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>Ingredients:</h6>
          <p className="card-text mb-3">{modalContent.ingredients}</p>
          <h6>Cooking time:</h6>
          <p className="card-text">{modalContent.cookTime}</p>
          <h6>Serves:</h6>
          <p className="card-text">{modalContent.servingSize}</p>
          <h6>Instructions:</h6>
          <p className="card-text">{modalContent.instructions}</p>
          <div className="d-flex gap-2">
            {props.tags.split(',').map((tag) => (
                <Badge key={tag} bg="dark">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}