import React, { useState, useContext, useCallback, useEffect } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import MaterialTable from "material-table";
import { tableIcons } from "../resources/tableIcons";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";
const SERVER_IP2 = "http://USELPUTIL02";
const API_ROUTE2 = "/webServices";
const USELPUTIL02 = SERVER_IP2 + API_ROUTE2;
const AddItem = (values) => {
  axios
    .post(`${USELPUTIL02}/itsupport/addItem.php`, values)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};
const EditItem = (values) => {
  axios
    .post(`${USELPUTIL02}/itsupport/editItem.php`, values)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};
const DeleteItem = (values) => {
  axios
    .post(`${USELPUTIL02}/itsupport/deleteItem.php`, values)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

const LaserPrintersTable = React.memo(() => {
  const { addDrawerVisibilityState } = useContext(ItSupportContext);
  const [
    addDrawerVisibility,
    setAddDrawerVisibility,
  ] = addDrawerVisibilityState;
  const [genericLoader, setGenericLoader] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [data, setData] = useState([]);
  const [height, setHeight] = useState(null);
  const heightdiv = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  const SERVER_IP2 = "http://USELPUTIL02";
  const API_ROUTE2 = "/webServices";
  const USELPUTIL02 = SERVER_IP2 + API_ROUTE2;
  const fetchData = () => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchLaserPrinters.php`)
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
  }, ["laserPrinters"]);
  return (
    <MaterialTable
      icons={tableIcons}
      title="Laser Printers"
      options={{
        actionsColumnIndex: -1,
        padding: "dense",
        toolbar: true,
        search: true,
        headerStyle: { position: "sticky", top: 0 },
        pageSizeOptions: [20, 50, 100, data.length],
        pageSize: 20,
        minBodyHeight: height - 145,
        maxBodyHeight: height - 145,
        exportButton: true,
        addRowPosition: "first",
      }}
      style={{
        textTransform: "uppercase",
      }}
      localization={{
        header: { actions: "" },
      }}
      actions={[
        {
          icon: LibraryAddIcon,
          tooltip: "Add Multiple",
          isFreeAction: "true",
          onClick: () => {
            setAddDrawerVisibility(true);
          },
        },
        {
          icon: VisibilityIcon,
          tooltip: "Audit",
          isFreeAction: "true",
        },
      ]}
      columns={[
        {
          title: "BRAND",
          field: "Brand",
        },
        {
          title: "MODEL",
          field: "Model",
        },
        {
          title: "SERIAL NUMBER",
          field: "SerialNumber",
        },
        {
          title: "LOCATION",
          field: "Location",
        },
        {
          title: "AREA",
          field: "Area",
        },
        {
          title: "DAHILL TAG",
          field: "DahillTag",
        },
        {
          title: "HOSTNAME",
          field: "Hostname",
        },
        {
          title: "IP ADDRESS",
          field: "IPAddress",
        },
      ]}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              newData.section = "laserPrinters";
              newData.count = 1;
              AddItem(newData);
              setData([newData, ...data]);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              newData.section = "laserPrinters";
              dataUpdate[index] = newData;
              console.log(newData);
              EditItem(newData);
              setData(dataUpdate);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              oldData.section = "laserPrinters";
              DeleteItem(oldData);
              setData(dataDelete);

              resolve();
            }, 1000);
          }),
      }}
    ></MaterialTable>
  );
});
export default LaserPrintersTable;
