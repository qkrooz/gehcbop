import React, { useState, useContext, useEffect } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import MaterialTable from "material-table";
import { tableIcons } from "../resources/tableIcons";
import { PictureAsPdf } from "@material-ui/icons";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";
import { USELPUTIL02 } from "../../../_resources/serverRoutes";
export const MobilesTable = React.memo(() => {
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
      .post(`${USELPUTIL02}/itsupport/fetchMobiles.php`)
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
  const PrintPDF = (values) => {
    if (values.section === "laptop") {
      axios
        .post(`${USELPUTIL02}/itsupport/pdf/pdf_laptop.php`, values, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/pdf",
          },
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${values.SSO}-${values.section}.pdf`); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${USELPUTIL02}/itsupport/pdf/pdf_mobile.php`, values, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/pdf",
          },
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${values.SSO}-${values.section}.pdf`); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => console.log(error));
    }
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
      title="Mobiles"
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
          icon: PictureAsPdf,
          tooltip: "Print PDF",
          onClick: (event, dataRow) => {
            dataRow.section = "mobile";
            PrintPDF(dataRow);
          },
        },
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
          title: "IMEI",
          field: "IMEI",
        },
        {
          title: "SSO",
          field: "SSO",
        },
        {
          title: "USERNAME",
          field: "USERNAME",
        },
        {
          title: "DEPARTMENT",
          field: "DEPARTMENT",
        },
        {
          title: "COLOR",
          field: "COLOR",
        },
        {
          title: "SPECS",
          field: "SPECS",
        },
        {
          title: "TEL NUMBER",
          field: "TEL_NUMBER",
        },
      ]}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              newData.section = "mobiles";
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
              newData.section = "mobiles";
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
              oldData.section = "mobiles";
              DeleteItem(oldData);
              setData(dataDelete);

              resolve();
            }, 1000);
          }),
      }}
    ></MaterialTable>
  );
});
export default MobilesTable;
