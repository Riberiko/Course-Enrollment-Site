import React from "react";
import { Card, Button } from 'react-bootstrap';

const CardStyle = ({ imageSrc, cardTitle }) => {
    const handleImageClick = () => {
        console.log("Image clicked");
    };

const cardImageStyle = {
        width: '100%', 
        height: '200px', 
        objectFit: 'cover' ,
        padding: '10px',
    };

    return (
        <Card style={{ width: '28rem' }}>
            <Card.Img 
                variant="top" 
                src={imageSrc} 
                style={cardImageStyle} 
                onClick={handleImageClick} 
            />
            <Card.Body>
                <Card.Title>{cardTitle}</Card.Title>
            </Card.Body>
        </Card>
    );
};

export default CardStyle;
