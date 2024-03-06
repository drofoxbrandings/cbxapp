import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SecureLS from "secure-ls";
import { revertAll } from "../features/Authentication/AuthenticationSlice";
import Loader from "./Loader";

const Header = () => {
  const ls = new SecureLS({ encodingType: "aes" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      window.location = "/";
      dispatch(revertAll());
      ls.clear();
      setLoading(false);
    }, 1500);
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{
        background: "#fff",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end", margin: "1rem" }}
      >
        <Button variant="contained" size="small" onClick={logout}>
          Logout
        </Button>
      </Grid>
      <Loader open={!!loading} />
    </Grid>
  );
};

export default Header;
