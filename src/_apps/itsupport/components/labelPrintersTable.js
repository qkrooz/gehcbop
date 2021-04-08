import React, { useState, useContext, useEffect } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import MaterialTable from "material-table";
import { tableIcons } from "../resources/tableIcons";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";
import { USELPUTIL02 } from "../../../_resources/serverRoutes";
const LabelPrintersTable = React.memo(() => {
  // states
  const [genericLoader, setGenericLoader] = useState(false);
  const [data, setData] = useState([]);
  // context
  const {
    addDrawerVisibilityState,
    heightState,
    auditModalVisibilityState,
    inventoryAuditDataState,
  } = useContext(ItSupportContext);
  const [inventoryAuditData, setInventoryAuditData] = inventoryAuditDataState;
  const [, setAddDrawerVisibility] = addDrawerVisibilityState;
  const [height] = heightState;
  const [, setAuditModalVisibility] = auditModalVisibilityState;
  // functions
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
  const fetchData = () => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchLabelPrinters.php`)
      .then((response) => {
        setData(response.data);
        setGenericLoader(false);
      })
      .catch((error) => console.log(error));
  };
  // effects
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
      title="Label Printers"
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
          onClick: () => {
            setAuditModalVisibility(true);
            console.log(inventoryAuditData);
          },
        },
      ]}
      columns={[
        {
          title: "ID",
          field: "ID",
        },
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
          title: "TAG",
          field: "TAG",
        },
        {
          title: "BARTENDER NAME",
          field: "BARTENDER_NAME",
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
              newData.section = "label_printers";
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
              newData.section = "label_printers";
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
              oldData.section = "label_printers";
              DeleteItem(oldData);
              setData(dataDelete);
              resolve();
            }, 1000);
          }),
      }}
    ></MaterialTable>
  );
});
export default LabelPrintersTable;
