import React, { useState, useEffect, useContext } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Checkbox } from "@material-ui/core";
const AddDesktopsForm = React.memo(() => {
  const { inventoryFormDataState } = useContext(ItSupportContext);
  const [inventoryFormData, setInventoryFormData] = inventoryFormDataState;
  useEffect(() => {
    console.log(inventoryFormData);
  }, [inventoryFormData]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <TextField
          size="small"
          label="Brand"
          variant="outlined"
          style={{ width: "100%", marginRight: "1em" }}
          select
          name="brand"
          onChange={(e) => console.log(e.target.name)}
        >
          <MenuItem value="dell">DELL</MenuItem>
          <MenuItem value="hp">HP</MenuItem>
          <MenuItem value="lenovo">Lenovo</MenuItem>
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="microsoft">Microsoft</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          size="small"
          label="Model"
          variant="outlined"
          style={{ width: "100%" }}
        />
      </div>

      <TextField
        size="small"
        label="Service Tag"
        variant="outlined"
        style={{ width: "100%", marginBottom: "1em" }}
        multiline
        rowsMax={6}
        rows={4}
      />
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <TextField
          size="small"
          label="Location"
          variant="outlined"
          style={{ width: "100%", marginRight: "1em" }}
        />
        <TextField
          size="small"
          label="Area"
          variant="outlined"
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <TextField
          size="small"
          label="OS"
          variant="outlined"
          style={{ width: "100%", marginRight: "1em" }}
          select
        >
          <MenuItem value="windows 10">Windows 10</MenuItem>
          <MenuItem value="windows 7">Windows 7</MenuItem>
          <MenuItem value="windows xp">Windows XP</MenuItem>
          <MenuItem value="linux/ubuntu">Linux / Ubuntu</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          size="small"
          label="Specs"
          variant="outlined"
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <TextField
          size="small"
          label="Hostname"
          variant="outlined"
          style={{ width: "100%", marginRight: "1em" }}
        >
          <Checkbox />
        </TextField>
        <TextField
          size="small"
          label="Username"
          variant="outlined"
          style={{ width: "100%" }}
        />
      </div>
      <TextField
        size="small"
        label="Country"
        variant="outlined"
        style={{ width: "100%" }}
        select
      >
        <MenuItem value="united states">United States</MenuItem>
        <MenuItem value="mexico">Mexico</MenuItem>
      </TextField>
    </div>
  );
});
const AddLaptopsForm = React.memo(() => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <TextField
        size="small"
        label="Brand"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Model"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Service Tag"
        variant="outlined"
        style={{ width: "100%" }}
        multiline
        rowsMax={6}
      />
      <TextField
        size="small"
        label="SSO"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Username"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Department"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="OS"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Specs"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Hostname"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Country"
        variant="outlined"
        style={{ width: "100%" }}
      />
    </div>
  );
});
const AddMobilesForm = React.memo(() => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <TextField
        size="small"
        label="Brand"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Model"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="IMEI"
        variant="outlined"
        style={{ width: "100%" }}
        multiline
        rowsMax={6}
      />
      <TextField
        size="small"
        label="SSO"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Username"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Department"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="OS"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Specs"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Color"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Specs"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Tel Number"
        variant="outlined"
        style={{ width: "100%" }}
      />
    </div>
  );
});
const AddLabelPrintersForm = React.memo(() => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <TextField
        size="small"
        label="Brand"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Model"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="IMEI"
        variant="outlined"
        style={{ width: "100%" }}
        multiline
        rowsMax={6}
      />
      <TextField
        size="small"
        label="SSO"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Username"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Department"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="OS"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Specs"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Color"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Specs"
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        size="small"
        label="Tel Number"
        variant="outlined"
        style={{ width: "100%" }}
      />
    </div>
  );
});
const AddLaserPrintersForm = React.memo(() => {
  return <>addLaserPrintersForm</>;
});
const AddReservedIpsForm = React.memo(() => {
  return <>addReservedIpsForm</>;
});

export const index = {
  desktops: <AddDesktopsForm />,
  laptops: <AddLaptopsForm />,
  mobiles: <AddMobilesForm />,
  laserPrinters: <AddLabelPrintersForm />,
  labelPrinters: <AddLaserPrintersForm />,
  reservedIps: <AddReservedIpsForm />,
};
