import React, { useEffect, useContext } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
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
      <span style={{ fontSize: "1.1em", color: "gray", marginBottom: "1em" }}>
        Primary Info
      </span>
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <TextField
          value={inventoryFormData.brand ? inventoryFormData.brand : ""}
          size="small"
          label="Brand"
          variant="outlined"
          style={{ width: "100%", marginRight: "1em" }}
          select
          name="brand"
          onChange={(e) =>
            setInventoryFormData({
              ...inventoryFormData,
              [e.target.name]: e.target.value,
            })
          }
        >
          <MenuItem value="dell">DELL</MenuItem>
          <MenuItem value="hp">HP</MenuItem>
          <MenuItem value="lenovo">Lenovo</MenuItem>
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="microsoft">Microsoft</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          value={inventoryFormData.model ? inventoryFormData.model : ""}
          name="model"
          size="small"
          label="Model"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) =>
            setInventoryFormData({
              ...inventoryFormData,
              [e.target.name]: e.target.value,
            })
          }
        />
      </div>

      <TextField
        value={inventoryFormData.serviceTag ? inventoryFormData.serviceTag : ""}
        size="small"
        label="Service Tag"
        variant="outlined"
        name="serviceTag"
        style={{ width: "100%", marginBottom: "1em" }}
        multiline
        rowsMax={4}
        rows={1}
        onChange={(e) =>
          setInventoryFormData({
            ...inventoryFormData,
            [e.target.name]: e.target.value,
          })
        }
      />
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <TextField
          value={inventoryFormData.location ? inventoryFormData.location : ""}
          size="small"
          label="Location"
          variant="outlined"
          name="location"
          style={{ width: "100%", marginRight: "1em" }}
          onChange={(e) =>
            setInventoryFormData({
              ...inventoryFormData,
              [e.target.name]: e.target.value,
            })
          }
        />
        <TextField
          value={inventoryFormData.area ? inventoryFormData.area : ""}
          size="small"
          label="Area"
          name="area"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) =>
            setInventoryFormData({
              ...inventoryFormData,
              [e.target.name]: e.target.value,
            })
          }
        />
      </div>
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <TextField
          value={inventoryFormData.hostname ? inventoryFormData.hostname : ""}
          size="small"
          label="Hostname"
          variant="outlined"
          style={{ width: "100%", marginRight: "1em" }}
          name="hostname"
          onChange={(e) =>
            setInventoryFormData({
              ...inventoryFormData,
              [e.target.name]: e.target.value,
            })
          }
        />
        <TextField
          value={inventoryFormData.username ? inventoryFormData.username : ""}
          size="small"
          name="username"
          label="Username"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) =>
            setInventoryFormData({
              ...inventoryFormData,
              [e.target.name]: e.target.value,
            })
          }
        />
      </div>
      <span style={{ fontSize: "1.1em", color: "gray", marginBottom: "1em" }}>
        Specifications
      </span>
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <TextField
          value={inventoryFormData.os ? inventoryFormData.os : ""}
          name="os"
          size="small"
          label="OS"
          variant="outlined"
          style={{ width: "100%", marginRight: "1em" }}
          select
          onChange={(e) =>
            setInventoryFormData({
              ...inventoryFormData,
              [e.target.name]: e.target.value,
            })
          }
        >
          <MenuItem value="windows 10">Windows 10</MenuItem>
          <MenuItem value="windows 7">Windows 7</MenuItem>
          <MenuItem value="windows xp">Windows XP</MenuItem>
          <MenuItem value="linux/ubuntu">Linux / Ubuntu</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          value={inventoryFormData.country ? inventoryFormData.country : ""}
          name="country"
          size="small"
          label="Country"
          variant="outlined"
          style={{ width: "100%" }}
          select
          onChange={(e) =>
            setInventoryFormData({
              ...inventoryFormData,
              [e.target.name]: e.target.value,
            })
          }
        >
          <MenuItem value="united states">United States</MenuItem>
          <MenuItem value="mexico">Mexico</MenuItem>
        </TextField>
      </div>
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <TextField
          size="small"
          label="HDD"
          name="hdd"
          value={
            !inventoryFormData.specs
              ? ""
              : inventoryFormData.specs.hdd
              ? inventoryFormData.specs.hdd
              : ""
          }
          variant="outlined"
          style={{ width: "100%", marginRight: "1em" }}
          onChange={(e) => {
            let specs = { ...inventoryFormData.specs };
            setInventoryFormData({
              ...inventoryFormData,
              specs: { ...specs, [e.target.name]: e.target.value },
            });
          }}
        />
        <TextField
          size="small"
          label="RAM"
          name="ram"
          variant="outlined"
          style={{ width: "100%" }}
          value={
            !inventoryFormData.specs
              ? ""
              : inventoryFormData.specs.ram
              ? inventoryFormData.specs.ram
              : ""
          }
          onChange={(e) => {
            let specs = { ...inventoryFormData.specs };
            setInventoryFormData({
              ...inventoryFormData,
              specs: { ...specs, [e.target.name]: e.target.value },
            });
          }}
        />
      </div>
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <TextField
          size="small"
          label="Processor"
          name="processor"
          variant="outlined"
          style={{ width: "100%", marginRight: "1em" }}
          select
          value={
            !inventoryFormData.specs
              ? ""
              : inventoryFormData.specs.processor
              ? inventoryFormData.specs.processor
              : ""
          }
          onChange={(e) => {
            let specs = { ...inventoryFormData.specs };
            setInventoryFormData({
              ...inventoryFormData,
              specs: { ...specs, [e.target.name]: e.target.value },
            });
          }}
        >
          <MenuItem value="i7">i7</MenuItem>
          <MenuItem value="i5">i5</MenuItem>
          <MenuItem value="i3">i3</MenuItem>
          <MenuItem value="xeon">Xeon</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          size="small"
          label="Screen size"
          variant="outlined"
          name="screenSize"
          style={{ width: "100%" }}
          onChange={(e) => {
            let specs = { ...inventoryFormData.specs };
            setInventoryFormData({
              ...inventoryFormData,
              specs: { ...specs, [e.target.name]: e.target.value },
            });
          }}
        />
      </div>
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
  laser_printers: <AddLabelPrintersForm />,
  label_printers: <AddLaserPrintersForm />,
  reserved_ips: <AddReservedIpsForm />,
};
