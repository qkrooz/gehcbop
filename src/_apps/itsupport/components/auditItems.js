import React, { useState, useContext, useEffect } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import MaterialTable from "material-table";
import { tableIcons } from "../resources/tableIcons";
import { Select, FormLabel, FormControl, Input } from "@chakra-ui/react";
import axios from "axios";
import { USELPUTIL02 } from "../../../_resources/serverRoutes";

const AuditDesktops = React.memo(() => {
  // states
  const [genericLoader, setGenericLoader] = useState(false);
  const [data, setData] = useState([]);
  // context
  const { heightState, inventoryAuditDataState } = useContext(ItSupportContext);
  const [inventoryAuditData, setInventoryAuditData] = inventoryAuditDataState;

  const [height] = heightState;
  const fetchData = () => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchAuditDesktops.php`)
      .then((response) => {
        setData(response.data);
        setGenericLoader(false);
        response.data.forEach((data, i) => {
          inventoryAuditData[i].serialnumber = data.SERVICE_TAG;
        });
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
    setData([]);
    setGenericLoader(true);
  }, []);
  useEffect(() => {
    console.log(inventoryAuditData);
  }, [inventoryAuditData]);
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
          const index = rowData.tableData.id;
          const auditDataTemp = [...inventoryAuditData];
          return (
            <div
              style={{
                display: "flex",
                marginBottom: "1em",
                marginRight: "1em",
                marginLeft: "1em",
              }}
            >
              <FormControl width="50%">
                <FormLabel>Status</FormLabel>
                <Select
                  variant="flushed"
                  name="status"
                  defaultValue={inventoryAuditData[rowData.tableData.id].status}
                  onChange={(e) => {
                    auditDataTemp[index].status = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                >
                  <option value="good">Good</option>
                  <option value="bad">Bad</option>
                </Select>
              </FormControl>
              <FormControl id="comments">
                <FormLabel>Comments</FormLabel>
                <Input
                  variant="flushed"
                  name="comments"
                  defaultValue={
                    inventoryAuditData[rowData.tableData.id].comments
                  }
                  onChange={(e) => {
                    auditDataTemp[index].comments = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                ></Input>
              </FormControl>
            </div>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      ></MaterialTable>
    </div>
  );
});

const AuditLaptops = React.memo(() => {
  // states
  const [genericLoader, setGenericLoader] = useState(false);
  const [data, setData] = useState([]);
  // context
  const { heightState, inventoryAuditDataState } = useContext(ItSupportContext);
  const [inventoryAuditData, setInventoryAuditData] = inventoryAuditDataState;

  const [height] = heightState;
  const fetchData = () => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchAuditLaptops.php`)
      .then((response) => {
        setData(response.data);
        setGenericLoader(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
    setData([]);
    setGenericLoader(true);
  }, []);
  useEffect(() => {
    console.log(inventoryAuditData);
  }, [inventoryAuditData]);
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
            title: "DEPARTMENT",
            field: "DEPARTMENT",
          },
          {
            title: "SSO",
            field: "SSO",
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
          const index = rowData.tableData.id;
          const auditDataTemp = [...inventoryAuditData];
          return (
            <div
              style={{
                display: "flex",
                marginBottom: "1em",
                marginRight: "1em",
                marginLeft: "1em",
              }}
            >
              <FormControl width="50%">
                <FormLabel>Status</FormLabel>
                <Select
                  variant="flushed"
                  name="status"
                  defaultValue={inventoryAuditData[rowData.tableData.id].status}
                  onChange={(e) => {
                    auditDataTemp[index].status = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                >
                  <option value="good">Good</option>
                  <option value="bad">Bad</option>
                </Select>
              </FormControl>
              <FormControl id="comments">
                <FormLabel>Comments</FormLabel>
                <Input
                  variant="flushed"
                  name="comments"
                  defaultValue={
                    inventoryAuditData[rowData.tableData.id].comments
                  }
                  onChange={(e) => {
                    auditDataTemp[index].comments = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                ></Input>
              </FormControl>
            </div>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      ></MaterialTable>
    </div>
  );
});

const AuditMobiles = React.memo(() => {
  // states
  const [genericLoader, setGenericLoader] = useState(false);
  const [data, setData] = useState([]);
  // context
  const { heightState, inventoryAuditDataState } = useContext(ItSupportContext);
  const [inventoryAuditData, setInventoryAuditData] = inventoryAuditDataState;

  const [height] = heightState;
  const fetchData = () => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchAuditMobiles.php`)
      .then((response) => {
        setData(response.data);
        setGenericLoader(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
    setData([]);
    setGenericLoader(true);
  }, []);
  useEffect(() => {
    console.log(inventoryAuditData);
  }, [inventoryAuditData]);
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
            title: "IMEI",
            field: "IMEI",
          },
          {
            title: "DEPARTMENT",
            field: "DEPARTMENT",
          },
          {
            title: "SSO",
            field: "SSO",
          },
          {
            title: "USERNAME",
            field: "USERNAME",
          },
        ]}
        data={data}
        detailPanel={(rowData) => {
          const index = rowData.tableData.id;
          const auditDataTemp = [...inventoryAuditData];
          return (
            <div
              style={{
                display: "flex",
                marginBottom: "1em",
                marginRight: "1em",
                marginLeft: "1em",
              }}
            >
              <FormControl width="50%">
                <FormLabel>Status</FormLabel>
                <Select
                  variant="flushed"
                  name="status"
                  defaultValue={inventoryAuditData[rowData.tableData.id].status}
                  onChange={(e) => {
                    auditDataTemp[index].status = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                >
                  <option value="good">Good</option>
                  <option value="bad">Bad</option>
                </Select>
              </FormControl>
              <FormControl id="comments">
                <FormLabel>Comments</FormLabel>
                <Input
                  variant="flushed"
                  name="comments"
                  defaultValue={
                    inventoryAuditData[rowData.tableData.id].comments
                  }
                  onChange={(e) => {
                    auditDataTemp[index].comments = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                ></Input>
              </FormControl>
            </div>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      ></MaterialTable>
    </div>
  );
});

const AuditLaserPrinters = React.memo(() => {
  // states
  const [genericLoader, setGenericLoader] = useState(false);
  const [data, setData] = useState([]);
  // context
  const { heightState, inventoryAuditDataState } = useContext(ItSupportContext);
  const [inventoryAuditData, setInventoryAuditData] = inventoryAuditDataState;

  const [height] = heightState;
  const fetchData = () => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchAuditLaserPrinters.php`)
      .then((response) => {
        setData(response.data);
        setGenericLoader(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
    setData([]);
    setGenericLoader(true);
  }, []);
  useEffect(() => {
    console.log(inventoryAuditData);
  }, [inventoryAuditData]);
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
            title: "SERIAL NUMBER",
            field: "SERIAL_NUMBER",
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
            title: "DAHILL TAG",
            field: "DAHILL_TAG",
          },
        ]}
        data={data}
        detailPanel={(rowData) => {
          const index = rowData.tableData.id;
          const auditDataTemp = [...inventoryAuditData];
          return (
            <div
              style={{
                display: "flex",
                marginBottom: "1em",
                marginRight: "1em",
                marginLeft: "1em",
              }}
            >
              <FormControl width="50%">
                <FormLabel>Status</FormLabel>
                <Select
                  variant="flushed"
                  name="status"
                  defaultValue={inventoryAuditData[rowData.tableData.id].status}
                  onChange={(e) => {
                    auditDataTemp[index].status = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                >
                  <option value="good">Good</option>
                  <option value="bad">Bad</option>
                </Select>
              </FormControl>
              <FormControl id="comments">
                <FormLabel>Comments</FormLabel>
                <Input
                  variant="flushed"
                  name="comments"
                  defaultValue={
                    inventoryAuditData[rowData.tableData.id].comments
                  }
                  onChange={(e) => {
                    auditDataTemp[index].comments = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                ></Input>
              </FormControl>
            </div>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      ></MaterialTable>
    </div>
  );
});

const AuditLabelPrinters = React.memo(() => {
  // states
  const [genericLoader, setGenericLoader] = useState(false);
  const [data, setData] = useState([]);
  // context
  const { heightState, inventoryAuditDataState } = useContext(ItSupportContext);
  const [inventoryAuditData, setInventoryAuditData] = inventoryAuditDataState;

  const [height] = heightState;
  const fetchData = () => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchAuditLabelPrinters.php`)
      .then((response) => {
        setData(response.data);
        setGenericLoader(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
    setData([]);
    setGenericLoader(true);
  }, []);
  useEffect(() => {
    console.log(inventoryAuditData);
  }, [inventoryAuditData]);
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
            title: "SERIAL NUMBER",
            field: "SERIAL_NUMBER",
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
            title: "BARTENDER NAME",
            field: "BARTENDER_NAME",
          },
          {
            title: "TAG",
            field: "TAG",
          },
        ]}
        data={data}
        detailPanel={(rowData) => {
          const index = rowData.tableData.id;
          const auditDataTemp = [...inventoryAuditData];
          return (
            <div
              style={{
                display: "flex",
                marginBottom: "1em",
                marginRight: "1em",
                marginLeft: "1em",
              }}
            >
              <FormControl width="50%">
                <FormLabel>Status</FormLabel>
                <Select
                  variant="flushed"
                  name="status"
                  defaultValue={inventoryAuditData[rowData.tableData.id].status}
                  onChange={(e) => {
                    auditDataTemp[index].status = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                >
                  <option value="good">Good</option>
                  <option value="bad">Bad</option>
                </Select>
              </FormControl>
              <FormControl id="comments">
                <FormLabel>Comments</FormLabel>
                <Input
                  variant="flushed"
                  name="comments"
                  defaultValue={
                    inventoryAuditData[rowData.tableData.id].comments
                  }
                  onChange={(e) => {
                    auditDataTemp[index].comments = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                ></Input>
              </FormControl>
            </div>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      ></MaterialTable>
    </div>
  );
});

const AuditReservedIps = React.memo(() => {
  // states
  const [genericLoader, setGenericLoader] = useState(false);
  const [data, setData] = useState([]);
  // context
  const { heightState, inventoryAuditDataState } = useContext(ItSupportContext);
  const [inventoryAuditData, setInventoryAuditData] = inventoryAuditDataState;

  const [height] = heightState;
  const fetchData = () => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchAuditReservedIps.php`)
      .then((response) => {
        setData(response.data);
        setGenericLoader(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
    setData([]);
    setGenericLoader(true);
  }, []);
  useEffect(() => {
    console.log(inventoryAuditData);
  }, [inventoryAuditData]);
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
            title: "IP ADDRESS",
            field: "IP_ADDRESS",
          },
          {
            title: "DEVICE",
            field: "DEVICE",
          },
          {
            title: "LOCATION",
            field: "LOCATION",
          },
          {
            title: "LOCATION",
            field: "LOCATION",
          },
          {
            title: "AREA",
            field: "AREA",
          },
        ]}
        data={data}
        detailPanel={(rowData) => {
          const index = rowData.tableData.id;
          const auditDataTemp = [...inventoryAuditData];
          return (
            <div
              style={{
                display: "flex",
                marginBottom: "1em",
                marginRight: "1em",
                marginLeft: "1em",
              }}
            >
              <FormControl width="50%">
                <FormLabel>Status</FormLabel>
                <Select
                  variant="flushed"
                  name="status"
                  defaultValue={inventoryAuditData[rowData.tableData.id].status}
                  onChange={(e) => {
                    auditDataTemp[index].status = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                >
                  <option value="good">Good</option>
                  <option value="bad">Bad</option>
                </Select>
              </FormControl>
              <FormControl id="comments">
                <FormLabel>Comments</FormLabel>
                <Input
                  variant="flushed"
                  name="comments"
                  defaultValue={
                    inventoryAuditData[rowData.tableData.id].comments
                  }
                  onChange={(e) => {
                    auditDataTemp[index].comments = e.target.value;
                    setInventoryAuditData(auditDataTemp);
                  }}
                ></Input>
              </FormControl>
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
  laptops: <AuditLaptops />,
  mobiles: <AuditMobiles />,
  laser_printers: <AuditLaserPrinters />,
  label_printers: <AuditLabelPrinters />,
  reserved_ips: <AuditReservedIps />,
};
