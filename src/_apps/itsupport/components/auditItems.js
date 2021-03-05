import React, { useState, useContext, useEffect } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import MaterialTable from "material-table";
import { tableIcons } from "../resources/tableIcons";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { USELPUTIL02 } from "../../../_resources/serverRoutes";

const AuditDesktops = React.memo(() => {
  // states
  const [genericLoader, setGenericLoader] = useState(false);
  const [data, setData] = useState([]);
  // context
  const { heightState } = useContext(ItSupportContext);
  const [height] = heightState;
  const section = "desktops";
  const fetchData = (values) => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchAuditDesktops.php`, values)
      .then((response) => {
        setData(response.data);
        setGenericLoader(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData(section);
    setData([]);
    setGenericLoader(true);
  }, []);
  return (
    <div>
      <MaterialTable
        isLoading={genericLoader}
        icons={tableIcons}
        title=""
        options={{
          actionsColumnIndex: -1,
          padding: "dense",
          pageSizeOptions: [data.length],
          pageSize: 10,
          minBodyHeight: height - 145,
          maxBodyHeight: height - 145,
          exportButton: true,
          search: false,
        }}
        style={{
          textTransform: "uppercase",
        }}
        localization={{
          header: { actions: "" },
        }}
        columns={[
          {
            title: "BRAND",
            field: "BRAND",
          },
          {
            title: "MODEL",
            field: "MODEL",
          },
          {
            title: "SERVICE TAG",
            field: "SERVICE_TAG",
          },
          {
            title: "LOCATION",
            field: "LOCATION",
          },
          {
            title: "AREA",
            field: "AREA",
          },
          {
            title: "HOSTNAME",
            field: "HOSTNAME",
          },
          {
            title: "USERNAME",
            field: "USERNAME",
          },
        ]}
        data={data}
        detailPanel={(rowData) => {
          return (
            <div style={{ display: "flex", marginBottom: "1em" }}>
              <TextField
                size="small"
                label="Status"
                variant="outlined"
                style={{ width: "30%", marginRight: "1em" }}
                select
                name="status"
              >
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="bad">Bad</MenuItem>
              </TextField>
              <TextField
                name="comments"
                size="small"
                label="Comments"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </div>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      ></MaterialTable>
    </div>
  );
});
export const indexAudit = {
  desktops: <AuditDesktops />,
  // laptops: <AddLaptopsForm />,
  // mobiles: <AddMobilesForm />,
  // laserPrinters: <AddLabelPrintersForm />,
  // labelPrinters: <AddLaserPrintersForm />,
  // reservedIps: <AddReservedIpsForm />,
};
