import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useValue } from "../../../context/ContextProvider";
import InfoField from "./InfoField";

const AddDetails = () => {
  const {
    state: {
      details: {
        title,
        description,
        price,
        location: { lng, lat },
      },
    },
    dispatch,
  } = useValue();
  const [costType, setCostType] = useState(price ? 1 : 0);
  const handleCostTypeChange = (e) => {
    const costType = Number(e.target.value);
    setCostType(costType);
    if (costType === 0) {
      dispatch({ type: "UPDATE_DETAILS", payload: { price: 0 } });
    } else {
      dispatch({ type: "UPDATE_DETAILS", payload: { price: 15 } });
    }
  };
  const handlePriceChange = (e) => {
    dispatch({ type: "UPDATE_DETAILS", payload: { price: e.target.value } });
  };
  const handleLngChange = (e) => {
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { location: { lng: e.target.value, lat } },
    });
  };
  const handleLatChange = (e) => {
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { location: { lng, lat: e.target.value } },
    });
  };
  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
      }}
    >
      <FormControl>
        <RadioGroup
          name="costType"
          value={costType}
          row
          onChange={handleCostTypeChange}
        >
          <FormControlLabel
            value={0}
            control={<Radio />}
            label="Free Charging"
          />
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="Charging Fee"
          />
          {Boolean(costType) && (
            <TextField
              sx={{ width: "7ch !important" }}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              inputProps={{ type: "number", min: 1, max: 50 }}
              value={price}
              onChange={handlePriceChange}
              name="price"
            />
          )}
        </RadioGroup>
      </FormControl>
      <InfoField
        mainProps={{ name: "title", label: "Title", value: title }}
        minLength={5}
      />
      <InfoField
        mainProps={{
          name: "description",
          label: "Description",
          value: description,
        }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
      <Stack direction={{ sm: "colume", md: "row" }} spacing={1}>
        <TextField
          // sx={{ width: "7ch !important" }}
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Longitude </InputAdornment>
            ),
          }}
          inputProps={{ type: "number", min: -180, max: 180 }}
          value={lng}
          onChange={handleLngChange}
          name="lng"
        />
        <TextField
          // sx={{ width: "7ch !important" }}
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Latitude </InputAdornment>
            ),
          }}
          inputProps={{ type: "number", min: -180, max: 180 }}
          value={lat}
          onChange={handleLatChange}
          name="lat"
        />
      </Stack>
    </Stack>
  );
};

export default AddDetails;
