import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Check } from "@mui/icons-material";

const ViewShipment = (props) => {
  const [shipmentStatusCurr, setShipmentStatusCurr] = useState();
  useEffect(() => {
    const newArr = [];
    props?.data?.shipmentStatus?.map((item) => {
      newArr.push(item);
    });
    setShipmentStatusCurr(newArr);
    console.log(newArr.slice(-1)[0]);
  }, [props]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Basic Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <List component={Stack} direction="row">
                <ListItem>
                  <ListItemText
                    primary={`Shipment Ref No:`}
                    secondary={`${props.data.shipmentRefNo}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Commodity:`}
                    secondary={`${props.data.commodity}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`No.of.packages:`}
                    secondary={`${props.data.numberOfPackages}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Container No:`}
                    secondary={`${props.data.containerNumber}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Pickup Date:`}
                    secondary={`${moment(props.data.pickupDate).format(
                      "DD-MM-YYYY"
                    )}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Delivery Date: `}
                    secondary={`${moment(props.data.deliveryDate).format(
                      "DD-MM-YYYY"
                    )}`}
                  />
                </ListItem>
              </List>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Shipper Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List component={Stack} direction="row">
              <ListItem>
                <ListItemText
                  primary={`Name:`}
                  secondary={`${props.data.shipperName}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Phone: `}
                  secondary={`${props.data.shipperPhone}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Email: `}
                  secondary={`${props.data.shipperEmail}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`City: `}
                  secondary={`${props.data.shipperLocation}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`State: `}
                  secondary={`${props.data.shipperState}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Country: `}
                  secondary={`${props.data.shipperCountry}`}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Consignee Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List component={Stack} direction="row">
              <ListItem>
                <ListItemText
                  primary={`Name:`}
                  secondary={`${props.data.consigneeName}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Phone: `}
                  secondary={`${props.data.consigneePhone}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Email: `}
                  secondary={`${props.data.consigneeEmail}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Postal Code: `}
                  secondary={`${props.data.consigneePostalCode}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`City: `}
                  secondary={`${props.data.delliverLocation}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`State: `}
                  secondary={`${props.data.deliveryCity}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Country: `}
                  secondary={`${props.data.deliveryCountry}`}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Carrier Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List component={Stack} direction="row">
              <ListItem>
                <ListItemText
                  primary={`Name:`}
                  secondary={`${props.data.carrierName}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Tracking Id: `}
                  secondary={`${props.data.carrierTrackingId}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Link: `}
                  secondary={<Link href={`${props.data.carrierLink}`}>{props.data.carrierLink}</Link>}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Shipment Status History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Timeline>
              {shipmentStatusCurr &&
                (shipmentStatusCurr || []).map((item, i) => (
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      {moment(item.shipmentDate).format("DD-MM-YYYY")}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        color={
                          i === shipmentStatusCurr.length - 1
                            ? "success"
                            : "primary"
                        }
                      />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>{item.sStatus}</TimelineContent>
                  </TimelineItem>
                ))}
            </Timeline>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default ViewShipment;
