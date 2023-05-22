import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";

const ViewShipment = (props) => {
  const [shipmentStatusCurr, setShipmentStatusCurr] = useState();
  useEffect(() => {
    const newArr = [];
    props?.data?.shipmentStatus?.map((item) => {
      console.log(item);
      newArr.push(item);
    });
    setShipmentStatusCurr(newArr);
  }, [props]);

  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <Typography variant="h6">Basic Details</Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={`Shipment Ref No: ${props.data.shipmentRefNo}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Commodity: ${props.data.commodity}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`No.of.packages: ${props.data.numberOfPackages}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Pickup Date: ${moment(props.data.pickupDate).format('DD-MM-YYYY')}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Delivery Date: ${moment(props.data.deliveryDate).format('DD-MM-YYYY')}`}
            />
          </ListItem>
          <ListItem sx={{ display: "flex", alignItems: "baseline" }}>
            <Typography>Shipment Status:</Typography>
            <List>
              {shipmentStatusCurr &&
                (shipmentStatusCurr || []).map((item) => (
                  <ListItem>
                    <ListItemText
                      primary={item.sStatus}
                      secondary={moment(item.shipmentDate).format("DD-MM-YYYY")}
                    />
                  </ListItem>
                ))}
            </List>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6">Shipper Details</Typography>
        <List>
          <ListItem>
            <ListItemText primary={`Name: ${props.data.shipperName}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Phone: ${props.data.shipperPhone}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Email: ${props.data.shipperEmail}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`City: ${props.data.shipperLocation}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`State: ${props.data.shipperState}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Country: ${props.data.shipperCountry}`} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6">Consignee Details</Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={`Name: ${props.data.consigneeName}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Phone: ${props.data.consigneePhone}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Email: ${props.data.consigneeEmail}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={`City: ${props.data.delliverLocation}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`State: ${props.data.deliveryCity}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Country: ${props.data.deliveryCountry}`} />
          </ListItem>
        </List>
      </Grid>

      {/* <ListItem sx={{ display: "flex", alignItems: "baseline" }}>
        <ListItemText primary={`Shipment status: `} />
        <List>
          {props?.data?.shipmentStatus.map((item, i) => (
            <ListItem>
              <ListItemText
                primary={item.sStatus}
                secondary={item.shipmentDate}
              />
            </ListItem>
          ))}
        </List>
      </ListItem> */}
    </Grid>
  );
};

export default ViewShipment;
