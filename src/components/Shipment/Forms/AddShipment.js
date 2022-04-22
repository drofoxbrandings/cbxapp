import { Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { addShipmentFields } from '../../../constants/AddShipmentFields'
import useStyles from './FormStyles'

const AddShipment = () => {
    const classes = useStyles()
    return (
        <Container sx={{padding:'1rem'}}>
            <Grid container>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            shipmentRefNo: '',
                            shipperName: '',
                            shipperEmail: '',
                            shipperPhone: '',
                            shipperLocation: '',
                            shipperState: '',
                            shipperCountry: '',
                            consigneeName: '',
                            consigneeEmail: '',
                            consigneePhone: '',
                            delliverLocation: '',
                            deliveryCity: '',
                            deliveryCountry: '',
                            commodity: '',
                            numberOfPackages: '',
                            pickupDate: '',
                            deliveryDate: '',
                            shipmentStatus: {
                                shipmentDate: '',
                                sStatus: ''
                            },
                            activeFlag: true
                        }}
                        validationSchema={Yup.object({
                            shipmentRefNo: Yup.string(),
                            shipperName: Yup.string().required("Shipper name is required"),
                            shipperEmail: Yup.string().required("Shipper email is required").email('Invalid email'),
                            shipperPhone: Yup.string().required("Shipper phone is required").min(10, 'Invalid phone number').max(10, 'Invalid phone number'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            alert(JSON.stringify(values))
                        }}
                    >
                        {(formikProps) => (
                            <Paper sx={{ padding: '2rem' }} elevation={3}>
                                <Typography variant='h6'>Add new shipment</Typography>
                                <Form onSubmit={formikProps.handleSubmit}>
                                    <Grid container spacing={2}>
                                        {addShipmentFields.map((fields) => (
                                            <Grid item md={4} xs={12}>
                                                <div className={classes.formField}>
                                                    <Field
                                                        {...fields}
                                                        fullWidth
                                                        as={TextField}
                                                        variant='standard'
                                                        value={formikProps.values.name}
                                                        onChange={formikProps.handleChange}
                                                        onBlur={formikProps.handleBlur}
                                                    />
                                                    <ErrorMessage className={classes.errorMsg} component="span" name={fields.name} />
                                                </div>
                                            </Grid>
                                        ))}
                                        {/* <Grid item md={4} xs={12}>
                                            <div className={classes.formField}>
                                                <Field
                                                    fullWidth
                                                    name='shipperName'
                                                    as={TextField}
                                                    label="Shipper name"
                                                    variant='standard'
                                                    value={formikProps.values.shipperName}
                                                    onChange={formikProps.handleChange}
                                                    onBlur={formikProps.handleBlur}
                                                />
                                                <ErrorMessage className={classes.errorMsg} component="span" name="shipperName" />
                                            </div>
                                        </Grid> */}
                                        {/* <Grid item md={4} xs={12}>
                                            <div className={classes.formField}>
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    label="Shipper email"
                                                    type="email"
                                                    name="shipperEmail"
                                                    value={formikProps.values.shipperEmail}
                                                    onChange={formikProps.handleChange}
                                                    onBlur={formikProps.handleBlur}
                                                    autoComplete="off"
                                                    variant="standard"
                                                />
                                                <ErrorMessage className={classes.errorMsg} component="span" name="shipperEmail" />
                                            </div>
                                        </Grid> */}
                                    </Grid>
                                </Form>
                            </Paper>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AddShipment