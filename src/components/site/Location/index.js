import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Map from "./map";
import * as commonHelper from "../../../utils/helpers/commonHelper";
import * as actions from "../../../utils/store/actions";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";

const Location = (props) => {
  const dispatch = useDispatch();
  const locationState = useSelector((state) => state.location);

  const isClosable = locationState.latitude && locationState.longitude;

  useEffect(() => {
    //console.log(locationState);
  }, [locationState]);
  useEffect(() => {
    if (!locationState.latitude || !locationState.longitude) {
      dispatch(actions.locationPopup(true));
    }
  }, []);

  const handleClose = () => {
    dispatch(actions.locationPopup(false));
  };

  const currentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        //console.log(position);
        if (position && position.coords) {
          //dispatch(actions.locationPopup(false));
          const response = await commonHelper.getGeocode({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          if (
            response &&
            response.results[0] &&
            response.results[0].formatted_address
          ) {
            dispatch(
              actions.updateLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                address: response.results[0].formatted_address,
              })
            );
          } else {
            dispatch(
              actions.updateLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              })
            );
          }
          dispatch(actions.cartClear());
        }
      });
    } else {
      console.log("Sorry, browser does not support geolocation");
    }
  };

  return (
    <>
      <Dialog
        open={locationState.popup}
        onClose={handleClose}
        maxWidth={"lg"}
        fullWidth
      >
        <DialogTitle> Choose Location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Map
              value={{
                latitude: locationState.latitude,
                longitude: locationState.longitude,
                address: locationState.address,
              }}
              onChange={(location) => {
                //dispatch(actions.locationPopup(false));
                dispatch(actions.updateLocation(location));
                dispatch(actions.cartClear());
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginBottom: 20 }}>
          <Button variant="contained" color="primary" onClick={currentLocation}>
            Use Current Location
          </Button>
          {isClosable && (
            <Button variant="outlined" color="info" onClick={handleClose}>
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Location;

const MapModal = styled(Dialog)`
  min-width: 900px;
`;
