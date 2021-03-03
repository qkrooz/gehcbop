import React, { useState, useContext, useEffect } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import MaterialTable from "material-table";
import { tableIcons } from "../resources/tableIcons";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";
import { USELPUTIL02 } from "../../../_resources/serverRoutes";
const LaserPrintersTable = React.memo(() => {
  // states
  const [genericLoader, setGenericLoader] = useState(false);
  const [data, setData] = useState([]);
  // context
  const { addDrawerVisibilityState, heightState } = useContext(
    ItSupportContext
  );
  const [, setAddDrawerVisibility] = addDrawerVisibilityState;
  const [height] = heightState;
  // functions
  const fetchData = () => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchLaserPrinters.php`)
      .then((response) => {
        setData(response.data);
        setGenericLoader(false);
      })
      .catch((error) => console.log(error));
  };
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
  // states
  useEffect(() => {
    fetchData();
    setData([]);
    setGenericLoader(true);
    // eslint-disable-next-line
  }, []);
  return (
    <MaterialTable
      isLoading={genericLoader}
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
          title: "DAHILL TAG",
          field: "DAHILL_TAG",
        },
        {
          title: "HOSTNAME",
          field: "HOSTNAME",
        },
        {
          title: "IP ADDRESS",
          field: "IP_ADDRESS",
        },
      ]}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              newData.section = "laser_printers";
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
              newData.section = "laser_printers";
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
              oldData.section = "laser_printers";
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
