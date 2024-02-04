import React, { useState } from 'react';
import { Card, Modal, Button, Badge, Carousel } from 'react-bootstrap';
import myImage from './FoodImages/-burnt-carrots-and-parsnips-56390131.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as bookmarkLight } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as bookmarkSolid } from '@fortawesome/free-solid-svg-icons'

const tagContainerStyle = {
  display: 'flex',
  gap: '2px',
  flexWrap: 'wrap',
  maxWidth: '100%', /* Set the maximum width as needed */
  overflow: 'hidden',
};

const cardTagStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const modalTagContainerStyle = {
  display: 'flex',
  gap: '2px',
  flexWrap: 'wrap',
  maxWidth: '100%', /* Set the maximum width as needed */
  overflow: 'hidden',
};

const modalTagStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const bookmarkHover = {
  fontSize: '1.2em',
  transition: 'all 0.3s ease'
}


export default function RecipeCard(props) {
  const [modalContent, setModalContent] = useState({
    ingredients: '',
    cookTime: '',
    servingSize: '',
    instructions: '',
    tags: '',
    title: '',
  });

  const [isBookmarkActive, setIsBookmarkActive] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarkActive(!isBookmarkActive)
  }

  const handleModalOpen = () => {
    setModalContent({
      ingredients: props.ingredients,
      cookTime: props.cookTime,
      servingSize: props.servingSize,
      title: props.recipeTitle,
      tags: props.tags,
      instructions: props.instructions
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card className="card mb-4 h-100" style={{ width: '15vw', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
      <Card.Img variant="top" src={'./FoodImages/' + props.img + ".jpg"} alt={props.recipeTitle} style={{ borderRadius: '15px 15px 0 0', objectFit: 'cover', height: '10vw' }} />
        <Card.Body key={props.id} className="d-flex flex-column gap-2">
        <Card.Title className="d-flex">
          <h5>{props.recipeTitle}</h5>
          <FontAwesomeIcon icon={isBookmarkActive ? bookmarkSolid : bookmarkLight} className="ms-auto" style={{ bookmarkHover, cursor: 'pointer' }}
          onClick={handleBookmarkClick}/>
        </Card.Title>
          <Card.Text className="cookTime">Cook Time: {props.cookTime}</Card.Text>
          <Card.Text className="servingSize">Serving Size: {props.servingSize}</Card.Text>
          {props.tags && props.tags.split(',').length > 0 && (
            <div style={tagContainerStyle}>
              {props.tags.split(',').slice(0, 5).map((tag, index) => (
                <Badge key={tag} bg="dark">
                  {tag.trim()}
                </Badge>
              ))}
              {props.tags.split(',').length > 5 && (
                <Badge bg="dark" style={cardTagStyle}>
                  +{props.tags.split(',').length - 5} more
                </Badge>
              )}
            </div>
          )}
          <Button className="btn btn-primary mt-auto" onClick={handleModalOpen}>
            View Recipe
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
          {/* <div style={modalTagContainerStyle}>
            {modalContent.tags && modalContent.tags.split(',').length > 0 ? (
              modalContent.tags.split(',').slice(0, 12).map((tag, index) => (
                <Badge key={index} bg="dark" style={modalTagStyle}>
                  {tag.trim()}
                </Badge>
              ))
            ) : (
              <span>No tags available</span>
            )}
            {modalContent.tags.split(',').length > 12 && (
              <Badge bg="dark" style={modalTagStyle}>
                +{modalContent.tags.split(',').length - 12} more
              </Badge>
            )}
          </div> */}
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
