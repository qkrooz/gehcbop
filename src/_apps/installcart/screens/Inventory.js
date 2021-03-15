import React, { useContext, useCallback, useState, useEffect } from "react";
import { Menu, Dropdown } from "antd";
import { InstallCartContext } from "../resources/InstallCartContext";
import useLocalStorage from "../../../_resources/useLocalStorage";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "../styles/inventory.css";
import { tableIcons } from "../../itsupport/resources/tableIcons";
import moment from "moment";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Chip from "@material-ui/core/Chip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FlagIcon from "@material-ui/icons/Flag";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
const Inventory = React.memo(() => {
  const { completeOrdersState, cartsState, insertsState } = useContext(
    InstallCartContext
  );
  const [completeOrders] = completeOrdersState;
  const [carts] = cartsState;
  const [inserts] = insertsState;
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
    "orders"
  );
  const RetroMissing = () => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <ExclamationCircleTwoTone
          twoToneColor="#faca0f"
          style={{ fontSize: "15px", marginRight: "8px" }}
        />
        <span style={{ fontSize: "0.8em" }}>Missing</span>
      </div>
    );
  };
  const ordersColumns = [
    // {
    //   title: "ID",
    //   field: "ID",
    // },
    {
      title: "FW LOB",
      field: "FW_LOB",
    },
    {
      title: "FW SLOT",
      field: "FW_SLOT",
    },
    {
      title: "MONTH",
      field: "MONTH",
    },
    {
      title: "DEVICE COUNT",
      field: "DEVICE_COUNT",
      render: (rowData) =>
        rowData.DEVICE_COUNT ? rowData.DEVICE_COUNT : <RetroMissing />,
    },
    {
      title: "START DATE",
      field: "START_DATE",
      render: (rowData) =>
        rowData.START_DATE ? (
          moment(rowData.START_DATE.date).format("MM/DD/YYYY")
        ) : (
          <RetroMissing />
        ),
    },
    {
      title: "SHIP DATE",
      field: "SHIP_DATE",
      render: (rowData) =>
        rowData.SHIP_DATE ? (
          moment(rowData.SHIP_DATE.date).format("MM/DD/YYYY")
        ) : (
          <RetroMissing />
        ),
    },
    {
      title: "ROSD",
      field: "ROSD",
      render: (rowData) =>
        rowData.ROSD ? (
          moment(rowData.ROSD.date).format("MM/DD/YYYY")
        ) : (
          <RetroMissing />
        ),
    },
    {
      title: "CART RETURN",
      field: "CART_RETURN",
      render: (rowData) =>
        rowData.CART_RETURN ? (
          moment(rowData.CART_RETURN.date).format("MM/DD/YYYY")
        ) : (
          <RetroMissing />
        ),
    },
    {
      title: "GON",
      field: "GON",
      render: (rowData) => (rowData.GON === 0 ? "Missing" : rowData.GON),
    },
    {
      title: "PID",
      field: "PID",
      render: (rowData) => (rowData.PID ? rowData.PID : <RetroMissing />),
    },
    {
      title: "PROJECT DESCRIPTION",
      field: "PROJECT_DESCRIPTION",
    },
    {
      title: "STATUS",
      field: "STATUS",
      render: (rowData) => (
        <Chip
          label={
            rowData.STATUS.charAt(0).toUpperCase() + rowData.STATUS.slice(1)
          }
        />
      ),
    },
    {
      title: "ESTIMATED CART QTY",
      field: "ESTIMATED_CART_QTY",
      render: (rowData) => rowData.ESTIMATED_CART_QTY.toFixed(2),
    },
    {
      title: "PACKAGE",
      field: "PACKAGE",
    },
    {
      title: "FLAGGED ON CONFIG APP",
      field: "FLAGGED_ON_CONFIG_APP",
      render: (rowData) =>
        Boolean(rowData.FLAGGED_ON_CONFIG_APP) ? <FlagIcon /> : null,
    },
    {
      title: "NTP SUBMITTED",
      field: "NTP_SUBMITTED",
      render: (rowData) =>
        Boolean(rowData.NTP_SUBMITTED) ? <CheckIcon /> : null,
    },
    {
      title: "PROJECT MANAGER CONTACT",
      field: "PROJECT_MANAGER_CONTACT",
      render: (rowData) =>
        rowData.PROJECT_MANAGER_CONTACT ? (
          rowData.PROJECT_MANAGER_CONTACT
        ) : (
          <RetroMissing />
        ),
    },
    {
      title: "FE",
      field: "FE",
      render: (rowData) => (rowData.FE ? rowData.FE : <RetroMissing />),
    },
    {
      title: "OWNER",
      field: "OWNER",
      render: (rowData) => JSON.parse(rowData.OWNER).NAME,
    },
    {
      title: "CONFIGURATION INFORMATION",
      field: "CONFIGURATION_INFORMATION",
      render: (rowData) =>
        rowData.CONFIGURATION_INFORMATION ? (
          `${rowData.CONFIGURATION_INFORMATION.substring(0, 10)}...`
        ) : (
          <RetroMissing />
        ),
    },
    {
      title: "CREATED DATE",
      field: "CREATED_DATE",
      render: (rowData) =>
        rowData.CREATED_DATE ? (
          moment(rowData.CREATED_DATE.date).format("MM/DD/YYYY")
        ) : (
          <RetroMissing />
        ),
    },
  ];
  const cartsColumns = [
    {
      title: "ID",
      field: "ID",
    },
    {
      title: "WCPN",
      field: "WILLSON_CASE_PN",
    },
    {
      title: "STYLE",
      field: "STYLE",
    },
    {
      title: "SERIAL",
      field: "SERIAL",
    },
    {
      title: "PROJECT NAME",
      field: "PROJECT_NAME",
    },
    {
      title: "ASSIGNED ORDER",
      field: "ASSIGNED_ORDER",
    },
    // {
    //   title: "RESERVED DATE",
    //   field: "RESERVED_DATE",
    // },
    // {
    //   title: "EXPECTED RETURN",
    //   field: "EXPECTED_RETURN",
    // },
    {
      title: "NOTES",
      field: "NOTES",
    },
  ];
  const insertsColumns = [
    {
      title: "ID",
      field: "ID",
    },
    {
      title: "MODEL",
      field: "MODEL",
    },
    {
      title: "NAME",
      field: "NAME",
    },
    {
      title: "TOTAL",
      field: "TOTAL",
    },
    {
      title: "GOOD STOCK",
      field: "GOOD_STOCK",
    },
    {
      title: "RESERVED",
      field: "RESERVED",
    },
    {
      title: "IN USE",
      field: "IN_USE",
    },
    {
      title: "SCRAPPED",
      field: "SCRAPPED",
    },
  ];
  useEffect(() => {
    if (completeOrders.length !== 0 && carts !== 0 && inserts !== 0) {
      switch (ic_inventory_section) {
        case "orders":
          setTableColumns(ordersColumns);
          setTableData(completeOrders);
          break;
        case "carts":
          setTableColumns(cartsColumns);
          setTableData(carts);
          break;
        case "inserts":
          setTableColumns(insertsColumns);
          setTableData(inserts);
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line
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
              ic_inventory_section === "orders" ? "button-active" : null
            }
            onClick={() => {
              set_ic_inventory_section("orders");
            }}
          >
            Orders
          </Button>
          <Button
            className={
              ic_inventory_section === "carts" ? "button-active" : null
            }
            onClick={() => {
              set_ic_inventory_section("carts");
            }}
          >
            Carts
          </Button>
          <Button
            className={
              ic_inventory_section === "inserts" ? "button-active" : null
            }
            onClick={() => {
              set_ic_inventory_section("inserts");
            }}
          >
            Inserts
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
        />
      </div>
    </div>
  );
});
export default Inventory;
