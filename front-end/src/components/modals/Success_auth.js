import React from 'react';
import Alert from "react-bootstrap/Alert";


const Success = (props) => {

return(
    <Alert variant="success" className="error-message">
        <Alert.Heading>Hey, nice to see you!</Alert.Heading>
        <p>Aww yeah, you successfully {props.successMessage} on eStore! Keep it up and good shopping!</p>
    </Alert>
)}

export default Success