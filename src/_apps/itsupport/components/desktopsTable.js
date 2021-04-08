import React, { useState, useContext, useEffect } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import MaterialTable from "material-table";
import { tableIcons } from "../resources/tableIcons";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Grid, GridItem, Text, IconButton } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { USELPUTIL02 } from "../../../_resources/serverRoutes";
const DesktopsTable = React.memo(() => {
  // states
  const [genericLoader, setGenericLoader] = useState(false);
  const [data, setData] = useState([]);
  // context
  const {
    addDrawerVisibilityState,
    heightState,
    auditModalVisibilityState,
    inventoryAuditDataState,
    commentsDrawerVisibilityState,
    inventoryCommentsDataState,
  } = useContext(ItSupportContext);

  const [inventoryAuditData, setInventoryAuditData] = inventoryAuditDataState;
  const [height] = heightState;
  const [, setAddDrawerVisibility] = addDrawerVisibilityState;
  const [, setAuditModalVisibility] = auditModalVisibilityState;
  const [, setCommentsDrawerVisibility] = commentsDrawerVisibilityState;
  const [
    inventoryCommentsData,
    setInventoryCommentsData,
  ] = inventoryCommentsDataState;
  // functions
  let jsonSpecs = [];
  function isJSON(item) {
    item = typeof item !== "string" ? JSON.stringify(item) : item;

    try {
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }

    if (typeof item === "object" && item !== null) {
      return true;
    }

    return false;
  }
  const fetchData = () => {
    axios
      .post(`${USELPUTIL02}/itsupport/fetchDesktops.php`)
      .then((response) => {
        response.data.forEach((data, i) => {
          jsonSpecs[i] = data.SPECS;
          let specs = isJSON(data.SPECS);
          if (specs == true) {
            data.SPECS =
              JSON.parse(data.SPECS).hdd +
              "/" +
              JSON.parse(data.SPECS).ram +
              "/" +
              JSON.parse(data.SPECS).processor;
          }
        });
        console.log(jsonSpecs);
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
          onClick: () => {
            setAuditModalVisibility(true);
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
          title: "OS",
          field: "OS",
        },
        {
          title: "SPECS",
          field: "SPECS",
          editPlaceholder: "HDD/RAM/PROCESSOR",
        },
        {
          title: "HOSTNAME",
          field: "HOSTNAME",
          editable: "onUpdate",
        },
        {
          title: "COUNTRY",
          field: "COUNTRY",
        },
        {
          title: "USERNAME",
          field: "USERNAME",
        },
      ]}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              newData.section = "desktops";
              newData.count = 1;
              newData.HOSTNAME = "G" + newData.SERVICE_TAG + "E";
              var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
              newData.ADDED = date;
              newData.AUDITED = `{"status":"", "comments":""}`;
              let specsSplit = newData.SPECS.replace(/\s/g, "")
                .replace(/-|\\|\|/g, "/")
                .split(`/`);
              console.log(specsSplit);
              newData.SPECS = `{"hdd":"${specsSplit[0]}", "ram":"${specsSplit[1]}", "processor":"${specsSplit[2]}", "screenSize":""}`;
              console.log(newData.SPECS);
              AddItem(newData);

              newData.SPECS = `${specsSplit[0]}/${specsSplit[1]}/${specsSplit[2]}`;
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
              var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
              let specsSplit = newData.SPECS.replace(/\s/g, "")
                .replace(/-|\\|\|/g, "/")
                .split(`/`);
              console.log(specsSplit);
              newData.SPECS = `{"hdd":"${specsSplit[0]}", "ram":"${specsSplit[1]}", "processor":"${specsSplit[2]}", "screenSize":""}`;
              newData.LAST_MODIFICATION = date;
              console.log(newData);
              EditItem(newData);
              dataUpdate[index] = newData;
              newData.SPECS = `${specsSplit[0]}/${specsSplit[1]}/${specsSplit[2]}`;
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
      detailPanel={(rowData) => {
        return (
          <Grid
            h="90px"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={0}
          >
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                Date Added:
              </Text>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                {rowData.ADDED}
              </Text>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                Comments:
              </Text>
            </GridItem>
            <GridItem colSpan={3} border="1px" borderColor="lightgray">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  width="100%"
                  height="80%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="sm"
                >
                  {rowData.COMMENTS}
                </Text>
                <IconButton
                  size="sm"
                  icon={<EditIcon />}
                  onClick={() => {
                    setCommentsDrawerVisibility(true);
                    setInventoryCommentsData({
                      comment: rowData.COMMENTS,
                      serialnumber: rowData.SERVICE_TAG,
                    });
                    console.log(inventoryCommentsData);
                  }}
                />
              </div>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                Date Modified:
              </Text>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                {rowData.LAST_MODIFICATION}
              </Text>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                Audit Results:
              </Text>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                {JSON.parse(rowData.AUDITED).status}
              </Text>
            </GridItem>
            <GridItem colSpan={2} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                {JSON.parse(rowData.AUDITED).comments}
              </Text>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                HDD:
              </Text>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                {rowData.SPECS.split("/")[0]}
              </Text>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                RAM:
              </Text>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                {rowData.SPECS.split("/")[1]}
              </Text>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                PROCESSOR:
              </Text>
            </GridItem>
            <GridItem colSpan={1} border="1px" borderColor="lightgray">
              <Text
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="sm"
              >
                {rowData.SPECS.split("/")[2]}
              </Text>
            </GridItem>
          </Grid>
        );
      }}
    ></MaterialTable>
  );
});
export default DesktopsTable;
