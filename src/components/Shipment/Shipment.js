import { Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import { getShipment } from '../../actions/Shipment'
import * as API from '../../api/index'


const Shipment = () => {
    const [apiResponse, setApiResponse] = useState([])
    const [shipment, setShipment] = useState([])

    useEffect(() => {
        API.getShipment()
            .then((response) => {
                setApiResponse(response.data.data)
            })
    }, [])

    useEffect(() => {
        if (apiResponse && apiResponse.length > 0) {
            let shipmentStatus = apiResponse.map((item) => {
                item.shipmentStatus.map((sStatus) => {
                    return sStatus.shipmentStatus
                })
            })
            console.log(shipmentStatus)
            setShipment(
                apiResponse.map((shipment) => ({
                    id: shipment.shipmentRefNo,
                    commodity: shipment.commodity,
                    numberOfPackages: shipment.numberOfPackages,
                    shipperCountry: shipment.shipperCountry,
                    deliveryCountry: shipment.deliveryCountry,
                    pickupDate: shipment.pickupDate,
                    deliveryDate: shipment.deliveryDate,
                    shipperName: shipment.shipperName,
                    consigneeName: shipment.consigneeName,
                    shipmentStatus: shipmentStatus
                }))
            );
        }
    }, [apiResponse])

    const columns = [
        { field: 'id', headerName: 'Ref No.' },
        { field: 'commodity', headerName: 'Commodity', width: 100 },
        { field: 'numberOfPackages', headerName: 'Quantity', width: 100 },
        { field: 'shipperCountry', headerName: 'From', width: 100 },
        { field: 'deliveryCountry', headerName: 'To', width: 100 },
        { field: 'pickupDate', headerName: 'Pickup Date', width: 100 },
        { field: 'deliveryDate', headerName: 'Delivery Date', width: 100 },
        { field: 'shipperName', headerName: 'Shipper', width: 100 },
        { field: 'consigneeName', headerName: 'Consignee', width: 100 },
        { field: 'shipmentStatus', headerName: 'Status', width: 100 },
    ]

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} style={{ height: '80vh', width: "100%" }}>
                    <DataGrid
                        rows={shipment}
                        columns={columns}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Shipment