import { Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux'
import { getShipment } from '../../actions/Shipment'
import * as API from '../../api/index'
import moment from 'moment'


const Shipment = () => {
    const [apiResponse, setApiResponse] = useState([])
    const [shipment, setShipment] = useState([])
    const [limit, setLimit] = useState(0)
    const [offset, setOffset] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(25)
    const [page, setPage] = useState(0)

    useEffect(() => {
        API.getShipment({ limit: limit, offset: offset })
            .then((response) => {
                setApiResponse(response.data)
                console.log(response.data)
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
                    pickupDate: moment(shipment.pickupDate).format('DD-MM-YYYY'),
                    deliveryDate: moment(shipment.deliveryDate).format('DD-MM-YYYY'),
                    shipperName: shipment.shipperName,
                    consigneeName: shipment.consigneeName,
                    shipmentStatus: shipment.shipmentStatus.map((item) => (item.sStatus)).slice(-1)
                }))
            );
        }
    }, [apiResponse])

    useEffect(() => {
        // console.log(shipment)
    }, [shipment])


    const columns = [
        { field: 'id', headerName: 'Ref No.' },
        { field: 'commodity', headerName: 'Commodity', width: 100 },
        { field: 'numberOfPackages', headerName: 'Quantity', width: 100 },
        { field: 'shipperCountry', headerName: 'From', width: 70 },
        { field: 'deliveryCountry', headerName: 'To', width: 70 },
        { field: 'pickupDate', headerName: 'Pickup Date', width: 100 },
        { field: 'deliveryDate', headerName: 'Delivery Date', width: 100 },
        { field: 'shipperName', headerName: 'Shipper', width: 150 },
        { field: 'consigneeName', headerName: 'Consignee', width: 100 },
        { field: 'shipmentStatus', headerName: 'Status', width: 200 },
    ]

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} style={{ height: '80vh', width: "100%" }}>
                    <DataGrid
                        rows={shipment}
                        columns={columns}
                        rowsPerPageOptions={[25, 50, 100]}
                        onPageChange={newPage => setPage(newPage)}
                        onPageSizeChange={newSize => setRowsPerPage(newSize)}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Shipment