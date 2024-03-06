import {
  Close,
  Delete,
  Edit,
  Info,
  PanoramaFishEye,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { width } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment/moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listShipment,
  discardShipment,
  activateShipment,
  deleteShipment,
  getSingleShipment,
} from "./ShipmentApis";
import {
  getActivateShipmentState,
  getDeleteShipmentState,
  getDiscardShipmentState,
  getShipmentState,
} from "./ShipmentSlice";
import ViewShipment from "./ViewShipment";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { popoverClasses } from "@mui/material/Popover";
import FilterShipment from "./Forms/FilterShipment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShipmentList = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const role = location?.state?.role;
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const columns = [
    {
      field: "shipmentRefNo",
      headerName: "Ref No",
      flex: 1,
    },
    {
      field: "commodity",
      headerName: "Item",
      flex: 1,
    },
    {
      field: "numberOfPackages",
      headerName: "Count",
      flex: 0.75,
    },
    {
      field: "shipperLocation",
      headerName: "From",
      flex: 1.5,
    },
    {
      field: "delliverLocation",
      headerName: "To",
      flex: 1.5,
    },
    {
      field: "pickupDate",
      headerName: "Pick up date",
      flex: 2,
      renderCell: (params) => moment(params.value).format("DD-MM-yyyy"),
    },
    {
      field: "deliveryDate",
      headerName: "Delivery date",
      flex: 2,
      renderCell: (params) => moment(params.value).format("DD-MM-yyyy"),
    },
    {
      field: "shipperPhone",
      headerName: "Shipper Phone",
      flex: 2,
    },
    {
      field: "consigneePhone",
      headerName: "Consignee Phone",
      flex: 2,
    },
    {
      field: "shipmentStatus",
      headerName: "Status",
      flex: 3,
      renderCell: (params) => {
        const data = params.row.shipmentStatus;
        const lastItem = data[data.length - 1];
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <List key={lastItem._id}>
              <ListItem>
                <ListItemText
                  primary={lastItem.sStatus}
                  secondary={moment(lastItem.shipmentDate).format("DD-MM-yyyy")}
                />
              </ListItem>
            </List>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleView(params.row)}>
            <Tooltip title="View">
              <Visibility fontSize="small" color="primary" />
            </Tooltip>
          </IconButton>
          {/* {(props?.role === "admin" || role === "admin") && ( */}
          <IconButton
            onClick={
              props?.role === "admin" || role === "admin"
                ? () => editShipment(params.row)
                : () => editStatus(params.row)
            }
          >
            <Tooltip title="Edit">
              <Edit fontSize="small" color="secondary" />
            </Tooltip>
          </IconButton>
          {/* )} */}
          {(props?.role === "admin" || role === "admin") && (
            <IconButton onClick={() => deleteThisShipment(params.row._id)}>
              <Tooltip title="Delete">
                <Delete fontSize="small" color="error" />
              </Tooltip>
            </IconButton>
          )}
          {/* <IconButton
            onClick={() =>
              changeActiveStatus(params.row._id, params.row.activeFlag)
            }
          >
            {!!params.row.activeFlag ? (
              <Tooltip title="Discard">
                <RemoveCircleIcon fontSize="small" color="error" />
              </Tooltip>
            ) : (
              <Tooltip title="Activate">
                <CheckBoxIcon fontSize="small" color="success" />
              </Tooltip>
            )}
          </IconButton> */}
        </Box>
      ),
    },
  ];

  const [isViewMore, setIsViewMore] = useState(false);
  const [currentRow, setCurrentRow] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // page state for pagination
  const [rowsPerPage, setRowsPerPage] = useState(12); // rows per page state for pagunation

  const discardState = useSelector(getDiscardShipmentState);
  const activateState = useSelector(getActivateShipmentState);
  const deleteState = useSelector(getDeleteShipmentState);
  const listPayload = {
    limit: rowsPerPage,
    offset: rowsPerPage * currentPage,
    filter: "",
    field: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shipmentState = useSelector(getShipmentState);

  const getShipmentList = async (payload) => {
    await dispatch(listShipment(payload)).unwrap();
  };
  useEffect(() => {
    getShipmentList(listPayload);
  }, [currentPage, rowsPerPage]);

  const handleClose = () => {
    setIsViewMore(false);
  };

  const handleView = (data) => {
    setCurrentRow(data);
    setIsViewMore(true);
    handleMenuClose();
  };

  const changeActiveStatus = (shipmentId, actionState) => {
    Swal.fire({
      icon: "question",
      title: "Confirm",
      text: `Are you sure you want to ${
        !!actionState ? "discard" : "activate"
      } this shipment?`,
      confirmButtonColor: "#8f6d26",
      confirmButtonText: "YES",
      showCancelButton: true,
      cancelButtonText: "NO",
      reverseButtons: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        if (!!actionState) {
          await dispatch(discardShipment(shipmentId)).unwrap();
        } else {
          await dispatch(activateShipment(shipmentId)).unwrap();
        }
      }
    });
  };

  useEffect(() => {
    if (discardState.apiStatus === "failed") {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        confirmButtonColor: "#8f6d26",
        text: `${
          discardState.message
            ? discardState.message
            : "Something went wrong while discarding this shipment. Please try again!!"
        }`,
      });
    }
    if (discardState.apiStatus === "success") {
      Swal.fire({
        icon: "success",
        title: "Success",
        confirmButtonColor: "#8f6d26",
        text: `${
          discardState.data
            ? discardState.data
            : "Shipment discarded successfully!!!"
        }`,
      }).then(async (res) => {
        if (res.isConfirmed) {
          getShipmentList(listPayload);
        }
      });
    }
  }, [discardState]);

  useEffect(() => {
    if (activateState.apiStatus === "failed") {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        confirmButtonColor: "#8f6d26",
        text: `${
          activateState.message
            ? activateState.message
            : "Something went wrong while activating this shipment. Please try again!!"
        }`,
      });
    }
    if (activateState.apiStatus === "success") {
      Swal.fire({
        icon: "success",
        title: "Success",
        confirmButtonColor: "#8f6d26",
        text: `${
          activateState.data
            ? activateState.data
            : "Shipment activated successfully!!!"
        }`,
      }).then(async (res) => {
        if (res.isConfirmed) {
          getShipmentList(listPayload);
        }
      });
    }
  }, [activateState]);

  const deleteThisShipment = (id) => {
    Swal.fire({
      icon: "question",
      title: "CONFIRM",
      text: "Are you sure you want delete this shipment?",
      confirmButtonColor: "#8f6d26",
      confirmButtonText: "YES",
      showCancelButton: true,
      cancelButtonText: "NO",
      reverseButtons: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        await dispatch(deleteShipment(id)).unwrap();
      }
    });
  };

  useEffect(() => {
    if (deleteState.apiStatus === "failed") {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: `${
          deleteState?.message
            ? deleteState?.message
            : "Something went wrong while deleting this shipment. Please try again!!"
        }`,
        confirmButtonColor: "#8f6d26",
      });
    }
    if (deleteState.apiStatus === "success") {
      Swal.fire({
        icon: "success",
        title: "SUCCESS",
        text: `${
          deleteState?.data
            ? deleteState?.data
            : "Shipment deleted successfully!!"
        }`,
        confirmButtonColor: "#8f6d26",
      }).then(async (res) => {
        if (res.isConfirmed) {
          getShipmentList(listPayload);
        }
      });
    }
  }, [deleteState]);

  const editShipment = async (params) => {
    navigate(`/shipment/edit/${params?.shipmentRefNo}`, {
      replace: true,
      forceRefresh: true,
      state: {
        isEdit: true,
        shipmentId: params?.shipmentRefNo,
        mainId: params._id,
      },
    });
  };
  const editStatus = (data) => {
    console.log(data);
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Grid item xs={12}>
        <Paper sx={{ padding: "0 1rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ textTransform: "uppercase", margin: "1rem 0" }}
            >
              Shipment List
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() =>
                navigate("/shipment/new", {
                  replace: true,
                  state: { isEdit: false },
                })
              }
            >
              Add new
            </Button>
          </Box>
          <hr />
          <Box>
            <FilterShipment
              getList={(data) => getShipmentList(data)}
              listPayload={listPayload}
            />
          </Box>
          <Box sx={{ height: "70vh", width: "100%" }}>
            <DataGrid
              rows={shipmentState?.data}
              columns={columns}
              // autoHeight={true}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[12, 25, 50, 100]}
              disableSelectionOnClick
              pageSize={rowsPerPage}
              rowCount={shipmentState?.count}
              onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
              onPageChange={(newPage) => setCurrentPage(newPage)}
              pagination
              paginationMode="server"
              page={currentPage}
              loading={shipmentState.apiStatus === "pending"}
            />
          </Box>
          <Dialog
            fullWidth
            maxWidth="lg"
            open={isViewMore}
            keepMounted
            TransitionComponent={Transition}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
              }}
            >
              <DialogTitle sx={{ padding: 0 }}>Shipment Details</DialogTitle>
              <IconButton size="small" onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
            <DialogContent sx={{ minWidth: "300px" }} dividers>
              <ViewShipment data={currentRow} />
            </DialogContent>
          </Dialog>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ShipmentList;
