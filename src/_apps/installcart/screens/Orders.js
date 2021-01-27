import React, { useContext, useState } from "react";
import { InstallCartContext } from "../resources/InstallCartContext";
import {
  Menu,
  Button,
  Tooltip,
  Progress,
  Dropdown,
  Descriptions,
  Steps,
  Input,
  DatePicker,
  Select,
  Form,
  Space,
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
import { Formik } from "formik";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Switch from "@material-ui/core/Switch";
import Collapse from "react-collapse";
import MaterialButton from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { useFormik } from "formik";
import * as Yup from "yup";
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
const Orders = React.memo(() => {
  const {
    ordersState,
    SwitchOrders,
    ordersSwitchState,
    ordersCheckboxState,
    SearchOrders,
    ToggleComplete,
    addDialogVisibilityState,
  } = useContext(InstallCartContext);
  const [orders] = ordersState;
  const [ordersCheckbox] = ordersCheckboxState;
  const [ordersSwitch] = ordersSwitchState;
  const [searchText_temp, setSearchText_temp] = useState("");
  const [, setAddDialogVisibility] = addDialogVisibilityState;
  return (
    <div className="ordersMainContainer">
      <div className="ordersContainer">
        <div className="ordersList">
          <div className="ordersControls">
            <div>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <SearchIcon />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="Search orders"
                    size="small"
                    onChange={(event) => {
                      SearchOrders(event);
                      setSearchText_temp(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </div>
            <MaterialButton className="filterButton" startIcon={<SortIcon />}>
              Filters
            </MaterialButton>
            <div className="switchContainer">
              <div className="inner">
                <span>Show complete</span>
                <Switch
                  size="small"
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
                  size="small"
                  checked={ordersCheckbox}
                  onChange={(event) => ToggleComplete(event.target.checked)}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </div>
            </div>
            <MaterialButton
              variant="contained"
              color="primary"
              disableElevation
              startIcon={<AddIcon />}
              onClick={() => {
                setAddDialogVisibility(true);
              }}
            >
              Add Order
            </MaterialButton>
          </div>
          {Object.values(orders).map((order, i) => (
            <OrderElement data={order} key={i} />
          ))}
        </div>
      </div>
      <div className="chartsContainer">
        <OrdersChart />
        <CartsChart />
        <OrdersTotalChart />
      </div>
      <AddDialog />
      <DeleteConfirmDialog />
    </div>
  );
});
const OrderElement = ({ data }) => {
  const {
    statusListState,
    workingOrderState,
    deleteDialogVisibilityState,
  } = useContext(InstallCartContext);
  const [, setDeleteDialogVisibility] = deleteDialogVisibilityState;
  const [, setWorkingOrder] = workingOrderState;
  const [statusList] = statusListState;
  const [detailsCollapse, setDetailsCollapse] = useState(false);
  const [coninfCollapse, setConinfCollapse] = useState(false);
  const ellipsisMenu = (
    <Menu>
      <Menu.Item key="0">
        <Button type="text" onClick={() => {}}>
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
        <Button style={{ marginRight: "1.5em" }} shape="circle" size="large">
          <FileTextOutlined />
        </Button>
        <div className="primary-data-container">
          <Tooltip title="Project name" placement="right">
            <span className="projName-label">{data.PROJECT_NAME}</span>
          </Tooltip>
          <Tooltip title="General order number" placement="right">
            <span className="gon-inner-label">GON#</span>
            <span className="gon-label">{data.GON}</span>
          </Tooltip>
        </div>
        <div className="fw-container">
          <span className="desc">Fiscal Week</span>
          <span className="fw-label">{data.FW}</span>
        </div>
        <div className="dates-container">
          <span className="desc">Ship Date</span>
          <span className="date">{data.SHIP_DATE}</span>
          <span className="desc">Requested On-Site Date</span>
          <span className="date">{data.ROSD}</span>
        </div>
        <div className="extra-info-container">
          <span className="desc">Created Date</span>
          <span className="date">{data.CREATED_DATE}</span>
          <span className="desc">Owner</span>
          <span className="date">{data.OWNER}</span>
        </div>
        <div className="captions">
          {!data.STATUS ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span className="caption-desc">Status missing</span>
            </div>
          ) : null}
          {!data.CONFIGURATION_INFORMATION ? (
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
          {!data.WRD ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span className="caption-desc">
                Warehouse Requested Date missing
              </span>
            </div>
          ) : null}
          {!data.PROJECT_MANAGER ? (
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
            type="circle"
            percent={
              data.STATUS === "under review"
                ? 1
                : data.STATUS === "project queued"
                ? 12.5
                : data.STATUS === "mfg in process"
                ? 25
                : data.STATUS === "secure in staging space"
                ? 37.5
                : data.STATUS === "install cart config"
                ? 50
                : data.STATUS === "cart ready to ship"
                ? 62.5
                : data.STATUS === "arrived on site"
                ? 75
                : data.STATUS === "in transit"
                ? 87.5
                : data.STATUS === "order completed"
                ? 100
                : data.STATUS === "issue needs review"
                ? 100
                : data.STATUS === ""
                ? 0
                : null
            }
            status={
              data.STATUS === "issue needs review"
                ? "exception"
                : data.STATUS === "order completed"
                ? "success"
                : null
            }
            width={70}
            strokeLinecap="square"
            style={{ marginBottom: 10 }}
          ></Progress>
          {data.STATUS ? (
            <Tooltip title="Status" placement="right">
              <span className="status-label">{data.STATUS}</span>
            </Tooltip>
          ) : null}
        </div>
        <div className="controls">
          {data.STATUS === "order completed" ? null : (
            <Dropdown trigger={["click"]} overlay={ellipsisMenu}>
              <Button type="text" className="order-icon">
                <EllipsisOutlined className="button-icon" />
              </Button>
            </Dropdown>
          )}
          <Button
            type="text"
            className="order-icon"
            style={
              data.STATUS === "order completed" ? { marginTop: "auto" } : null
            }
            onClick={() => {
              setDetailsCollapse(!detailsCollapse);
            }}
          >
            {detailsCollapse ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </Button>
        </div>
      </div>
      <Collapse isOpened={detailsCollapse}>
        <div className="order-description">
          <Descriptions
            bordered
            style={{ marginRight: "1em", marginBottom: "1em" }}
          >
            <Descriptions.Item span={3} label="Project Name">
              {data.PROJECT_NAME}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="General Order Number">
              {data.GON}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Owner">
              {data.OWNER}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Project Manager">
              {data.PROJECT_MANAGER !== "" ? (
                data.PROJECT_MANAGER
              ) : (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <ExclamationCircleTwoTone
                    twoToneColor="#faca0f"
                    style={{ fontSize: "18px", marginRight: "8px" }}
                  />
                  Missing
                </span>
              )}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Fiscal Week">
              {data.FW}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Created Date">
              {data.CREATED_DATE}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Ship Date">
              {data.SHIP_DATE}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Requested On-Site Date">
              {data.ROSD}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Warehouse Requested Date">
              {data.WRD !== "" ? (
                data.WRD
              ) : (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <ExclamationCircleTwoTone
                    twoToneColor="#faca0f"
                    style={{ fontSize: "18px", marginRight: "8px" }}
                  />
                  Missing
                </span>
              )}
            </Descriptions.Item>
          </Descriptions>
          <div className="seccond-desc-container">
            <Descriptions bordered column={4} style={{ marginBottom: "1em" }}>
              <Descriptions.Item
                span={2}
                label="Status"
                style={{ textTransform: "capitalize" }}
              >
                {data.STATUS !== "" ? (
                  data.STATUS
                ) : (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <ExclamationCircleTwoTone
                      twoToneColor="#faca0f"
                      style={{ fontSize: "18px", marginRight: "8px" }}
                    />
                    Missing
                  </span>
                )}
              </Descriptions.Item>
              <Descriptions.Item span={2} label="Cart Usage">
                {/* {cartUsage[0].cartUsage} */}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions bordered column={4}>
              <Descriptions.Item
                span={4}
                label="Device Count"
                style={{ padding: 0 }}
              >
                {/* <Table
                    pagination={false}
                    size="small"
                    dataSource={deviceCountData}
                    columns={deviceCountColumns}
                  /> */}
              </Descriptions.Item>
              <Descriptions.Item
                span={4}
                label="Recommended Build"
                style={{ padding: 0 }}
              >
                {/* <Table
                    pagination={false}
                    size="small"
                    columns={recommendedCartBuildColumns}
                    dataSource={recomendedCartBuildData}
                  /> */}
              </Descriptions.Item>
              <Descriptions.Item
                span={4}
                label="Configuration Information"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {data.CONFIGURATION_INFORMATION === "" ? (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <ExclamationCircleTwoTone
                      twoToneColor="#faca0f"
                      style={{ fontSize: "18px", marginRight: "8px" }}
                    />
                    Missing
                  </span>
                ) : data.CONFIGURATION_INFORMATION.length > 200 ? (
                  <>
                    {!coninfCollapse ? (
                      <div className="large-coninf-retro">
                        <div className="retro-style"></div>
                        <span className="coninf-content">
                          {data.CONFIGURATION_INFORMATION.substring(0, 100) +
                            ". . ."}
                        </span>
                      </div>
                    ) : null}
                    <Collapse
                      isOpened={coninfCollapse}
                      className="coninf-collapse"
                    >
                      <span className="coninf-content">
                        {data.CONFIGURATION_INFORMATION}
                      </span>
                    </Collapse>
                    <Button
                      type="link"
                      style={{ width: "100%" }}
                      onClick={() => {
                        setConinfCollapse(!coninfCollapse);
                      }}
                    >
                      {!coninfCollapse ? (
                        <CaretDownOutlined />
                      ) : (
                        <CaretUpOutlined />
                      )}
                    </Button>
                  </>
                ) : (
                  <span className="coninf-content">
                    {data.CONFIGURATION_INFORMATION}
                  </span>
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
        <div className="order-trace">
          <Steps
            progressDot
            current={
              data.STATUS === "under review"
                ? 1
                : data.STATUS === "project queue"
                ? 2
                : data.STATUS === "mfg in process"
                ? 3
                : data.STATUS === "secure in staging space"
                ? 4
                : data.STATUS === "install cart config"
                ? 5
                : data.STATUS === "cart ready to ship"
                ? 6
                : data.STATUS === "arrived on site"
                ? 7
                : data.STATUS === "in transit"
                ? 8
                : data.STATUS === "order completed"
                ? 9
                : null
            }
            direction="vertical"
            size="small"
            status={
              data.STATUS === "issue needs review"
                ? "error"
                : data.STATUS === "order completed"
                ? "finish"
                : null
            }
          >
            {Object.values(statusList).map((key, i) => (
              <Step
                key={i}
                title={key.replace(/\w\S*/g, (w) =>
                  w.replace(/^\w/, (c) => c.toUpperCase())
                )}
              />
            ))}
          </Steps>
        </div>
      </Collapse>
    </div>
  );
};

const AddDialog = () => {
  const {
    AddOrder,
    addDialogVisibilityState,
    statusListState,
    devicesListState,
  } = useContext(InstallCartContext);
  const [
    addDialogVisibility,
    setAddDialogVisibility,
  ] = addDialogVisibilityState;
  const [statusList] = statusListState;
  const [devicesList] = devicesListState;
  const { Option } = Select;
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  const addForm = Form.useForm();
  const products = ["B450", "B650", "B850"];
  const formik = useFormik({});
  return (
    <Dialog
      open={addDialogVisibility}
      scroll="paper"
      onClose={() => {
        setAddDialogVisibility(false);
      }}
      style={{ zIndex: 2 }}
      onSubmit={formik.handleSubmit}
    >
      <DialogTitle id="simple-dialog-title">Add new order</DialogTitle>
      <DialogContent dividers className="addFormContainer"></DialogContent>
      <DialogActions>
        <MaterialButton
          disableElevation
          onClick={() => {
            setAddDialogVisibility(false);
          }}
        >
          Cancel
        </MaterialButton>
        <MaterialButton
          type="submit"
          disableElevation
          variant="contained"
          color="primary"
        >
          Add
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
};
const DeleteConfirmDialog = () => {
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
        {"Are you sure to delete this item?"}
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
};
export default Orders;
