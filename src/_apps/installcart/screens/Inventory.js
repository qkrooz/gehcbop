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
    },
    {
      title: "CREATED DATE",
      field: "CREATED_DATE",
    },
    {
      title: "GON",
      field: "GON",
    },
    {
      title: "PROJECT NAME",
      field: "PROJECT_NAME",
    },
    {
      title: "FW",
      field: "FW",
    },
    {
      title: "ROSD",
      field: "ROSD",
    },
    {
      title: "SHIP DATE",
      field: "SHIP_DATE",
    },
    {
      title: "DEVICE COUNT",
      field: "DEVICE_COUNT",
      render: (rowData) => {
        if (rowData.DEVICE_COUNT !== "") {
          const deviceCountMenu = (
            <Menu>
              {JSON.parse(rowData.DEVICE_COUNT).map((key, i) => {
                return (
                  <Menu.Item key={i}>
                    <div style={{ display: "flex" }}>
                      <span>{key.device + ": "}</span>
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
        } else {
          return <></>;
        }
      },
    },
    {
      title: "PROJECT NANAGER",
      field: "PROJECT_NANAGER",
    },
    {
      title: "WRD",
      field: "WRD",
    },
    {
      title: "CONFIGURATION INFORMATION",
      field: "CONFIGURATION_INFORMATION",
    },
    {
      title: "OWNER",
      field: "OWNER",
    },
    {
      title: "STATUS",
      field: "STATUS",
    },
    {
      title: "CART USAGE",
      field: "CART_USAGE",
      // render: (rowData) => {
      //   if (rowData.DEVICE_USAGE !== "") {
      //     const deviceCountMenu = (
      //       <Menu>
      //         {JSON.parse(rowData.DEVICE_COUNT).map((key, i) => {
      //           return (
      //             <Menu.Item key={i}>
      //               <div style={{ display: "flex" }}>
      //                 <span>{key.device + ": "}</span>
      //                 <span>{key.quantity}</span>
      //               </div>
      //             </Menu.Item>
      //           );
      //         })}
      //       </Menu>
      //     );
      //     return (
      //       <Dropdown
      //         overlay={deviceCountMenu}
      //         trigger={["click"]}
      //         placement={"topRight"}
      //       >
      //         <Button onClick={(e) => e.preventDefault()}>
      //           <AddCircleIcon color="primary" />
      //         </Button>
      //       </Dropdown>
      //     );
      //   } else {
      //     return <></>;
      //   }
      // },
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
