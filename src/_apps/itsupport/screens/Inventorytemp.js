import React, { useState, useEffect, useContext, useCallback } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import { Context } from "../../../_context/MainContext";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "../styles/inventory.css";
import "../styles/addForm.css";
import useLocalStorage from "../../../_resources/useLocalStorage";
import axios from "axios";
import { tableIcons } from "../resources/tableIcons";
import MaterialTable from "material-table";
import MoreVert from "@material-ui/icons/MoreVert";
import MaterialButton from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Form, Input, Space } from "antd";
import {
  EditOutlined,
  FileTextOutlined,
  DeleteOutlined,
  ExclamationCircleTwoTone,
  EllipsisOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { CircularProgress } from "@material-ui/core";

const { TextArea } = Input;

const Inventory = React.memo(() => {
  const {
    addDialogVisibilityState,
    desktopsState,
    laptopsState,
    mobilesState,
    labelPrintersState,
    laserPrintersState,
    reservedIpsState,
  } = useContext(ItSupportContext);
  const { BASE_URL, currentApplicationState } = useContext(Context);
  const [desktops] = desktopsState;
  const [laptops] = laptopsState;
  const [mobiles] = mobilesState;
  const [labelPrinters] = labelPrintersState;
  const [laserPrinters] = laserPrintersState;
  const [reservedIps] = reservedIpsState;
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [height, setHeight] = useState(null);
  const heightdiv = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  const [ic_inventory_section, set_ic_inventory_section] = useLocalStorage(
    "ic_inventory_section",
    "desktops"
  );
  const desktopsColumns = [
    {
      title: "BRAND",
      field: "BRAND",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "MODEL",
      field: "MODEL",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "SERVICE TAG",
      field: "SERVICE_TAG",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "LOCATION",
      field: "LOCATION",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "AREA",
      field: "AREA",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "OS",
      field: "OS",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "SPECS",
      field: "SPECS",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "HOSTNAME",
      field: "HOSTNAME",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "COUNTRY",
      field: "COUNTRY",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "USERNAME",
      field: "USERNAME",
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const laptopsColumns = [
    {
      title: "BRAND",
      field: "BRAND",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "MODEL",
      field: "MODEL",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "SERVICE TAG",
      field: "SERVICE_TAG",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "SSO",
      field: "SSO",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "USERNAME",
      field: "USERNAME",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "OS",
      field: "OS",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "SPECS",
      field: "SPECS",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "HOSTNAME",
      field: "HOSTNAME",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "COUNTRY",
      field: "COUNTRY",
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const mobilesColumns = [
    {
      title: "BRAND",
      field: "BRAND",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "MODEL",
      field: "MODEL",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "IMEI",
      field: "IMEI",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "SSO",
      field: "SSO",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "USERNAME",
      field: "USERNAME",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "DEPARTMENT",
      field: "DEPARTMENT",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "COLOR",
      field: "COLOR",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "SPECS",
      field: "SPECS",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "TEL NUMBER",
      field: "TEL_NUMBER",
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const labelPrintersColumns = [
    {
      title: "BRAND",
      field: "BRAND",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "MODEL",
      field: "MODEL",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "SERIAL NUMBER",
      field: "SERIAL_NUMBER",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "LOCATION",
      field: "LOCATION",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "AREA",
      field: "AREA",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "TAG",
      field: "TAG",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "BARTENDER NAME",
      field: "BARTENDER_NAME",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "IP ADDRESS",
      field: "IP_ADDRESS",
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const laserPrintersColumns = [
    {
      title: "BRAND",
      field: "BRAND",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "MODEL",
      field: "MODEL",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "SERIAL NUMBER",
      field: "SERIAL_NUMBER",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "LOCATION",
      field: "LOCATION",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "AREA",
      field: "AREA",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "DAHILL TAG",
      field: "DAHILL_TAG",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "NET NAME",
      field: "NET_NAME",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "IP ADDRESS",
      field: "IP_ADDRESS",
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const reserverdIpsColumns = [
    {
      title: "IP ADDRESS",
      field: "IP_ADDRESS",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "DEVICE",
      field: "DEVICE",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "LOCATION",
      field: "LOCATION",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "AREA",
      field: "AREA",
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  useEffect(() => {
    if (
      desktops.length !== 0 &&
      laptops !== 0 &&
      mobiles !== 0 &&
      labelPrinters !== 0 &&
      laserPrinters !== 0 &&
      reservedIps !== 0
    ) {
      switch (ic_inventory_section) {
        case "desktops":
          setTableColumns(desktopsColumns);
          setTableData(desktops);
          break;
        case "laptops":
          setTableColumns(laptopsColumns);
          setTableData(laptops);
          break;
        case "mobiles":
          setTableColumns(mobilesColumns);
          setTableData(mobiles);
          break;
        case "labelPrinters":
          setTableColumns(labelPrintersColumns);
          setTableData(labelPrinters);
          break;
        case "laserPrinters":
          setTableColumns(laserPrintersColumns);
          setTableData(laserPrinters);
          break;
        case "reserverdIps":
          setTableColumns(reserverdIpsColumns);
          setTableData(reservedIps);
          break;
        default:
          break;
      }
    }
  }, [ic_inventory_section]);
  return (
    <div className="inventoryMainContainer">
      <div className="dataNavigatorContainer">
        <ButtonGroup
          disableElevation
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            className={
              ic_inventory_section === "desktops" ? "button-active" : null
            }
            onClick={() => {
              set_ic_inventory_section("desktops");
            }}
          >
            Desktops
          </Button>
          <Button
            className={
              ic_inventory_section === "laptops" ? "button-active" : null
            }
            onClick={() => {
              set_ic_inventory_section("laptops");
            }}
          >
            Laptops
          </Button>
          <Button
            className={
              ic_inventory_section === "mobiles" ? "button-active" : null
            }
            onClick={() => {
              set_ic_inventory_section("mobiles");
            }}
          >
            Mobiles
          </Button>
          <Button
            className={
              ic_inventory_section === "labelPrinters" ? "button-active" : null
            }
            onClick={() => {
              set_ic_inventory_section("labelPrinters");
            }}
          >
            Label Printers
          </Button>
          <Button
            className={
              ic_inventory_section === "laserPrinters" ? "button-active" : null
            }
            onClick={() => {
              set_ic_inventory_section("laserPrinters");
            }}
          >
            Laser Printers
          </Button>
          <Button
            className={
              ic_inventory_section === "reservedIps" ? "button-active" : null
            }
            onClick={() => {
              set_ic_inventory_section("reservedIps");
            }}
          >
            Reserved IP's
          </Button>
        </ButtonGroup>
      </div>
      <div className="tableContainer" ref={heightdiv}>
        <MaterialTable
          icons={tableIcons}
          title={
            ic_inventory_section.charAt(0).toUpperCase() +
            ic_inventory_section.slice(1)
          }
          options={{
            actionsColumnIndex: -1,
            padding: "dense",
            toolbar: true,
            search: true,
            headerStyle: { position: "sticky", top: 0 },
            pageSizeOptions: [15, 50, 100, tableData.length],
            pageSize: 15,
            minBodyHeight: height - 135,
            maxBodyHeight: height - 135,
          }}
          columns={tableColumns}
          data={tableData}
        ></MaterialTable>
      </div>
    </div>
  );
});
export default Inventory;
