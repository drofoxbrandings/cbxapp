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
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./AuthenticationApis";
import { useNavigate } from "react-router-dom";
import SecureLS from "secure-ls";
import { getLoggedInUser } from "./AuthenticationSlice";

const Login = () => {
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required!!")
      .min(3, "Username should be atleast 3 characters!!"),
    password: Yup.string()
      .required("Password is required!!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be minimum 8 characters long and must contain atleast one uppercase letter, one numeric digit and one special character"
      ),
  });
  const { handleSubmit, control, ref } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const [microLoading, setMicroLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(
    (state) => state.authentication?.login.apiStatus
  );
  const message = useSelector((state) => state.authentication?.login.message);

  const user = useSelector(getLoggedInUser);

  useEffect(() => {
    if (apiStatus === "pending") {
      setMicroLoading(true);
    }
    if (apiStatus === "failed") {
      setMicroLoading(false);
      setErrorAlert(true);
      setErrorMessage(message);
    }
    if (apiStatus === "success") {
      const ls = new SecureLS({ encodingType: "aes" });
      ls.set("authToken", user.token);
      setTimeout(() => {
        navigate("/shipment", { replace: true });
        setMicroLoading(false);
      }, 1500);
    }
  }, [apiStatus, message, navigate]);

  const onSubmit = async (values) => {
    await dispatch(userLogin(values)).unwrap();
  };
  return (
    <Grid
      container
      sx={{
        width: '100%',
        minHeight: "100vh",
        padding: '1rem',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: 'url(https://img.freepik.com/free-vector/employees-deliver-goods-various-forms-customers_1150-35058.jpg?w=1800&t=st=1678957199~exp=1678957799~hmac=116e9109440124ac8ce6796c31a886c3cda51b1bdff58e001d23b4b189fc9d56)',
        // backgroundSize: 'cover'
      }}
    >
      <Grid item xs={12} md={3}>
        <Card elevation={5} sx={{ background: "#ffffff" }}>
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
                {errorMessage}
              </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <Controller
                  name="username"
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
                      label="Username"
                      placeholder="johndoe"
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  name="password"
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
                      type="password"
                      size="small"
                      label="password"
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
                <Link
                  href="/forgotPassword"
                  color="secondary"
                  underline="hover"
                >
                  Forgot password
                </Link>
              </Typography>
              <FormControl fullWidth sx={{ margin: "1rem 0" }}>
                <Button variant="contained" type="submit" color="primary">
                  {!!microLoading ? (
                    <CircularProgress sx={{ color: "#fff" }} size={24} />
                  ) : (
                    "Login"
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

export default Login;
