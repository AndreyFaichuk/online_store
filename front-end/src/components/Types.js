import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";


const Types = observer(() => {
    const {device} = useContext(Context)

    return (
        <ListGroup>
            {
                device.types.map(type =>
                    <ListGroup.Item
                        active={type.id === device.selectedType.id}
                        onClick={() => device.setSelectedType(type)}
                        variant="dark"
                        className="mt-1"
                        key={type.id}>
                        {type.name}
                    </ListGroup.Item>
            )}
        </ListGroup>
    );
})

export default Types;