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
  TextField,
  Typography,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import cbxLogo from "../../assets/images/logo.png";
import * as Yup from "yup";

const ResetPassword = () => {
  const { userId, resetToken } = useParams();

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Please enter your new password!!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be minimum 8 characters long and must contain atleast one uppercase letter, one numeric digit and one special character!!"
      ),
  });

  const { control, ref, handleSubmit } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [microLoading, setMicroLoading] = useState(false);

  const onSubmit = (values) => {
    console.log(values);
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
            {/* {!!errorAlert && (
              <Alert sx={{ marginBottom: "1rem" }} severity="error">
                {alertMessage}
              </Alert>
            )}
            {!!successAlert && (
              <Alert sx={{ marginBottom: "1rem" }} severity="success">
                {alertMessage}
              </Alert>
            )} */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <Controller
                  name="newPassword"
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
                      label="New Password"
                      placeholder="********"
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
                    "Reset Password"
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

export default ResetPassword;
