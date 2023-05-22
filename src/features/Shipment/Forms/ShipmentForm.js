import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import CommodityForm from "./CommodityForm";
import ConsigneeForm from "./ConsigneeForm";
import ShipperForm from "./ShipperForm";
import moment from "moment";

const ShipmentForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const schema = [
    Yup.object().shape({
      commodity: Yup.string().required("Commodity is required!!"),
      numberOfPackages: Yup.number()
        .required("Number of packages is required!!")
        .typeError("Number of packages is required!!"),
      pickupDate: Yup.date()
        .required("Pickup date is required!!")
        .typeError("Pickup date is required!!"),
    }),
    Yup.object().shape({
      shipperName: Yup.string()
        .required("Name is required!!")
        .min(3, "Name should contain atleast 3 characters!!")
        .max(56, "Name should not exceed 56 characters!!"),
      shipperEmail: Yup.string()
        .required("Email is required!!")
        .email("Invalid email!!"),
      shipperPhone: Yup.string()
        .required("Mobile number is required!!")
        .min(10, "Please enter a valid phone number")
        .max(10, "Please enter a valid phone number!!"),
      shipperLocation: Yup.string().required("Location is required!!"),
      shipperState: Yup.string().required("State is required!!"),
      shipperCountry: Yup.string().required("Country is required!!"),
    }),
    Yup.object().shape({
      consigneeName: Yup.string().required("Name is required!!"),
      consigneeEmail: Yup.string()
        .required("Email is required!!")
        .email("Invalid email!!"),
      consigneePhone: Yup.string()
        .required("Mobile number is required!!")
        .min(10, "Please enter a valid phone number")
        .max(10, "Please enter a valid phone number!!"),
      delliverLocation: Yup.string().required("Location is required!!"),
      deliveryCity: Yup.string().required("State is required!!"),
      deliveryCountry: Yup.string().required("Country is required!!"),
    }),
  ];

  const currentValidationSchema = schema[activeStep];
  const { control, ref, handleSubmit, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(currentValidationSchema),
    defaultValues: {
      commodity: "",
      numberOfPackages: "",
      pickupDate: "",
      shipperName: "",
    },
  });

  const steps = [
    {
      label: "Commodity Details",
      description: "Enter the commodity information.",
    },
    {
      label: "Shipper Details",
      description: "Enter the shipper information.",
    },
    {
      label: "Consignee Details",
      description: "Enter the consignee information.",
    },
  ];

  const isLastStep = activeStep === steps.length - 1;
  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === steps.length ? prevActiveStep : prevActiveStep + 1
    );
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const renderStepContent = (activeStep) => {
    switch (activeStep) {
      case 0:
        return <CommodityForm control={control} ref={ref} />;
      case 1:
        return <ShipperForm control={control} ref={ref} />;
      case 2:
        return <ConsigneeForm control={control} ref={ref} />;

      default:
        break;
    }
  };
  const addShipment = (values) => {
    console.log(activeStep);
    if (isLastStep) {
      const payload = {
        shipperName: values.shipperName,
        shipperEmail: values.shipperEmail,
        shipperPhone: values.shipperPhone,
        shipperLocation: values.shipperLocation,
        shipperState: values.shipperState,
        shipperCountry: values.shipperCountry,
        consigneeName: values.consigneeName,
        consigneeEmail: values.consigneeEmail,
        consigneePhone: values.consigneePhone,
        delliverLocation: values.delliverLocation,
        deliveryCity: values.deliveryCity,
        deliveryCountry:values.deliveryCountry,
        commodity: values.commodity,
        numberOfPackages: values.numberOfPackages,
        pickupDate: values.pickupDate,
        deliveryDate: values.deliveryDate,
        shipmentStatus: { shipmentDate: moment().format('mm-dd-YYYY'), sStatus: "status6" },
        activeFlag: "true",
      };
      console.log(values);
    } else {
      handleNext();
    }
  };
  return (
    <form onSubmit={handleSubmit(addShipment)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            ADD NEW SHIPMENT
          </Typography>
        </Grid>
      </Grid>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography sx={{ marginBottom: "2rem" }} variant="caption">
                {step.description}
              </Typography>
              {renderStepContent(activeStep)}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {activeStep !== 0 && (
            <FormControl fullWidth margin="dense">
              <Button variant="outlined" color="secondary" onClick={handleBack}>
                Back
              </Button>
            </FormControl>
          )}
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="dense">
            <Button variant="contained" color="secondary" type="submit">
              {isLastStep ? "Add" : "next"}
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default ShipmentForm;
