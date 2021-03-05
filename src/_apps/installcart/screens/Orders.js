import React, { useContext, useState, useEffect } from "react";
import { InstallCartContext } from "../resources/InstallCartContext";
import { Context } from "../../../_context/MainContext";
import {
  Menu,
  Progress,
  Dropdown,
  Descriptions,
  Steps,
  Input,
  DatePicker,
  Select,
  Form,
  Space,
  Checkbox,
} from "antd";
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
import {
  Paper,
  InputBase,
  Button,
  Tooltip,
  IconButton,
} from "@material-ui/core";
// icons
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Add } from "@material-ui/icons";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Collapse from "react-collapse";
import MaterialButton from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import SortIcon from "@material-ui/icons/Sort";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
// Components
import OrdersChart from "../components/OrdersChart";
import CartsChart from "../components/CartsChart";
import OrdersTotalChart from "../components/OrdersTotalChart";
import "../styles/orders.css";
import "../styles/addForm.css";
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const Orders = React.memo(() => {
  const {
    ordersState,
    SwitchOrders,
    ordersSwitchState,
    ordersCheckboxState,
    SearchOrders,
    ToggleComplete,
    addDialogVisibilityState,
    workingOrderState,
  } = useContext(InstallCartContext);
  const [orders] = ordersState;
  const [ordersCheckbox] = ordersCheckboxState;
  const [ordersSwitch] = ordersSwitchState;
  const [workingOrder] = workingOrderState;
  const [searchText_temp, setSearchText_temp] = useState("");
  const [, setAddDialogVisibility] = addDialogVisibilityState;
  return (
    <div className="ordersMainContainer">
      <div className="ordersContainer">
        <div className="ordersList">
          {Object.values(orders).map((order, i) => (
            <OrderElement data={order} key={i} />
          ))}
        </div>
        <div className="ordersControls">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            startIcon={<AddIcon />}
            onClick={() => {
              setAddDialogVisibility(true);
            }}
            style={{ marginBottom: "1em" }}
          >
            Add New Order
          </Button>
          <div
            style={{
              width: "100%",
              borderBottom: "1PX solid #e2e2e2",
              marginBottom: "1em",
            }}
          ></div>
          <Paper
            elevation={2}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: 6,
              marginBottom: "1em",
            }}
          >
            <InputBase
              placeholder="Search orders"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(event) => {
                SearchOrders(event);
                setSearchText_temp(event.target.value);
              }}
            />
            <span style={{ marginLeft: "auto" }}>
              <SearchIcon style={{ color: "gray" }} />
            </span>
          </Paper>
          <div className="switchContainer">
            <div className="inner">
              <span>Show complete</span>
              <Switch
                disabled={ordersCheckbox}
                checked={ordersSwitch}
                onChange={(event) => {
                  SwitchOrders(event, searchText_temp);
                }}
                color="primary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
            <div className="inner">
              <span>Only completed</span>
              <Switch
                disabled={ordersSwitch}
                checked={ordersCheckbox}
                onChange={(event) => ToggleComplete(event.target.checked)}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </div>
          </div>
        </div>
      </div>
      <AddDialog />
      <DeleteConfirmDialog />
      <EditDialog />
    </div>
  );
});
const OrderElement = React.memo(({ data }) => {
  // variable declaration:
  let FW_LOB = data.FW_LOB;
  let FW_SLOT = data.FW_SLOT;
  let MONTH = data.MONTH;
  let DEVICE_COUNT = data.DEVICE_COUNT;
  let CREATED_DATE = data.CREATED_DATE ? data.CREATED_DATE.date : null;
  let START_DATE = data.START_DATE.date;
  let SHIP_DATE = data.SHIP_DATE.date;
  let ROSD = data.ROSD.date;
  let CART_RETURN = data.CART_RETURN;
  let GON = data.GON;
  let PID = data.PID;
  let PROJECT_DESCRIPTION = data.PROJECT_DESCRIPTION;
  let STATUS = data.STATUS;
  let ESTIMATED_CART_QTY = data.ESTIMATED_CART_QTY;
  let PACKAGE = data.PACKAGE;
  let FLAGGED_ON_CONFIG_APP = data.FLAGGED_ON_CONFIG_APP;
  let NTP_SUBMITTED = data.NTP_SUBMITTED;
  let PROJECT_MANAGER_CONTACT = data.PROJECT_MANAGER_CONTACT;
  let FE = data.FE;
  let OWNER = data.OWNER;
  let CONFIGURATION_INFORMATION = data.CONFIGURATION_INFORMATION;
  // states
  const [detailsCollapse, setDetailsCollapse] = useState(false);
  const [coninfCollapse, setConinfCollapse] = useState(false);
  const [statusProgress, setStatusProgress] = useState(0);
  // context
  const {
    ordersState,
    statusListState,
    workingOrderState,
    deleteDialogVisibilityState,
    editDialogVisibilityState,
  } = useContext(InstallCartContext);
  const [orders] = ordersState;
  const [, setDeleteDialogVisibility] = deleteDialogVisibilityState;
  const [, setWorkingOrder] = workingOrderState;
  const [statusList] = statusListState;
  const [, setEditDialogVisibility] = editDialogVisibilityState;
  // effects
  useEffect(() => {
    const progressPerSegment = (100 / statusList.length).toFixed(0);
    statusList.forEach((item, i) => {
      if (STATUS === "order complete") {
        setStatusProgress(100);
      } else {
        switch (item) {
          case STATUS:
            setStatusProgress(progressPerSegment * (i + 1));
            break;
          default:
            break;
        }
      }
    });
    // eslint-disable-next-line
  }, [orders]);
  const ellipsisMenu = (
    <Menu>
      <Menu.Item key="0">
        <Button
          type="text"
          onClick={() => {
            setEditDialogVisibility(true);
            setWorkingOrder(data);
          }}
        >
          <EditOutlined />
          Edit
        </Button>
      </Menu.Item>
      <Menu.Item key="1">
        <Button
          type="text"
          onClick={() => {
            setDeleteDialogVisibility(true);
            setWorkingOrder(data);
          }}
        >
          <DeleteOutlined />
          Delete
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="order-container-outter ">
      <div className="order-container-inner">
        <div className="primary-data-container">
          <Tooltip title="GON" placement="right">
            <span className="gon-label">{`#${GON}`}</span>
          </Tooltip>
          <span className="projName-label">{PROJECT_DESCRIPTION}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              // src={`https://supportcentral.gecdn.com/images/person/temp/${userData.SSO}.jpg`}
              src={`https://supportcentral.gecdn.com/images/person/temp/212774780.jpg`}
              alt="user-img"
              style={{
                width: "2em",
                height: "2em",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "0.5em",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>{"Ibarra, Cesar"}</span>
              <span style={{ fontSize: "0.8em" }}>
                {CREATED_DATE
                  ? moment(CREATED_DATE).format("MM/DD/YYYY")
                  : "31, marzo"}
              </span>
            </div>
          </div>
        </div>
        <div className="fw-container">
          <span className="desc">Fiscal Week</span>
          <span className="fw-label">{FW_SLOT}</span>
        </div>
        <div className="dates-container">
          <span className="desc">Ship Date</span>
          <span className="date">{moment(SHIP_DATE).format("MM/DD/YYYY")}</span>
          <span className="desc">ROSD</span>
          <span className="date">{moment(ROSD).format("MM/DD/YYYY")}</span>
        </div>
        <div className="captions">
          {!STATUS ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span className="caption-desc">Status missing</span>
            </div>
          ) : null}
          {!CONFIGURATION_INFORMATION ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span className="caption-desc">
                Configuration Information missing
              </span>
            </div>
          ) : null}
          {/* {!WRD ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span className="caption-desc">
                Warehouse Requested Date missing
              </span>
            </div>
          ) : null} */}
          {!PROJECT_MANAGER_CONTACT ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span className="caption-desc">Project Manager missing</span>
            </div>
          ) : null}
        </div>
        <div className="progress">
          <Progress
            status={STATUS === "cancelled" ? "exception" : null}
            type="dashboard"
            width={70}
            strokeLinecap="square"
            style={{ marginBottom: 10 }}
            percent={STATUS === "order complete" ? 100 : statusProgress}
          />
          {STATUS ? (
            <Tooltip title="Status" placement="right">
              <span className="status-label">{data.STATUS}</span>
            </Tooltip>
          ) : null}
        </div>
        <div className="controls">
          {data.STATUS === "order complete" ? null : (
            <Dropdown trigger={["click"]} overlay={ellipsisMenu}>
              <IconButton type="text">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Dropdown>
          )}
          <IconButton
            type="text"
            className="order-icon"
            style={
              data.STATUS === "order complete" ? { marginTop: "auto" } : null
            }
            onClick={() => {
              setDetailsCollapse(!detailsCollapse);
            }}
          >
            {detailsCollapse ? (
              <ExpandLessIcon fontSize="small" />
            ) : (
              <ExpandMoreIcon fontSize="small" />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
});
const AddDialog = React.memo(() => {
  const { userDataState } = useContext(Context);
  const {
    AddOrder,
    addDialogVisibilityState,
    statusListState,
    devicesListState,
    genericLoaderState,
  } = useContext(InstallCartContext);
  const [userData] = userDataState;
  const [genericLoader] = genericLoaderState;
  const [
    addDialogVisibility,
    setAddDialogVisibility,
  ] = addDialogVisibilityState;
  const [statusList] = statusListState;
  const [devicesList] = devicesListState;
  const [addForm] = Form.useForm();
  addForm.resetFields();
  const dateFormat = "MM/DD/YYYY";
  const onFinish = (values) => {
    values.rosd = moment(values.rosd).format(dateFormat);
    values.shipDate = moment(values.shipDate).format(dateFormat);
    if (!values.recommendedBuild) {
      values.recommendedBuild = false;
    } else {
      values.recommendedBuild = true;
    }
    if (!values.projectManager) {
      values.projectManager = "";
    }
    values.wrd
      ? (values.wrd = moment(values.wrd).format(dateFormat))
      : (values.wrd = "");
    if (!values.configurationInformation) {
      values.configurationInformation = "";
    }
    if (!values.status) {
      values.status = "";
    }
    if (!values.devices) {
      values.devices = [];
    }
    values["owner"] = userData.USER_NAME;
    AddOrder(values);
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
      <DialogTitle id="simple-dialog-title">Add new order</DialogTitle>
      <DialogContent dividers className="addFormContainer">
        <Form
          form={addForm}
          name="dynamic_form_nest_item"
          autoComplete="off"
          onFinish={onFinish}
        >
          <div className="formRow">
            <div className="formItem">
              <span>General Order Number:</span>
              <Form.Item
                name="gon"
                noStyle
                rules={[{ required: true, message: "Please fill this field" }]}
              >
                <Input type="number" allowClear />
              </Form.Item>
            </div>
            <div className="formItem">
              <span>Project Name:</span>
              <Form.Item
                name="projectName"
                noStyle
                rules={[{ required: true, message: "Please fill this field" }]}
              >
                <Input allowClear />
              </Form.Item>
            </div>
          </div>
          <div className="formRow">
            <div className="formItem">
              <span>Ship Date:</span>
              <Form.Item
                name="shipDate"
                noStyle
                rules={[{ required: true, message: "Please fill this field" }]}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>
            </div>
            <div className="formItem">
              <span>Requested On-Site Date:</span>
              <Form.Item
                noStyle
                name="rosd"
                rules={[{ required: true, message: "Please fill this field" }]}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>
            </div>
          </div>
          <div className="formRow">
            <div className="formItem">
              <span>Project Manager:</span>
              <Form.Item noStyle name="projectManager">
                <Input allowClear />
              </Form.Item>
            </div>
            <div className="formItem">
              <span>Warehouse Requested Date:</span>
              <Form.Item name="wrd" noStyle>
                <DatePicker allowClear format={dateFormat} />
              </Form.Item>
            </div>
          </div>
          <div className="formRow">
            <div className="formItem" style={{ width: "100%", marginRight: 0 }}>
              <span>Device Count:</span>
              <Form.List name="devices">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space key={field.key} align="baseline">
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, curValues) =>
                            prevValues.devices !== curValues.devices
                          }
                        >
                          {() => (
                            <Form.Item
                              {...field}
                              label="Device"
                              name={[field.name, "device"]}
                              fieldKey={[field.fieldKey, "device"]}
                              rules={[
                                { required: true, message: "Missing device" },
                              ]}
                            >
                              <Select style={{ width: 130 }}>
                                {devicesList.map((item) => (
                                  <Option key={item} value={item}>
                                    {item}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="Qty"
                          name={[field.name, "quantity"]}
                          fieldKey={[field.fieldKey, "quantity"]}
                          rules={[
                            { required: true, message: "Missing Quantity" },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}
                    <Form.Item noStyle>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add product
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>
          <div className="formRow">
            <div className="formItem" style={{ width: "100%", marginRight: 0 }}>
              <span>Configuration Information:</span>
              <Form.Item noStyle name="configurationInformation">
                <TextArea rows={3} allowClear />
              </Form.Item>
            </div>
          </div>
          <div className="formRow">
            <div className="formItem" style={{ width: "100%", marginRight: 0 }}>
              <span>Status:</span>
              <Form.Item name="status" noStyle>
                <Select>
                  {statusList.map((key, i) => {
                    return (
                      <Option key={i} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="formRow">
            <Form.Item name="recommendedBuild" valuePropName="checked" noStyle>
              <Checkbox defaultChecked>Want a recommended build?</Checkbox>
            </Form.Item>
          </div>
        </Form>
      </DialogContent>
      <DialogActions>
        <MaterialButton
          autoFocus
          variant="contained"
          onClick={() => {
            setAddDialogVisibility(false);
          }}
        >
          CANCEL
        </MaterialButton>
        <MaterialButton
          startIcon={
            genericLoader ? (
              <CircularProgress size={15} color="inherit" />
            ) : null
          }
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
const DeleteConfirmDialog = React.memo(() => {
  const {
    DeleteOrder,
    workingOrderState,
    genericLoaderState,
    deleteDialogVisibilityState,
  } = useContext(InstallCartContext);
  const [workingOrder, setWorkingOrder] = workingOrderState;
  const [
    deleteDialogVisibility,
    setDeleteDialogVisibility,
  ] = deleteDialogVisibilityState;
  const [genericLoader] = genericLoaderState;
  return (
    <Dialog
      open={deleteDialogVisibility}
      onClose={() => {
        setDeleteDialogVisibility(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure to delete this item?
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ overflow: "hidden" }}
        >
          This action can't be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <MaterialButton
          onClick={() => {
            setDeleteDialogVisibility(false);
            setWorkingOrder({});
          }}
          color="primary"
        >
          Cancel
        </MaterialButton>
        <MaterialButton
          startIcon={
            genericLoader ? (
              <CircularProgress size={20} color="inherit" />
            ) : null
          }
          onClick={() => {
            DeleteOrder(workingOrder);
          }}
          color="primary"
          autoFocus
          variant="contained"
        >
          Ok
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
});
const EditDialog = React.memo(() => {
  const {
    EditOrder,
    editDialogVisibilityState,
    statusListState,
    workingOrderState,
    // devicesListState,
  } = useContext(InstallCartContext);
  // const [devicesList] = devicesListState;
  const [workingOrder, setWorkingOrder] = workingOrderState;
  const [editForm] = Form.useForm();
  editForm.resetFields();
  const dateFormat = "MM/DD/YYYY";
  const [statusList] = statusListState;
  const [
    editDialogVisibility,
    setEditDialogVisibility,
  ] = editDialogVisibilityState;
  editForm.setFieldsValue({
    gon: parseInt(workingOrder.GON),
    projectName: workingOrder.PROJECT_DESCRIPTION,
    shipDate: workingOrder.SHIP_DATE
      ? moment(workingOrder.SHIP_DATE, dateFormat)
      : null,
    rosd: workingOrder.ROSD ? moment(workingOrder.ROSD, dateFormat) : null,
    projectManager: workingOrder.PROJECT_MANAGER,
    wrd: workingOrder.WRD ? moment(workingOrder.WRD, dateFormat) : null,
    configurationInformation: workingOrder.CONFIGURATION_INFORMATION,
    status: workingOrder.STATUS,
  });
  const onFinish = (values) => {
    if (!values.rosd) {
      values.rosd = moment(values.rosd).format(dateFormat);
    } else {
      values.rosd = "";
    }
    if (!values.shipDate) {
      values.shipDate = moment(values.shipDate).format(dateFormat);
    } else {
      values.shipDate = "";
    }
    if (!values.recommendedBuild) {
      values.recommendedBuild = false;
    } else {
      values.recommendedBuild = true;
    }
    if (!values.projectManager) {
      values.projectManager = "";
    }
    values.wrd
      ? (values.wrd = moment(values.wrd).format(dateFormat))
      : (values.wrd = "");
    if (!values.configurationInformation) {
      values.configurationInformation = "";
    }
    if (!values.status) {
      values.status = "";
    }
    if (!values.devices) {
      values.devices = [];
    }
    values["id"] = workingOrder.ID;
    EditOrder(values);
  };
  return (
    <Dialog
      open={editDialogVisibility}
      scroll="body"
      onClose={() => {
        setEditDialogVisibility(false);
        setWorkingOrder({});
      }}
      style={{ zIndex: 2 }}
    >
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <Form form={editForm} onFinish={onFinish}>
          <div className="formRow">
            <div className="formItem">
              <span>General Order Number:</span>
              <Form.Item name="gon" noStyle>
                <Input type="number" allowClear />
              </Form.Item>
            </div>
            <div className="formItem">
              <span>Project Name:</span>
              <Form.Item name="projectName" noStyle>
                <Input allowClear />
              </Form.Item>
            </div>
          </div>
          <div className="formRow">
            <div className="formItem">
              <span>Ship Date:</span>
              <Form.Item name="shipDate" noStyle>
                <DatePicker allowClear format={dateFormat} />
              </Form.Item>
            </div>
            <div className="formItem">
              <span>Requested On-Site Date:</span>
              <Form.Item name="rosd" noStyle>
                <DatePicker allowClear format={dateFormat} />
              </Form.Item>
            </div>
          </div>
          <div className="formRow">
            <div className="formItem">
              <span>Project Manager:</span>
              <Form.Item name="projectManager" noStyle>
                <Input allowClear />
              </Form.Item>
            </div>
            <div className="formItem">
              <span>Warehouse Requested Date:</span>
              <Form.Item name="wrd" noStyle>
                <DatePicker allowClear format={dateFormat} />
              </Form.Item>
            </div>
          </div>
          {/* <div className="formRow">
            <div className="formItem" style={{ width: "100%", marginRight: 0 }}>
              {workingOrder.DEVICE_COUNT === null ||
              workingOrder.DEVICE_COUNT === "" ||
              workingOrder.DEVICE_COUNT === undefined ||
              !workingOrder.DEVICE_COUNT ||
              workingOrder.DEVICE_COUNT === "[]" ? null : (
                <Form.List name="devices2">
                  {() => (
                    <>
                      {JSON.parse(workingOrder.DEVICE_COUNT).map((key, i) => (
                        <Space key={i}>
                          <Form.Item
                            label="Device"
                            name="device"
                            fieldKey={[i, "device"]}
                          >
                            <Select
                              style={{ width: 130 }}
                              allowClear
                              defaultValue={key.device}
                            >
                              {devicesList.map((item) => (
                                <Option key={item} value={item}>
                                  {item}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            initialValue={key.qty}
                            label="Qty"
                            name="quantity"
                          >
                            <Input
                              type="number"
                              allowClear
                              defaultValue={key.quantity}
                            />
                          </Form.Item>
                        </Space>
                      ))}
                    </>
                  )}
                </Form.List>
              )}
              <Form.List name="devices">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space key={field.key} align="baseline">
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, curValues) =>
                            prevValues.devices !== curValues.devices
                          }
                        >
                          {() => (
                            <Form.Item
                              {...field}
                              label="Device"
                              name={[field.name, "device"]}
                              fieldKey={[field.fieldKey, "device"]}
                              rules={[
                                { required: true, message: "Missing device" },
                              ]}
                            >
                              <Select style={{ width: 130 }}>
                                {devicesList.map((item) => (
                                  <Option key={item} value={item}>
                                    {item}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="Qty"
                          name={[field.name, "quantity"]}
                          fieldKey={[field.fieldKey, "quantity"]}
                          rules={[
                            { required: true, message: "Missing Quantity" },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}
                    <Form.Item noStyle>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add product
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div> */}

          <div className="formRow">
            <div className="formItem" style={{ width: "100%", marginRight: 0 }}>
              <span>Configuration information:</span>
              <Form.Item name="configurationInformation" noStyle>
                <TextArea rows={3} allowClear />
              </Form.Item>
            </div>
          </div>
          <div className="formRow">
            <div className="formItem" style={{ marginRight: 0, width: "100%" }}>
              <span>Status:</span>
              <Form.Item name="status" noStyle>
                <Select>
                  {statusList.map((key, i) => {
                    return (
                      <Option key={i} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="formRow">
            <Form.Item name="recommendedBuild" valuePropName="checked" noStyle>
              <Checkbox defaultChecked>Want a recommended build?</Checkbox>
            </Form.Item>
          </div>
        </Form>
      </DialogContent>
      <DialogActions>
        <MaterialButton
          variant="contained"
          color="default"
          onClick={() => {
            setEditDialogVisibility(false);
            setWorkingOrder({});
          }}
        >
          Cancel
        </MaterialButton>
        <MaterialButton
          variant="contained"
          color="primary"
          onClick={() => {
            editForm.submit();
          }}
        >
          Update
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
});
export default Orders;
