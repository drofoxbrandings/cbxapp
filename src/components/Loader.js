import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Loader = (props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <CircularProgress color="inherit" />
      {/* <img width="15%" src={loadingGif} alt="loading" /> */}
    </Backdrop>
  );
};

export default Loader;
