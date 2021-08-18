import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card";

const Brands = observer(() => {
    const {device} = useContext(Context)


    return (
        <Row className="brand">
            {
                device.brands.map(brand =>
                <Card
                    style={{cursor: "pointer"}}
                    border={brand.id === device.selectedBrand.id ? "dark" : ""}
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id} className="p-3">
                    {brand.name}
                </Card>
            )}
        </Row>
    );
})

export default Brands;