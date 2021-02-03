import React, { useContext, useCallback, useState, useEffect } from "react";
import { Menu, Dropdown } from "antd";
import { InstallCartContext } from "../resources/InstallCartContext";
import useLocalStorage from "../../../_resources/useLocalStorage";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "../styles/inventory.css";
import { tableIcons } from "../../itsupport/resources/tableIcons";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Chip from "@material-ui/core/Chip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
  const ordersColumns = [
    {
      title: "ID",
      field: "ID",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "CREATED DATE",
      field: "CREATED_DATE",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "GON",
      field: "GON",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "PROJECT NAME",
      field: "PROJECT_NAME",
      cellStyle: {
        textAlign: "left",
      },
    },
    {
      title: "FW",
      field: "FW",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "ROSD",
      field: "ROSD",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "SHIP DATE",
      field: "SHIP_DATE",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "DEVICE COUNT",
      field: "DEVICE_COUNT",
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData) => {
        if (
          rowData.DEVICE_COUNT === null ||
          rowData.DEVICE_COUNT === "" ||
          rowData.DEVICE_COUNT === undefined ||
          !rowData.DEVICE_COUNT ||
          rowData.DEVICE_COUNT === "[]"
        ) {
          return (
            <Chip
              icon={<ErrorOutlineIcon style={{ color: "#f44336" }} />}
              label={<span>Missing</span>}
            />
          );
        } else {
          const deviceCountMenu = (
            <Menu>
              {JSON.parse(rowData.DEVICE_COUNT).map((key, i) => {
                return (
                  <Menu.Item key={i}>
                    <div style={{ display: "flex" }}>
                      <span
                        style={{ fontWeight: "bold", marginRight: "0.5em" }}
                      >
                        {key.device + ":"}
                      </span>
                      <span>{key.quantity}</span>
                    </div>
                  </Menu.Item>
                );
              })}
            </Menu>
          );
          return (
            <Dropdown
              overlay={deviceCountMenu}
              trigger={["click"]}
              placement={"topRight"}
            >
              <Button onClick={(e) => e.preventDefault()}>
                <AddCircleIcon color="primary" />
              </Button>
            </Dropdown>
          );
        }
      },
    },
    {
      title: "PROJECT NANAGER",
      field: "PROJECT_NANAGER",
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData) => {
        if (rowData.PROJECT_MANAGER) {
          return <span>{rowData.PROJECT_MANAGER}</span>;
        } else {
          return (
            <Chip
              icon={<ErrorOutlineIcon style={{ color: "#f44336" }} />}
              label={<span>Missing</span>}
            />
          );
        }
      },
    },
    {
      title: "WRD",
      field: "WRD",
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData) => {
        if (rowData.WRD) {
          return <span>{rowData.WRD}</span>;
        } else {
          return (
            <Chip
              icon={<ErrorOutlineIcon style={{ color: "#f44336" }} />}
              label={<span>Missing</span>}
            />
          );
        }
      },
    },
    {
      title: "CONFIGURATION INFORMATION",
      field: "CONFIGURATION_INFORMATION",
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData) => {
        if (rowData.CONFIGURATION_INFORMATION) {
          const menu = (
            <Menu>
              <Menu.Item>
                <span style={{ whiteSpace: "pre-wrap" }}>
                  {rowData.CONFIGURATION_INFORMATION
                    ? rowData.CONFIGURATION_INFORMATION
                    : null}
                </span>
              </Menu.Item>
            </Menu>
          );
          return (
            <Dropdown trigger={["click"]} overlay={menu}>
              <span style={{ cursor: "pointer" }}>
                {rowData.CONFIGURATION_INFORMATION
                  ? rowData.CONFIGURATION_INFORMATION.substring(0, 30) + "...."
                  : null}
              </span>
            </Dropdown>
          );
        } else {
          return (
            <Chip
              icon={<ErrorOutlineIcon style={{ color: "#f44336" }} />}
              label={<span>Missing</span>}
            />
          );
        }
      },
    },
    {
      title: "OWNER",
      field: "OWNER",
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData) => (
        <Chip icon={<AccountCircleIcon />} label={rowData.OWNER} />
      ),
    },
    {
      title: "STATUS",
      field: "STATUS",
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData) =>
        rowData.STATUS ? (
          <Chip
            label={
              rowData.STATUS.charAt(0).toUpperCase() + rowData.STATUS.slice(1)
            }
            style={
              rowData.STATUS === "cancelled"
                ? { backgroundColor: "#f44336", color: "white" }
                : rowData.STATUS === "order completed"
                ? { backgroundColor: "#4caf50" }
                : { backgroundColor: "#2196f3", color: "white" }
            }
          />
        ) : (
          <Chip
            icon={<ErrorOutlineIcon style={{ color: "#f44336" }} />}
            label={<span>Missing</span>}
          />
        ),
    },
    {
      title: "CART USAGE",
      field: "CART_USAGE",
      cellStyle: {
        textAlign: "center",
      },
      render: (rowData) => {
        if (
          rowData.CART_USAGE === null ||
          rowData.CART_USAGE === "" ||
          rowData.CART_USAGE === undefined ||
          !rowData.CART_USAGE ||
          rowData.CART_USAGE === " "
        ) {
          return (
            <Chip
              icon={<ErrorOutlineIcon style={{ color: "#f44336" }} />}
              label={<span>Missing</span>}
            />
          );
        } else {
          const menu34 = (
            <Menu>
              {JSON.parse(rowData.CART_USAGE).map((key, i) => {
                return (
                  <Menu.Item key={i}>
                    <div style={{ display: "flex" }}>
                      <span
                        style={{ fontWeight: "bold", marginRight: "0.5em" }}
                      >
                        {"Cart Usage: "}
                      </span>
                      <span>{key.cartUsage}</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <span
                        style={{ fontWeight: "bold", marginRight: "0.5em" }}
                      >
                        Total Slots:
                      </span>
                      <span>{key.totalSlots}</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <span
                        style={{ fontWeight: "bold", marginRight: "0.5em" }}
                      >
                        Tall:
                      </span>
                      <span>{key.tall}</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <span
                        style={{ fontWeight: "bold", marginRight: "0.5em" }}
                      >
                        Short:
                      </span>
                      <span>{key.short}</span>
                    </div>
                  </Menu.Item>
                );
              })}
            </Menu>
          );
          return (
            <Dropdown
              overlay={menu34}
              trigger={["click"]}
              placement={"topRight"}
            >
              <Button onClick={(e) => e.preventDefault()}>
                <AddCircleIcon color="primary" />
              </Button>
            </Dropdown>
          );
        }
      },
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
