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
import { Edit } from "@material-ui/icons";

const { TextArea } = Input;

const Inventory = React.memo(() => {
  const {
    addDesktopVisibilityState,
    addLaptopVisibilityState,
    addMobileVisibilityState,
    addLabelPrinterVisibilityState,
    addLaserPrinterVisibilityState,
    addReservedIpVisibilityState,
    desktopsState,
    laptopsState,
    mobilesState,
    labelPrintersState,
    laserPrintersState,
    reservedIpsState,
    EditItem,
    DeleteItem,
  } = useContext(ItSupportContext);
  const [, setAddDesktopVisibility] = addDesktopVisibilityState;
  const [, setAddLaptopVisibility] = addLaptopVisibilityState;
  const [, setAddMobileVisibility] = addMobileVisibilityState;
  const [, setAddLabelPrinterVisibility] = addLabelPrinterVisibilityState;
  const [, setAddLaserPrinterVisibility] = addLaserPrinterVisibilityState;
  const [, setAddReservedIpVisibility] = addReservedIpVisibilityState;
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
  const [its_inventory_section, set_its_inventory_section] = useLocalStorage(
    "its_inventory_section",
    "desktops"
  );
  const desktopsColumns = [
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
    },
    {
      title: "COUNTRY",
      field: "Country",
    },
    {
      title: "USERNAME",
      field: "Username",
    },
  ];
  const laptopsColumns = [
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
      title: "SSO",
      field: "SSO",
    },
    {
      title: "USERNAME",
      field: "UserName",
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
      title: "DEPARTMENT",
      field: "Department",
    },
    {
      title: "HOSTNAME",
      field: "Hostname",
    },
    {
      title: "COUNTRY",
      field: "Country",
    },
  ];
  const mobilesColumns = [
    {
      title: "BRAND",
      field: "Brand",
    },
    {
      title: "MODEL",
      field: "Model",
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
      field: "UserName",
    },
    {
      title: "DEPARTMENT",
      field: "Department",
    },
    {
      title: "COLOR",
      field: "Color",
    },
    {
      title: "SPECS",
      field: "Specs",
    },
    {
      title: "TEL NUMBER",
      field: "TelNumber",
    },
  ];
  const labelPrintersColumns = [
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
      title: "TAG",
      field: "Tag",
    },
    {
      title: "BARTENDER NAME",
      field: "BartenderName",
    },
    {
      title: "IP ADDRESS",
      field: "IPAddress",
    },
  ];
  const laserPrintersColumns = [
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
  ];
  const reserverdIpsColumns = [
    {
      title: "IP ADDRESS",
      field: "IP",
    },
    {
      title: "DEVICE",
      field: "Device",
    },
    {
      title: "LOCATION",
      field: "Location",
    },
    {
      title: "AREA",
      field: "Area",
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
      switch (its_inventory_section) {
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
        case "reservedIps":
          setTableColumns(reserverdIpsColumns);
          setTableData(reservedIps);
          break;
        default:
          break;
      }
    }
  }, [its_inventory_section]);
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
              its_inventory_section === "desktops" ? "button-active" : null
            }
            onClick={() => {
              set_its_inventory_section("desktops");
            }}
          >
            Desktops
          </Button>
          <Button
            className={
              its_inventory_section === "laptops" ? "button-active" : null
            }
            onClick={() => {
              set_its_inventory_section("laptops");
            }}
          >
            Laptops
          </Button>
          <Button
            className={
              its_inventory_section === "mobiles" ? "button-active" : null
            }
            onClick={() => {
              set_its_inventory_section("mobiles");
            }}
          >
            Mobiles
          </Button>
          <Button
            className={
              its_inventory_section === "labelPrinters" ? "button-active" : null
            }
            onClick={() => {
              set_its_inventory_section("labelPrinters");
            }}
          >
            Label Printers
          </Button>
          <Button
            className={
              its_inventory_section === "laserPrinters" ? "button-active" : null
            }
            onClick={() => {
              set_its_inventory_section("laserPrinters");
            }}
          >
            Laser Printers
          </Button>
          <Button
            className={
              its_inventory_section === "reservedIps" ? "button-active" : null
            }
            onClick={() => {
              set_its_inventory_section("reservedIps");
            }}
          >
            Reserved IP's
          </Button>
        </ButtonGroup>
        <div>
          <MaterialButton
            variant="contained"
            color="primary"
            disableElevation
            style={{ float: "right" }}
            startIcon={<AddIcon />}
            onClick={() => {
              switch (its_inventory_section) {
                case "desktops":
                  setAddDesktopVisibility(true);
                  break;
                case "laptops":
                  setAddLaptopVisibility(true);
                  break;
                case "mobiles":
                  setAddMobileVisibility(true);
                  break;
                case "labelPrinters":
                  setAddLabelPrinterVisibility(true);
                  break;
                case "laserPrinters":
                  setAddLaserPrinterVisibility(true);
                  break;
                case "reservedIps":
                  setAddReservedIpVisibility(true);
                  break;
                default:
                  break;
              }
            }}
          >
            Add Item
          </MaterialButton>
        </div>
      </div>
      <div className="tableContainer" ref={heightdiv}>
        <MaterialTable
          icons={tableIcons}
          style={{ zIndex: "1" }}
          title={
            its_inventory_section.charAt(0).toUpperCase() +
            its_inventory_section.slice(1)
          }
          options={{
            actionsColumnIndex: -1,
            padding: "dense",
            toolbar: true,
            search: true,
            headerStyle: { position: "sticky", top: 0 },
            pageSizeOptions: [20, 50, 100, tableData.length],
            pageSize: 20,
            minBodyHeight: height - 135,
            maxBodyHeight: height - 135,
          }}
          columns={tableColumns}
          data={tableData}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...tableData];
                  const index = oldData.tableData.id;
                  newData.section = its_inventory_section;
                  dataUpdate[index] = newData;
                  EditItem(newData);
                  // console.log(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...tableData];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  oldData.section = its_inventory_section;
                  DeleteItem(oldData);

                  resolve();
                }, 1000);
              }),
          }}
        ></MaterialTable>
      </div>
      <AddDesktop />
      <AddLaptop />
      <AddMobile />
      <AddLabelPrinter />
      <AddLaserPrinter />
      <AddReservedIp />
    </div>
  );
});

const AddDesktop = React.memo(() => {
  const { userDataState } = useContext(Context);
  const { addDesktopVisibilityState, AddItem } = useContext(ItSupportContext);
  const [
    addDesktopVisibility,
    setAddDesktopVisibility,
  ] = addDesktopVisibilityState;
  const [addForm] = Form.useForm();
  addForm.resetFields();
  const onFinish = (values) => {
    values.serviceTag = values.serviceTag
      .toUpperCase()
      .split("\n")
      .filter(String);
    let hostname = values.serviceTag.map(
      (serviceTag) => "G" + serviceTag + "E"
    );
    values.section = "desktops";
    values.hostname = hostname;
    const count = hostname.length;
    values.count = count;
    AddItem(values);
    setAddDesktopVisibility(false);
  };
  return (
    <Dialog
      open={addDesktopVisibility}
      scroll="body"
      onClose={() => {
        setAddDesktopVisibility(false);
      }}
      style={{ zIndex: 9 }}
    >
      <DialogTitle id="simple-dialog-title">Add new Desktop</DialogTitle>
      <DialogContent dividers className="addFormContainer">
        <Form
          form={addForm}
          name="dynamic_form_nest_item"
          autoComplete="off"
          onFinish={onFinish}
        >
          <div className="formItem">
            <Form.Item
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Please fill this field",
                },
              ]}
            >
              <Input allowClear placeholder="Brand" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="model"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Model" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="serviceTag"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <TextArea
                rows={1}
                allowClear
                placeholder="Service Tag(s)"
                autoSize
              />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="location"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Location" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="area"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Area" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="os"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="OS" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="specs"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Specs" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="country"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Country" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Username" />
            </Form.Item>
          </div>
        </Form>
      </DialogContent>
      <DialogActions>
        <MaterialButton
          autoFocus
          variant="contained"
          onClick={() => {
            setAddDesktopVisibility(false);
          }}
        >
          CANCEL
        </MaterialButton>
        <MaterialButton
          color="primary"
          variant="contained"
          onClick={addForm.submit}
        >
          CONFIRM
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
});

const AddLaptop = React.memo(() => {
  const { userDataState } = useContext(Context);
  const { addLaptopVisibilityState, AddItem } = useContext(ItSupportContext);
  const [
    addLaptopVisibility,
    setAddLaptopVisibility,
  ] = addLaptopVisibilityState;
  const [addForm] = Form.useForm();
  addForm.resetFields();
  const onFinish = (values) => {
    values.serviceTag = values.serviceTag
      .toUpperCase()
      .split("\n")
      .filter(String);
    let hostname = values.serviceTag.map(
      (serviceTag) => "G" + serviceTag + "E"
    );
    values.section = "laptops";
    values.hostname = hostname;
    const count = hostname.length;
    values.count = count;
    AddItem(values);
    setAddLaptopVisibility(false);
  };
  return (
    <Dialog
      open={addLaptopVisibility}
      scroll="body"
      onClose={() => {
        setAddLaptopVisibility(false);
      }}
      style={{ zIndex: 2 }}
    >
      <DialogTitle id="simple-dialog-title">Add new Laptop</DialogTitle>
      <DialogContent dividers className="addFormContainer">
        <Form
          form={addForm}
          name="dynamic_form_nest_item"
          autoComplete="off"
          onFinish={onFinish}
        >
          <div className="formItem">
            <Form.Item
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Please fill this field",
                },
              ]}
            >
              <Input allowClear placeholder="Brand" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="model"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Model" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="serviceTag"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <TextArea
                rows={1}
                allowClear
                placeholder="Service Tag(s)"
                autoSize
              />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="sso"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="SSO" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Username" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="department"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Department" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="os"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="OS" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="specs"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Specs" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="country"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Country" />
            </Form.Item>
          </div>
        </Form>
      </DialogContent>
      <DialogActions>
        <MaterialButton
          autoFocus
          variant="contained"
          onClick={() => {
            setAddLaptopVisibility(false);
          }}
        >
          CANCEL
        </MaterialButton>
        <MaterialButton
          color="primary"
          variant="contained"
          onClick={addForm.submit}
        >
          CONFIRM
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
});

const AddMobile = React.memo(() => {
  const { userDataState } = useContext(Context);
  const { addMobileVisibilityState, AddItem } = useContext(ItSupportContext);
  const [
    addMobileVisibility,
    setAddMobileVisibility,
  ] = addMobileVisibilityState;
  const [addForm] = Form.useForm();
  addForm.resetFields();
  const onFinish = (values) => {
    values.section = "mobiles";
    const count = values.imei.length;
    values.count = count;
    AddItem(values);
    setAddMobileVisibility(false);
  };
  return (
    <Dialog
      open={addMobileVisibility}
      scroll="body"
      onClose={() => {
        setAddMobileVisibility(false);
      }}
      style={{ zIndex: 2 }}
    >
      <DialogTitle id="simple-dialog-title">Add new Mobile</DialogTitle>
      <DialogContent dividers className="addFormContainer">
        <Form
          form={addForm}
          name="dynamic_form_nest_item"
          autoComplete="off"
          onFinish={onFinish}
        >
          <div className="formItem">
            <Form.Item
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Please fill this field",
                },
              ]}
            >
              <Input allowClear placeholder="Brand" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="model"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Model" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="imei"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="IMEI" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="sso"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="SSO" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Username" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="department"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Department" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="color"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Color" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="specs"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Specs" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="telNumber"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Tel Number" />
            </Form.Item>
          </div>
        </Form>
      </DialogContent>
      <DialogActions>
        <MaterialButton
          autoFocus
          variant="contained"
          onClick={() => {
            setAddMobileVisibility(false);
          }}
        >
          CANCEL
        </MaterialButton>
        <MaterialButton
          color="primary"
          variant="contained"
          onClick={addForm.submit}
        >
          CONFIRM
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
});

const AddLabelPrinter = React.memo(() => {
  const { userDataState } = useContext(Context);
  const { addLabelPrinterVisibilityState, AddItem } = useContext(
    ItSupportContext
  );
  const [
    addLabelPrinterVisibility,
    setAddLabelPrinterVisibility,
  ] = addLabelPrinterVisibilityState;
  const [addForm] = Form.useForm();
  addForm.resetFields();
  const onFinish = (values) => {
    values.serialNumber = values.serialNumber
      .toUpperCase()
      .split("\n")
      .filter(String);
    values.section = "labelPrinters";
    const count = values.serialNumber.length;
    values.count = count;
    AddItem(values);
    setAddLabelPrinterVisibility(true);
  };
  return (
    <Dialog
      open={addLabelPrinterVisibility}
      scroll="body"
      onClose={() => {
        setAddLabelPrinterVisibility(false);
      }}
      style={{ zIndex: 2 }}
    >
      <DialogTitle id="simple-dialog-title">Add new Label Printer</DialogTitle>
      <DialogContent dividers className="addFormContainer">
        <Form
          form={addForm}
          name="dynamic_form_nest_item"
          autoComplete="off"
          onFinish={onFinish}
        >
          <div className="formItem">
            <Form.Item
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Please fill this field",
                },
              ]}
            >
              <Input allowClear placeholder="Brand" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="model"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Model" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="serialNumber"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <TextArea
                rows={1}
                allowClear
                placeholder="Serial Number(s)"
                autoSize
              />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="location"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Location" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="area"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Area" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="tag"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="TAG" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="bartenderName"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Bartender Name" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="ipAddress"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="IP Address" />
            </Form.Item>
          </div>
        </Form>
      </DialogContent>
      <DialogActions>
        <MaterialButton
          autoFocus
          variant="contained"
          onClick={() => {
            setAddLabelPrinterVisibility(false);
          }}
        >
          CANCEL
        </MaterialButton>
        <MaterialButton
          color="primary"
          variant="contained"
          onClick={addForm.submit}
        >
          CONFIRM
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
});

const AddLaserPrinter = React.memo(() => {
  const { userDataState } = useContext(Context);
  const { addLaserPrinterVisibilityState, AddItem } = useContext(
    ItSupportContext
  );
  const [
    addLaserPrinterVisibility,
    setAddLaserPrinterVisibility,
  ] = addLaserPrinterVisibilityState;
  const [addForm] = Form.useForm();
  addForm.resetFields();
  const onFinish = (values) => {
    values.serialNumber = values.serialNumber
      .toUpperCase()
      .split("\n")
      .filter(String);

    values.section = "laserPrinters";
    const count = values.serialNumber.length;
    values.count = count;
    AddItem(values);
    setAddLaserPrinterVisibility(false);
  };
  return (
    <Dialog
      open={addLaserPrinterVisibility}
      scroll="body"
      onClose={() => {
        setAddLaserPrinterVisibility(false);
      }}
      style={{ zIndex: 2 }}
    >
      <DialogTitle id="simple-dialog-title">Add new Laser Printer</DialogTitle>
      <DialogContent dividers className="addFormContainer">
        <Form
          form={addForm}
          name="dynamic_form_nest_item"
          autoComplete="off"
          onFinish={onFinish}
        >
          <div className="formItem">
            <Form.Item
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Please fill this field",
                },
              ]}
            >
              <Input allowClear placeholder="Brand" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="model"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Model" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="serialNumber"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <TextArea
                rows={1}
                allowClear
                placeholder="Serial Number(s)"
                autoSize
              />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="location"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Location" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="area"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Area" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="dahillTag"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="DAHILL Tag" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="hostname"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Hostname" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="ipAddress"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="IP Address" />
            </Form.Item>
          </div>
        </Form>
      </DialogContent>
      <DialogActions>
        <MaterialButton
          autoFocus
          variant="contained"
          onClick={() => {
            setAddLaserPrinterVisibility(false);
          }}
        >
          CANCEL
        </MaterialButton>
        <MaterialButton
          color="primary"
          variant="contained"
          onClick={addForm.submit}
        >
          CONFIRM
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
});

const AddReservedIp = React.memo(() => {
  const { userDataState } = useContext(Context);
  const { addReservedIpVisibilityState, AddItem } = useContext(
    ItSupportContext
  );
  const [
    addReservedIpVisibility,
    setAddReservedIpVisibility,
  ] = addReservedIpVisibilityState;
  const [addForm] = Form.useForm();
  addForm.resetFields();
  const onFinish = (values) => {
    values.ip = values.ip.split("\n").filter(String);
    values.section = "reservedIps";
    const count = values.ip.length;
    values.count = count;
    AddItem(values);
    setAddReservedIpVisibility(false);
  };
  return (
    <Dialog
      open={addReservedIpVisibility}
      scroll="body"
      onClose={() => {
        setAddReservedIpVisibility(false);
      }}
      style={{ zIndex: 9 }}
    >
      <DialogTitle id="simple-dialog-title">
        Add new Reserved IP Address
      </DialogTitle>
      <DialogContent dividers className="addFormContainer">
        <Form
          form={addForm}
          name="dynamic_form_nest_item"
          autoComplete="off"
          onFinish={onFinish}
        >
          <div className="formItem">
            <Form.Item
              name="ip"
              rules={[
                {
                  required: true,
                  message: "Please fill this field",
                },
              ]}
            >
              <Input allowClear placeholder="IP" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="device"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Device" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="location"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Location" />
            </Form.Item>
          </div>
          <div className="formItem">
            <Form.Item
              name="area"
              rules={[{ required: true, message: "Please fill this field" }]}
            >
              <Input allowClear placeholder="Area" />
            </Form.Item>
          </div>
        </Form>
      </DialogContent>
      <DialogActions>
        <MaterialButton
          autoFocus
          variant="contained"
          onClick={() => {
            setAddReservedIpVisibility(false);
          }}
        >
          CANCEL
        </MaterialButton>
        <MaterialButton
          color="primary"
          variant="contained"
          onClick={addForm.submit}
        >
          CONFIRM
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
});
export default Inventory;
