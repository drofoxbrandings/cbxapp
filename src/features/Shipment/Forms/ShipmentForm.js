import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import CommodityForm from "./CommodityForm";
import ConsigneeForm from "./ConsigneeForm";
import ShipperForm from "./ShipperForm";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewShipment,
  editShipment,
  getSingleShipment,
  updateShipment,
} from "../ShipmentApis";
import {
  getNewShipmentState,
  getSingleShipmentState,
  getUpdateShipmentState,
  resetSingleShipment,
} from "../ShipmentSlice";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import Loader from "../../../components/Loader";
import CarrierForm from "./CarrierForm";
import ContainerForm from "./ContainerForm";

const ShipmentForm = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const shipmentId = location?.state?.mainId;
  const shipmentRefNo = location?.state?.shipmentId;
  const _rsNewShipmentState = useSelector(getNewShipmentState);
  const _rsUpdateShipmentState = useSelector(getUpdateShipmentState);
  const [showStatusReason, setShowStatusReason] = useState(false);

  const reasonableStatus = [
    "Cargo hold at destination due to",
    "Cargo hold at origin due to",
  ];

  const schema = [
    Yup.object().shape({
      shipStatus: Yup.string().required("Required!!"),
      statusReason: Yup.string().when("shipStatus", {
        is: (shipStatus) => reasonableStatus.includes(shipStatus),
        then: Yup.string().required("Required!!"),
        otherwise: Yup.string().notRequired(),
      }),
      commodity: Yup.string().required("Required!!"),
      numberOfPackages: Yup.number()
        .required("Required!!")
        .typeError("Required!!"),
      pickupDate: Yup.string().required("Required!!").nullable(),
      deliveryDate: Yup.string().required("Required!!").nullable(),
    }),
    Yup.object().shape({
      shipperName: Yup.string()
        .required("Required!!")
        .min(3, "Name should contain atleast 3 characters!!")
        .max(56, "Name should not exceed 56 characters!!"),
      shipperEmail: Yup.string()
        .required("Required!!")
        .email("Invalid email!!"),
      shipperPhone: Yup.string()
        .required("Required!!")
        .min(10, "Please enter a valid phone number")
        .max(10, "Please enter a valid phone number!!"),
      shipperLocation: Yup.string().required("Required!!"),
      shipperState: Yup.string().required("Required!!"),
      shipperCountry: Yup.string().required("Required!!"),
    }),
    Yup.object().shape({
      consigneeName: Yup.string().required("Required!!"),
      consigneeEmail: Yup.string()
        .required("Required!!")
        .email("Invalid email!!"),
      consigneePhone: Yup.string()
        .required("Required!!")
        .min(10, "Please enter a valid phone number")
        .max(10, "Please enter a valid phone number!!"),
      delliverLocation: Yup.string().required("Required!!"),
      deliveryCity: Yup.string().required("Required!!"),
      deliveryCountry: Yup.string().required("Required!!"),
      consigneePostalCode: Yup.string().required("Required!!"),
    }),
    Yup.object().shape({
      carrierName: Yup.string().notRequired(),
      carrierTrackingId: Yup.string().notRequired(),
      carrierLink: Yup.string().notRequired(),
    }),
    Yup.object().shape({
      containerNumber: Yup.string().notRequired(),
      expectedDepartureDate: Yup.string().notRequired(),
      expectedArrivalDate: Yup.string().notRequired(),
    }),
  ];

  const currentValidationSchema = schema[activeStep];
  const { control, ref, handleSubmit, reset, watch, formState } = useForm({
    mode: "onBlur",
    resolver: yupResolver(currentValidationSchema),
  });

  const { errors } = formState;

  const watchedStatus = watch("shipStatus");

  useEffect(() => {
    console.log(watchedStatus);
    if (watchedStatus !== "" && reasonableStatus.includes(watchedStatus)) {
      setShowStatusReason(true);
    } else {
      setShowStatusReason(false);
    }
  }, [watchedStatus]);

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
    {
      label: "Carrier Details",
      description: "Enter the carrier information.",
    },
    {
      label: "Container Details",
      description: "Enter the container information.",
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
        return (
          <CommodityForm
            control={control}
            ref={ref}
            errors={errors}
            data={props?.singleShipmentData}
            isEdit={props.isEdit}
            showStatusReason={showStatusReason}
          />
        );
      case 1:
        return (
          <ShipperForm
            control={control}
            ref={ref}
            isEdit={props.isEdit}
            data={props?.singleShipmentData}
          />
        );
      case 2:
        return (
          <ConsigneeForm
            control={control}
            ref={ref}
            isEdit={props.isEdit}
            data={props?.singleShipmentData}
          />
        );
      case 3:
        return (
          <CarrierForm
            control={control}
            ref={ref}
            isEdit={props.isEdit}
            data={props?.singleShipmentData}
          />
        );
      case 4:
        return (
          <ContainerForm
            control={control}
            ref={ref}
            isEdit={props.isEdit}
            data={props?.singleShipmentData}
          />
        );

      default:
        break;
    }
  };
  const addShipment = async (values) => {
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
        consigneePostalCode: values.consigneePostalCode,
        delliverLocation: values.delliverLocation,
        deliveryCity: values.deliveryCity,
        deliveryCountry: values.deliveryCountry,
        commodity: values.commodity,
        numberOfPackages: values.numberOfPackages,
        pickupDate: moment(values.pickupDate).format(),
        deliveryDate: moment(values.deliveryDate).format(),
        shipmentStatus: {
          shipmentDate: moment().format(),
          sStatus: values.shipStatus,
          statusReason: values?.statusReason,
        },
        activeFlag: "true",
        carrierName: values?.carrierName,
        carrierTrackingId: values?.carrierTrackingId,
        carrierLink: values?.carrierLink,
        containerNumber: values?.containerNumber,
        expectedDepartureDate: values?.expectedDepartureDate,
        expectedArrivalDate: values?.expectedArrivalDate,
      };
      const payloadEdit = {
        data: {
          shipperName: values.shipperName,
          shipmentRefNo: shipmentRefNo,
          shipperEmail: values.shipperEmail,
          shipperPhone: values.shipperPhone,
          shipperLocation: values.shipperLocation,
          shipperState: values.shipperState,
          shipperCountry: values.shipperCountry,
          consigneeName: values.consigneeName,
          consigneeEmail: values.consigneeEmail,
          consigneePhone: values.consigneePhone,
          consigneePostalCode: values.consigneePostalCode,
          delliverLocation: values.delliverLocation,
          deliveryCity: values.deliveryCity,
          deliveryCountry: values.deliveryCountry,
          commodity: values.commodity,
          numberOfPackages: values.numberOfPackages,
          pickupDate: moment(values.pickupDate).format(),
          deliveryDate: moment(values.deliveryDate).format(),
          shipmentStatus: {
            shipmentDate: moment().format(),
            sStatus: values.shipStatus,
          },
          activeFlag: "true",
          carrierName: values?.carrierName,
          carrierTrackingId: values?.carrierTrackingId,
          carrierLink: values?.carrierLink,
          containerNumber: values?.containerNumber,
          expectedDepartureDate: values?.expectedDepartureDate,
          expectedArrivalDate: values?.expectedArrivalDate,
        },
        id: shipmentId,
      };
      props?.isEdit
        ? await dispatch(updateShipment(payloadEdit)).unwrap()
        : await dispatch(addNewShipment(payload)).unwrap();
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    if (_rsNewShipmentState.apiStatus === "success") {
      Swal.fire({
        icon: "success",
        title: "Hoorrayy!!",
        text: _rsNewShipmentState?.message
          ? _rsNewShipmentState?.message
          : "New shipment added suuccessfully!!",
        confirmButtonColor: "#8f6d26",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location = "/shipment";
        }
      });
    }
    if (_rsNewShipmentState.apiStatus === "failed") {
      Swal.fire({
        icon: "error",
        title: "Uh Oh!!",
        text: _rsNewShipmentState?.message
          ? _rsNewShipmentState?.message
          : "Something went wrong while adding new shipment. Please try again!!",
        confirmButtonColor: "#8f6d26",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location = "/shipment";
        }
      });
    }
  }, [_rsNewShipmentState]);

  useEffect(() => {
    if (_rsUpdateShipmentState?.apiStatus === "failed") {
      Swal.fire({
        icon: "error",
        title: "Uh Oh!!",
        text: _rsUpdateShipmentState?.message
          ? _rsUpdateShipmentState?.message
          : "Something went wrong while adding new shipment. Please try again!!",
        confirmButtonColor: "#8f6d26",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location = "/shipment";
        }
      });
    }
    if (_rsUpdateShipmentState?.apiStatus === "success") {
      Swal.fire({
        icon: "success",
        title: "Hooorrayy!!",
        text: _rsUpdateShipmentState?.message
          ? _rsUpdateShipmentState?.message
          : "Shipment updated successfully!!",
        confirmButtonColor: "#8f6d26",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location = "/shipment";
        }
      });
    }
  }, [_rsUpdateShipmentState]);

  const handlePageClose = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(resetSingleShipment());
      window.location = "/shipment";
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(addShipment)}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h5">ADD NEW SHIPMENT</Typography>
          <Box>
            <IconButton
              color="white.light"
              size="medium"
              onClick={handlePageClose}
            >
              <CancelIcon />
            </IconButton>
          </Box>
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
              {isLastStep ? (props?.isEdit ? "Update" : "Add") : "next"}
            </Button>
          </FormControl>
        </Grid>
      </Grid>
      <Loader
        open={
          isLoading ||
          _rsNewShipmentState?.apiStatus === "pending" ||
          _rsUpdateShipmentState?.apiStatus === "pending"
        }
      />
    </form>
  );
};

export default ShipmentForm;
