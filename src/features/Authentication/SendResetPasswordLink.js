import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import cbxLogo from "../../assets/images/logo.png";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetLink } from "./AuthenticationApis";
import { useNavigate } from "react-router-dom";

const SendResetPasswordLink = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required!!")
      .email("Invalid email!!"),
  });

  const [microLoading, setMicroLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  const { handleSubmit, ref, control, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiStatus = useSelector(
    (state) => state.authentication.sendPasswordResetLink.apiStatus
  );

  const message = useSelector(
    (state) => state.authentication.sendPasswordResetLink.message
  );

  const statusCode = useSelector(
    (state) => state.authentication.sendPasswordResetLink.statusCode
  );

  useEffect(() => {
    if (apiStatus === "pending") {
      setMicroLoading(true);
    }
    if (apiStatus === "failed") {
      setTimeout(() => {
        setMicroLoading(false);
        setErrorAlert(true);
        setAlertMessage(message);
        setSuccessAlert(false);
      }, 1500);
    }
    if (apiStatus === "success") {
      setTimeout(() => {
        setMicroLoading(false);
        setErrorAlert(false);
        setAlertMessage(message);
        setSuccessAlert(true);
      }, 1500);

      setTimeout(() => {
        setAlertMessage('');
        setSuccessAlert(false);
        reset()
        // navigate("/", { replace: true });
      }, 5000);
    }
  }, [apiStatus, message]);

  const onSubmit = async (values) => {
    await dispatch(sendPasswordResetLink(values)).unwrap();
  };
  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} md={3}>
        <Card elevation={5} >
          {/* <CardMedia
            sx={{
              height: "250px",
              width: "100%",
              backgroundPosition: "center",
              backgroundSize: "70%",
            }}
            image={`${cbxLogo}`}
          /> */}
          <CardContent>
            {!!errorAlert && (
              <Alert sx={{ marginBottom: "1rem" }} severity="error">
                {alertMessage}
              </Alert>
            )}
            {!!successAlert && (
              <Alert sx={{ marginBottom: "1rem" }} severity="success">
                {alertMessage}
              </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <Controller
                  name="email"
                  control={control}
                  ref={ref}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!fieldState.error?.message}
                      helperText={fieldState.error?.message}
                      margin="dense"
                      size="small"
                      type="text"
                      label="Email"
                      placeholder="johndoe@example.com"
                    />
                  )}
                />
              </FormControl>
              <Typography
                color="secondary"
                variant="body1"
                gutterBottom
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: ".5rem",
                }}
              >
                <Link href="/" color="secondary" underline="hover">
                  Login
                </Link>
              </Typography>
              <FormControl fullWidth sx={{ margin: "1rem 0" }}>
                <Button variant="contained" type="submit" color="primary">
                  {!!microLoading ? (
                    <CircularProgress sx={{ color: "#fff" }} size={24} />
                  ) : (
                    "Get password reset link"
                  )}
                </Button>
              </FormControl>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SendResetPasswordLink;
