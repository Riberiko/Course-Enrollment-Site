import React, { useState, useEffect, useRef } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

function AccountInformation() {
    const [currentClasses, setCurrentClasses] = useState([]);
    const [droppedClasses, setDroppedClasses] = useState([]);
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const savedImage = localStorage.getItem('savedImage');
        if (savedImage) {
            setImage(savedImage);
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                setImage(result);
                localStorage.setItem('savedImage', result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        localStorage.removeItem('savedImage');
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const cardStyle = {
        width: 'auto',
        height: 'auto',
        background: 'linear-gradient(120deg, #2892D7, #173753)',
        color: '#ffffff',
        textAlign: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'top ease 0.5s',
        overflowY: 'auto',
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title>Account Information</Card.Title>
    
                    <section className="row mb-3 align-items-center">
                    <div className="col-md-6">
                        {image && (
                            <>
                        <img src={image} alt="Uploaded" className="img-fluid" style={{ width: '180px', height: '190px' }} />
                            <div className="d-flex align-items-center mt-2">
                                <button onClick={removeImage} className="btn btn-danger">Remove Image</button>
                                <button onClick={triggerFileInput} className="btn btn-primary ms-2">Upload Image</button>
                            </div>
            </>
        )}
        {!image && (
            <div>
                <button onClick={triggerFileInput} className="btn btn-primary mt-2">Upload Image</button>
            </div>
        )}
        <input type="file" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
    </div>
                        
                        <div className="col-md-6">
                            <p>Name: David Ortega</p>
                            <p>Email: david.ortega@colleges.edu</p>
                        </div>
                    </section>
    
                    <section>
                        <ListGroup as="ul">
                            <ListGroupItem as="li" active>
                                Current Classes
                            </ListGroupItem>
                            {currentClasses.map((className, index) => (
                                <ListGroupItem as="li" key={index}>
                                    {className}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </section>
    
                    <section className="mt-3">
                        <ListGroup as="ul">
                            <ListGroupItem as="li" active>
                                Dropped Classes
                            </ListGroupItem>
                            {droppedClasses.map((className, index) => (
                                <ListGroupItem as="li" key={index}>
                                    {className}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </section>
                </Card.Body>
            </Card>
        </div>
    );
}

export default AccountInformation;
