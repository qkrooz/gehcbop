import React, { useState, useContext, useCallback } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import { MemoryRouter as Router, Link, Switch, Route } from "react-router-dom";
import { Context } from "../../../_context/MainContext";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "../styles/inventory.css";
import "../styles/addForm.css";
import { columnsIndex } from "../resources/inventoryColumns";
import { tableIcons } from "../resources/tableIcons";
import MaterialTable from "material-table";
import MaterialButton from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Form, Input } from "antd";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// tables
import DesktopsTable from "../components/desktopsTable";
import LaptopsTable from "../components/laptopsTable";
import MobilesTable from "../components/mobilesTable";
import LabelPrintersTable from "../components/labelPrintersTable";
import LaserPrintersTable from "../components/laserPrintersTable";
import ReservedIpsTable from "../components/reservedIpsTable";
const { TextArea } = Input;
const Inventory = React.memo(() => {
  const {
    addDesktopVisibilityState,
    addLaptopVisibilityState,
    addMobileVisibilityState,
    addLabelPrinterVisibilityState,
    addLaserPrinterVisibilityState,
    addReservedIpVisibilityState,
    dataState,
    genericLoaderState,
    // EditItem,
    // DeleteItem,
    its_inventory_sectionState,
  } = useContext(ItSupportContext);
  const [
    its_inventory_section,
    set_its_inventory_section,
  ] = its_inventory_sectionState;
  const [genericLoader] = genericLoaderState;
  const [, setAddDesktopVisibility] = addDesktopVisibilityState;
  const [, setAddLaptopVisibility] = addLaptopVisibilityState;
  const [, setAddMobileVisibility] = addMobileVisibilityState;
  const [, setAddLabelPrinterVisibility] = addLabelPrinterVisibilityState;
  const [, setAddLaserPrinterVisibility] = addLaserPrinterVisibilityState;
  const [, setAddReservedIpVisibility] = addReservedIpVisibilityState;
  const [data] = dataState;
  const [height, setHeight] = useState(null);
  const heightdiv = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  return (
    <Router>
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
            ></Button>
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
                its_inventory_section === "labelPrinters"
                  ? "button-active"
                  : null
              }
              onClick={() => {
                set_its_inventory_section("labelPrinters");
              }}
            >
              Label Printers
            </Button>
            <Button
              className={
                its_inventory_section === "laserPrinters"
                  ? "button-active"
                  : null
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
        <div className="tableContainer" ref={heightdiv}>
          <Switch>
            <Route component={DesktopsTable} path="/" />
            <Route component={LaptopsTable} path="/LaptopsTable" />
            <Route component={MobilesTable} path="/MobilesTable" />
            <Route component={LabelPrintersTable} path="/LabelPrintersTable" />
            <Route component={LaserPrintersTable} path="/LaserPrintersTable" />
            <Route component={ReservedIpsTable} path="/ReservedIpsTable" />
          </Switch>
          {/* <MaterialTable
          isLoading={genericLoader}
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
            pageSizeOptions: [20, 50, 100, data.length],
            pageSize: 20,
            minBodyHeight: height - 135,
            maxBodyHeight: height - 135,
          }}
          columns={columnsIndex[its_inventory_section]}
          data={data}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                // setTimeout(() => {
                //   const dataUpdate = [...data];
                //   const index = oldData.data.id;
                //   newData.section = its_inventory_section;
                //   dataUpdate[index] = newData;
                //   EditItem(newData);
                //   // console.log(newData);
                //   resolve();
                // }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                // setTimeout(() => {
                //   const dataDelete = [...data];
                //   const index = oldData.tableData.id;
                //   dataDelete.splice(index, 1);
                //   oldData.section = its_inventory_section;
                //   DeleteItem(oldData);
                //   resolve();
                // }, 1000);
              }),
          }}
        /> */}
        </div>
        <AddDesktop />
        <AddLaptop />
        <AddMobile />
        <AddLabelPrinter />
        <AddLaserPrinter />
        <AddReservedIp />
      </div>
    </Router>
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
