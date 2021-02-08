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
import { InstallCartContext } from "../../installcart/resources/InstallCartContext";

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
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
const { TextArea } = Input;
const Inventory = React.memo(() => {
  const { addDialogVisibilityState } = useContext(ItSupportContext);
  const { BASE_URL, currentApplicationState } = useContext(Context);
  const [dataLoading, setDataLoading] = useState(true);
  const [columns, setColumns] = useState([]);
  const [currentApplication] = currentApplicationState;
  const [height, setHeight] = useState(null);
  const [, setAddDialogVisibility] = addDialogVisibilityState;
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [rowData_action, setRowData_action] = useState({});
  // const [rowMenu_visibility, setRowMenu_visibility] = useState(false);
  const [its_inventory_section, set_its_inventory_section] = useLocalStorage(
    "its_inventory_section",
    "desktops"
  );
  const [tableData, setTableData] = useState([]);
  const getData = (section) => {
    setDataLoading(true);
    axios
      .post(`${BASE_URL}/${currentApplication}/fetchMaster.php`, {
        section: section,
      })
      .then((response) => {
        if (response.data.code === 200) {
          const tempColumns = response.data.columns;
          let finalColumns = [];
          tempColumns.forEach((item) => {
            let temporalObj = {
              title: item.COLUMN_NAME.toUpperCase(),
              field: item.COLUMN_NAME,
            };
            finalColumns.push(temporalObj);
          });
          setColumns(finalColumns);
          setTableData(response.data.data);
          setDataLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const openMenu = (event, rowData) => {
    // let anchorElement = event.currentTarget;
    // setAnchorEl(anchorElement);
    // setRowMenu_visibility(true);
  };
  const heightdiv = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  useEffect(() => {
    getData(its_inventory_section);
    // eslint-disable-next-line
  }, [its_inventory_section]);
  // const rowMenuRender = (
  //   <Menu
  //     id="simple-menu"
  //     anchorEl={anchorEl}
  //     keepMounted
  //     open={rowMenu_visibility}
  //     onClose={() => {
  //       setAnchorEl(null);
  //     }}
  //   >
  //     <MenuItem>Edit</MenuItem>
  //   </Menu>
  // );
  return (
    <>
      {/* <div className="inventoryContainer">
        <div className="controls">
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
                its_inventory_section === "label_printers"
                  ? "button-active"
                  : null
              }
              onClick={() => {
                set_its_inventory_section("label_printers");
              }}
            >
              Label Printers
            </Button>
            <Button
              className={
                its_inventory_section === "laser_printers"
                  ? "button-active"
                  : null
              }
              onClick={() => {
                set_its_inventory_section("laser_printers");
              }}
            >
              Laser Printers
            </Button>
            <Button
              className={
                its_inventory_section === "reserved_ips"
                  ? "button-active"
                  : null
              }
              onClick={() => {
                set_its_inventory_section("reserved_ips");
              }}
            >
              Reserverd Ip's
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <MaterialButton
            variant="contained"
            color="primary"
            disableElevation
            startIcon={<AddIcon />}
            onClick={() => {
              setAddDialogVisibility(true);
            }}
          >
            Add Desktop
          </MaterialButton>
        </div>
        <div className="its_inventory_tableContainer" ref={heightdiv}>
          <MaterialTable
            icons={tableIcons}
            localization={{
              header: {
                actions: "",
              },
            }}
            actions={[
              {
                icon: () => (
                  <MoreVert
                    color="disabled"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                  />
                ),
                tooltip: "More",
                onClick: (event, rowData) => {
                  openMenu(event, rowData);
                },
              },
            ]}
            title=""
            isLoading={dataLoading}
            options={{
              actionsColumnIndex: -1,
              padding: "dense",
              toolbar: true,
              search: true,
              headerStyle: { position: "sticky", top: 0 },
              pageSizeOptions: [25, 50, 100, tableData.length],
              pageSize: 25,
              minBodyHeight: height - 135,
              maxBodyHeight: height - 135,
            }}
            columns={columns}
            data={tableData}
          />
        </div>
      </div> */}
      <AddDialog />
    </>
  );
});

const AddDialog = React.memo(() => {
  const { userDataState } = useContext(Context);
  const { addDialogVisibilityState, AddItem } = useContext(ItSupportContext);
  const [
    addDialogVisibility,
    setAddDialogVisibility,
  ] = addDialogVisibilityState;
  const [addForm] = Form.useForm();
  addForm.resetFields();
  const onFinish = (values) => {
    values.serialNumber = values.serialNumber
      .toUpperCase()
      .split("\n")
      .filter(String);
    values.hostname = values.serialNumber.map(
      (serialNumbers) => "G" + serialNumbers + "E"
    );
    values.section = "desktops";
    console.log(values);
    AddItem(values);
  };
  return (
    <Dialog
      open={addDialogVisibility}
      scroll="body"
      onClose={() => {
        setAddDialogVisibility(false);
      }}
      style={{ zIndex: 2 }}
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
        <MaterialButton autoFocus variant="contained">
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
