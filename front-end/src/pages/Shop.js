import React, {useContext, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Types from "../components/Types";
import Brands from "../components/Brands";
import Device_list from "../components/Device_list";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {allTypes, allBrands, allDevices} from "../requests_http/device_api";
import PaginationDevice from "../components/PaginationDevice"
import {Spinner} from "react-bootstrap";



const Shop = observer(() => {
    const {device} = useContext(Context)
    const [loadTypes, setLoadTypes] = useState(true)
    const [loadBrands, setLoadBrands] = useState(true)
    const [loadDevices, setLoadDevices] = useState(true)
    const [zero, setZero] = useState()

    useEffect(() =>  {
            allTypes().then(data => device.setIsTypes(data)).finally(() => setLoadTypes(false))
            allBrands().then(data => device.setBrands(data)).finally(() => setLoadBrands(false))
            allDevices(null, null, 1, device.limit).then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
                setZero(data.count)
            })
    },[])



    useEffect(() => {
        allDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            setZero(data.count)
        }).finally(() => setLoadDevices(false))
    }, [device.page, device.selectedType, device.selectedBrand])


    return (
       <Container>
           <Row className="brandAndType">
               <Col md={2}>
                   {loadTypes ?
                       <div className="wrapp-spinner">
                           <Spinner animation="border" role="status">
                               <span className="visually-hidden"></span>
                           </Spinner>
                       </div>
                       :
                       <Types/>}

                   {loadBrands ?
                       <div className="wrapp-spinner">
                           <Spinner animation="border" role="status">
                               <span className="visually-hidden"></span>
                           </Spinner>
                       </div>
                       :
                       <Brands/>}

               </Col>
               <Col md={9} className="listOfDevices">
                   {zero === 0 ?
                       <div className="not-found">
                           <h1>{device.selectedType.name}
                               {device.selectedBrand.name === undefined ? " not found"
                                   : ` with brand ${device.selectedBrand.name} not found` }
                           </h1>
                       </div>
                        :
                       <Device_list/>
                   }

               </Col>
               <PaginationDevice/>
           </Row>
       </Container>
    );
})

export default Shop;