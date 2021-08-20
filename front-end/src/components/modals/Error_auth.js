import React, {useState} from 'react';
import Alert from "react-bootstrap/Alert";



const AlertDismissibleExample = (props) => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" className="error-message">
                <Alert.Heading>Oh snap! Something went wrong!</Alert.Heading>
                <p>
                    {props.errorMessage}
                </p>
            </Alert>
        )
    }
}

export default AlertDismissibleExample