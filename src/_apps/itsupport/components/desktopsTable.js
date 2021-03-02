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

const DesktopsTable = React.memo(() => {
  const { addDrawerVisibilityState } = useContext(ItSupportContext);
  const [
    addDrawerVisibility,
    setAddDrawerVisibility,
  ] = addDrawerVisibilityState;
  const [genericLoader, setGenericLoader] = useState(false);
  const [data, setData] = useState([]);
  const [height, setHeight] = useState(null);
  const heightdiv = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const fetchData = () => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchDesktops.php`)
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
  }, ["desktops"]);
  return (
    <MaterialTable
      icons={tableIcons}
      title="Desktops"
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
          title: "SERVICE TAG",
          field: "ServiceTag",
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
          title: "OS",
          field: "OS",
        },
        {
          title: "SPECS",
          field: "Specs",
        },
        {
          title: "HOSTNAME",
          field: "Hostname",
          editable: "onUpdate",
        },
        {
          title: "COUNTRY",
          field: "Country",
        },
        {
          title: "USERNAME",
          field: "Username",
        },
      ]}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              newData.section = "desktops";
              newData.count = 1;
              newData.Hostname = "G" + newData.ServiceTag + "E";
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
              newData.section = "desktops";
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
              oldData.section = "desktops";
              DeleteItem(oldData);
              setData(dataDelete);
              resolve();
            }, 1000);
          }),
      }}
    ></MaterialTable>
  );
});
export default DesktopsTable;
