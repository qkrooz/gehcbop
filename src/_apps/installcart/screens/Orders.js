import React, { useContext, useState } from "react";
import { InstallCartContext } from "../resources/InstallCartContext";
import apiRoute from "../resources/apiRoute";
import { Context } from "../../../_context/MainContext";
import { Formik, useFormik, Form } from "formik";
import * as Yup from "yup";
import { Steps } from "antd";
import DateFnsUtils from "@date-io/date-fns";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleTwoTone,
} from "@ant-design/icons";
import {
  Paper,
  InputBase,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// icons
import PersonIcon from "@material-ui/icons/Person";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import Switch from "@material-ui/core/Switch";
import Collapse from "react-collapse";
import MaterialButton from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import "../styles/orders.css";
import "../styles/addForm.css";
import { CloudUpload } from "@material-ui/icons";
import axios from "axios";
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
      {/* <EditDialog /> */}
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
  let CART_RETURN = data.CART_RETURN ? data.CART_RETURN.date : null;
  let GON = data.GON;
  let PROJECT_DESCRIPTION = data.PROJECT_DESCRIPTION;
  let STATUS =
    data.STATUS === "manufacturing in-process"
      ? "Mfg in-process"
      : data.STATUS === "configuration/assembly"
      ? "Config/Assembly"
      : data.STATUS === "secure in staging space"
      ? "Staging"
      : data.STATUS;
  let ESTIMATED_CART_QTY = data.ESTIMATED_CART_QTY;
  let PACKAGE = data.PACKAGE;
  let FLAGGED_ON_CONFIG_APP = data.FLAGGED_ON_CONFIG_APP;
  let NTP_SUBMITTED = data.NTP_SUBMITTED;
  let PROJECT_MANAGER_CONTACT = data.PROJECT_MANAGER_CONTACT;
  let FE = data.FE;
  let OWNER = JSON.parse(data.OWNER);
  let CONFIGURATION_INFORMATION = data.CONFIGURATION_INFORMATION;
  // states
  const [detailsCollapse, setDetailsCollapse] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // context
  const {
    statusListState,
    workingOrderState,
    deleteDialogVisibilityState,
    editDialogVisibilityState,
  } = useContext(InstallCartContext);
  const [, setDeleteDialogVisibility] = deleteDialogVisibilityState;
  const [, setWorkingOrder] = workingOrderState;
  const [statusList] = statusListState;
  const [, setEditDialogVisibility] = editDialogVisibilityState;
  return (
    <div className="order-container-outter ">
      <div className="order-container-inner">
        <div className="primary-data-container">
          <Tooltip title="GON" placement="right">
            <span className="gon-label">{`#${GON}`}</span>
          </Tooltip>
          <span className="projName-label">{PROJECT_DESCRIPTION}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            {OWNER ? (
              <img
                src={`https://supportcentral.gecdn.com/images/person/temp/${
                  OWNER ? OWNER.SSO : null
                }.jpg`}
                alt="user-img"
                style={{
                  width: "2em",
                  height: "2em",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "0.5em",
                }}
              />
            ) : (
              <div
                style={{
                  width: "2em",
                  height: "2em",
                  borderRadius: "50%",
                  marginRight: "0.5em",
                  backgroundColor: "#e2e2e2",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PersonIcon style={{ color: "gray" }} />
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>{OWNER ? OWNER.NAME : null}</span>
              <span style={{ fontSize: "0.8em" }}>
                {CREATED_DATE
                  ? moment(CREATED_DATE).format("MM/DD/YYYY")
                  : "No date available"}
              </span>
            </div>
          </div>
        </div>
        <div style={{ marginRight: "2em" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5em",
              margin: "0.5em 0",
            }}
          >
            <div
              style={{
                width: "0.5em",
                height: "0.5em",
                backgroundColor: "#45b6fe",
                borderRadius: "50%",
                marginRight: "1em",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "2em",
                  position: "absolute",
                  width: "1px",
                  backgroundColor: "#e2e2e2",
                  left: "50%",
                  transform: `translate(${-1}px, ${0}px)`,
                  top: "0.7em",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "gray", fontSize: "0.7em" }}>
                Start date
              </span>
              <span
                style={{
                  borderLeft: "1px solid #e2e2e2",
                  paddingLeft: "0.5em",
                }}
              >
                {moment(START_DATE).format("MM/DD/YYYY")}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5em",
            }}
          >
            <div
              style={{
                width: "0.5em",
                height: "0.5em",
                backgroundColor: "#45b6fe",
                borderRadius: "50%",
                marginRight: "1em",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "2em",
                  position: "absolute",
                  width: "1px",
                  backgroundColor: "#e2e2e2",
                  left: "50%",
                  transform: `translate(${-1}px, ${0}px)`,
                  top: "0.7em",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "gray", fontSize: "0.7em" }}>
                Ship date
              </span>
              <span
                style={{
                  borderLeft: "1px solid #e2e2e2",
                  paddingLeft: "0.5em",
                }}
              >
                {moment(START_DATE).format("MM/DD/YYYY")}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "0.5em",
            }}
          >
            <div
              style={{
                width: "0.5em",
                height: "0.5em",
                backgroundColor: "#45b6fe",
                borderRadius: "50%",
                marginRight: "1em",
                position: "relative",
              }}
            ></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "gray",
                  fontSize: "0.7em",
                  whiteSpace: "nowrap",
                }}
              >
                Requested On-Site date
              </span>
              <span
                style={{
                  borderLeft: "1px solid #e2e2e2",
                  paddingLeft: "0.5em",
                }}
              >
                {moment(START_DATE).format("MM/DD/YYYY")}
              </span>
            </div>
          </div>
        </div>
        <div className="captions">
          {!CREATED_DATE ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span>Created date missing</span>
            </div>
          ) : null}
          {!CART_RETURN ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span>Cart return missing</span>
            </div>
          ) : null}
          {!FE ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span>FE missing</span>
            </div>
          ) : null}
          {!STATUS ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span>Status missing</span>
            </div>
          ) : null}
          {!CONFIGURATION_INFORMATION ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span>Configuration Information missing</span>
            </div>
          ) : null}
          {!PROJECT_MANAGER_CONTACT ? (
            <div className="caption-container">
              <ExclamationCircleTwoTone
                twoToneColor="#faca0f"
                style={{ fontSize: "18px", marginRight: "8px" }}
              />
              <span>Project Manager missing</span>
            </div>
          ) : null}
          <div style={{ marginTop: "auto", display: "flex" }}>
            <div className="timeMarkContainer">
              <span>FW LOB</span>
              <span>{FW_LOB}</span>
            </div>
            <div className="timeMarkContainer">
              <span>FW SLOT</span>
              <span>{FW_SLOT}</span>
            </div>
            <div className="timeMarkContainer">
              <span>MONTH</span>
              <span>{MONTH}</span>
            </div>
          </div>
        </div>
        <div className="controls">
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            <MenuItem
              onClick={() => {
                setEditDialogVisibility(true);
                setWorkingOrder(data);
                setAnchorEl(null);
              }}
            >
              <EditOutlined style={{ color: "gray", marginRight: "0.5em" }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setDeleteDialogVisibility(true);
                setWorkingOrder(data);
                setAnchorEl(null);
              }}
            >
              <DeleteOutlined style={{ color: "gray", marginRight: "0.5em" }} />
              Delete
            </MenuItem>
          </Menu>
          {data.STATUS === "order complete" ? null : (
            <IconButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
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
        <div
          style={{
            backgroundColor:
              STATUS === "cancelled"
                ? "#ed2939"
                : STATUS === "issue needs attention"
                ? "#FFD300"
                : STATUS === "order complete"
                ? "#228c22"
                : "#3792cb",
            width: "2em",
            alignSelf: "stretch",
            borderTopRightRadius: 5,
            borderBottomRightRadius: !detailsCollapse ? 5 : 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            className="statusLabel"
            style={{
              color:
                STATUS === "cancelled"
                  ? "white"
                  : STATUS === "issue needs attention"
                  ? "black"
                  : "#fafafa",
              fontWeight: STATUS === "bold" ? "white" : "normal",
            }}
          >
            {STATUS.charAt(0).toUpperCase() + STATUS.slice(1)}
          </p>
        </div>
      </div>
      <Collapse isOpened={detailsCollapse}>
        <div className="order-description">
          <div style={{ minWidth: 150 }}>
            <div className="description-container">
              <span>{PROJECT_DESCRIPTION}</span>
              <span>Project description</span>
            </div>
            <div className="description-container">
              <span>{GON}</span>
              <span>GON</span>
            </div>
            <div className="description-container">
              <span>{OWNER ? `${OWNER.NAME} (${OWNER.SSO})` : "NADA"}</span>
              <span>Owner</span>
            </div>
            <div className="description-container">
              <span>
                {CREATED_DATE ? (
                  moment(CREATED_DATE).format("MM/DD/YYYY")
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ExclamationCircleTwoTone />
                    <span
                      style={{
                        marginLeft: "0.5em",
                        fontSize: "0.8em",
                        color: "gray",
                      }}
                    >
                      Missing
                    </span>
                  </div>
                )}
              </span>
              <span>Created date</span>
            </div>
            <div className="description-container">
              <span>{FW_SLOT}</span>
              <span>FW Slot</span>
            </div>
            <div className="description-container">
              <span>{FW_LOB}</span>
              <span>FW Lob</span>
            </div>
            <div className="description-container">
              <span>{MONTH}</span>
              <span>Month</span>
            </div>
            <div className="description-container">
              <span>
                {START_DATE ? (
                  moment(START_DATE).format("MMMM Do YYYY")
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ExclamationCircleTwoTone />
                    <span
                      style={{
                        marginLeft: "0.5em",
                        fontSize: "0.8em",
                        color: "gray",
                      }}
                    >
                      Missing
                    </span>
                  </div>
                )}
              </span>
              <span>Start date</span>
            </div>
            <div className="description-container">
              <span>
                {SHIP_DATE ? (
                  moment(SHIP_DATE).format("MMMM Do YYYY")
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ExclamationCircleTwoTone />
                    <span
                      style={{
                        marginLeft: "0.5em",
                        fontSize: "0.8em",
                        color: "gray",
                      }}
                    >
                      Missing
                    </span>
                  </div>
                )}
              </span>
              <span>Ship date</span>
            </div>
            <div className="description-container">
              <span>
                {ROSD ? (
                  moment(ROSD).format("MMMM Do YYYY")
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ExclamationCircleTwoTone />
                    <span
                      style={{
                        marginLeft: "0.5em",
                        fontSize: "0.8em",
                        color: "gray",
                      }}
                    >
                      Missing
                    </span>
                  </div>
                )}
              </span>
              <span>ROSD</span>
            </div>
            <div className="description-container">
              <span>{STATUS.charAt(0).toUpperCase() + STATUS.slice(1)}</span>
              <span>Status</span>
            </div>
          </div>
          <div style={{ flexGrow: 1, paddingLeft: "2em" }}>
            <table className="seccondary-description-table">
              <tbody>
                <tr className="table-head-title">
                  <td style={{ padding: "0.5em" }}>Project Manager Contact</td>
                  <td className="table-desc-content" width="60%">
                    {PROJECT_MANAGER_CONTACT ? (
                      PROJECT_MANAGER_CONTACT
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ExclamationCircleTwoTone />
                        <span
                          style={{
                            marginLeft: "0.5em",
                            fontSize: "0.8em",
                            color: "gray",
                          }}
                        >
                          Missing
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
                <tr className="table-head-title">
                  <td style={{ padding: "0.5em" }}>FE</td>
                  <td className="table-desc-content" width="60%">
                    {FE ? (
                      FE
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ExclamationCircleTwoTone />
                        <span
                          style={{
                            marginLeft: "0.5em",
                            fontSize: "0.8em",
                            color: "gray",
                          }}
                        >
                          Missing
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
                <tr className="table-head-title">
                  <td style={{ padding: "0.5em" }}>Package</td>
                  <td className="table-desc-content" width="60%">
                    {PACKAGE ? (
                      PACKAGE
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ExclamationCircleTwoTone />
                        <span
                          style={{
                            marginLeft: "0.5em",
                            fontSize: "0.8em",
                            color: "gray",
                          }}
                        >
                          Missing
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
                <tr className="table-head-title">
                  <td style={{ padding: "0.5em" }}>Flagged on config app</td>
                  <td className="table-desc-content" width="60%">
                    {FLAGGED_ON_CONFIG_APP ? "Yes" : "No"}
                  </td>
                </tr>
                <tr className="table-head-title">
                  <td style={{ padding: "0.5em" }}>NTP Submitted</td>
                  <td className="table-desc-content" width="60%">
                    {NTP_SUBMITTED ? "Yes" : "No"}
                  </td>
                </tr>
                <tr className="table-head-title">
                  <td style={{ padding: "0.5em" }}>Estimated Cart Qty</td>
                  <td className="table-desc-content" width="60%">
                    {ESTIMATED_CART_QTY ? (
                      parseFloat(ESTIMATED_CART_QTY).toFixed(2)
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ExclamationCircleTwoTone />
                        <span
                          style={{
                            marginLeft: "0.5em",
                            fontSize: "0.8em",
                            color: "gray",
                          }}
                        >
                          Missing
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
                <tr className="table-head-title">
                  <td style={{ padding: "0.5em" }}>Cart Return</td>
                  <td className="table-desc-content" width="60%">
                    {CART_RETURN ? (
                      moment(CART_RETURN).format("MMMM Do YYYY")
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ExclamationCircleTwoTone />
                        <span
                          style={{
                            marginLeft: "0.5em",
                            fontSize: "0.8em",
                            color: "gray",
                          }}
                        >
                          Missing
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
                <tr className="table-head-title">
                  <td style={{ padding: "0.5em" }}>Device Count</td>
                  <td className="table-desc-content" width="60%">
                    {DEVICE_COUNT ? (
                      parseInt(DEVICE_COUNT)
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ExclamationCircleTwoTone />
                        <span
                          style={{
                            marginLeft: "0.5em",
                            fontSize: "0.8em",
                            color: "gray",
                          }}
                        >
                          Missing
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="seccondary-description-table">
              <tbody>
                <tr className="table-head-title" style={{ borderTop: "none" }}>
                  <td>Configuration Information</td>
                </tr>
                <tr>
                  <td
                    className="table-desc-content"
                    style={{
                      border: "1px solid #e2e2e2",
                      maxHeight: 200,
                      overflowY: "auto",
                      whiteSpace: "pre-wrap",
                      maxWidth: 20,
                    }}
                  >
                    {CONFIGURATION_INFORMATION ? (
                      <div style={{ height: 200 }}>
                        <p>{CONFIGURATION_INFORMATION}</p>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ExclamationCircleTwoTone />
                        <span
                          style={{
                            marginLeft: "0.5em",
                            fontSize: "0.8em",
                            color: "gray",
                          }}
                        >
                          Missing
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="order-trace">
          <Steps
            progressDot
            current={statusList.findIndex((item) => item === data.STATUS)}
            direction="vertical"
            size="small"
            status={
              STATUS === "cancelled" || data.STATUS === "issue needs attention"
                ? "error"
                : STATUS === "order complete"
                ? "finish"
                : "process"
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
});
const AddDialog = React.memo(() => {
  const [file, setFile] = useState();
  const { userDataState } = useContext(Context);
  const {
    AddOrder,
    addDialogVisibilityState,
    statusListState,
    devicesListState,
    genericLoaderState,
  } = useContext(InstallCartContext);
  const [userData] = userDataState;
  const [, setGenericLoader] = genericLoaderState;
  const [
    addDialogVisibility,
    setAddDialogVisibility,
  ] = addDialogVisibilityState;
  const [statusList] = statusListState;
  const [devicesList] = devicesListState;
  const validationSchema = Yup.object().shape({
    PROJECT_DESCRIPTION: Yup.string().required(),
    STATUS: Yup.string().required(),
  });
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        START_DATE: moment(new Date()).format("YYYY-MM-DD"),
        PID: "",
        GON: "",
        CART_RETURN: moment(new Date()).format("YYYY-MM-DD"),
        ROSD: moment(new Date()).format("YYYY-MM-DD"),
        SHIP_DATE: moment(new Date()).format("YYYY-MM-DD"),
        PROJECT_DESCRIPTION: "",
        DEVICE_COUNT: "",
        ESTIMATED_CART_QTY: "",
        PACKAGE: "",
        FLAGGED_ON_CONFIG_APP: false,
        NTP_SUBMITTED: false,
        PROJECT_MANAGER_CONTACT: "",
        FE: "",
        STATUS: "",
        CONFIGURATION_INFORMATION: "",
      }}
      // validationSchema={ValidationSchema}
      onSubmit={(values) => {
        setGenericLoader(true);
        values.HAS_FILE = file ? true : false;
        values.OWNER = { SSO: userData.SSO, NAME: userData.USER_NAME };
        const formData = new FormData();
        formData.append("data", JSON.stringify(values));
        formData.append("file", file);
        console.log(values);
        axios
          .post(`${apiRoute}/addNewOrder.php`, formData, {
            headers: { "Content-type": "multipart/form-data" },
          })
          .then(({ data }) => {
            console.log(data);
            data.code === 200
              ? AddOrder(data.lastItem)
              : setGenericLoader(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }}
    >
      {({ errors, values, handleChange }) => (
        <Dialog
          open={addDialogVisibility}
          scroll="body"
          onClose={() => {
            setAddDialogVisibility(false);
          }}
          style={{ zIndex: 2 }}
        >
          <DialogTitle id="simple-dialog-title">Add new order</DialogTitle>
          <DialogContent dividers>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Form id="addForm">
                <div style={{ display: "flex", marginBottom: "1em" }}>
                  <TextField
                    label="Start Date"
                    type="date"
                    name="START_DATE"
                    defaultValue={values.START_DATE}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ marginRight: "1em" }}
                  />
                  <TextField
                    label="Ship Date"
                    type="date"
                    name="SHIP_DATE"
                    defaultValue={values.SHIP_DATE}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ marginRight: "1em" }}
                  />
                  <TextField
                    label="ROSD"
                    type="date"
                    name="ROSD"
                    defaultValue={values.ROSD}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <TextField
                    label="Cart Return"
                    type="date"
                    name="CART_RETURN"
                    defaultValue={values.CART_RETURN}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={errors.GON}
                    style={{ marginRight: "1em", marginBottom: "1em" }}
                  />
                  <TextField
                    label="General Order Number"
                    name="GON"
                    error={Boolean(errors.GON)}
                    helperText={errors.GON ? "Required" : null}
                    type="number"
                    style={{ marginRight: "1em", marginBottom: "1em" }}
                    value={values.GON}
                    onChange={handleChange}
                  />
                  <TextField
                    label="PID"
                    name="PID"
                    type="number"
                    value={values.PID}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: "flex", marginBottom: "1em" }}>
                  <TextField
                    label="Project description"
                    style={{ marginRight: "1em" }}
                    name="PROJECT_DESCRIPTION"
                    value={values.PROJECT_DESCRIPTION}
                    onChange={handleChange}
                    error={Boolean(errors.PROJECT_DESCRIPTION)}
                  />
                  <TextField
                    label="Device Count"
                    type="number"
                    name="DEVICE_COUNT"
                    value={values.DEVICE_COUNT}
                    onChange={handleChange}
                    style={{ marginRight: "1em" }}
                  />
                  <TextField
                    label="Estimated cart qty"
                    name="ESTIMATED_CART_QTY"
                    value={values.ESTIMATED_CART_QTY}
                    onChange={handleChange}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "1em",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    select
                    label="Package"
                    onChange={handleChange}
                    name="PACKAGE"
                    value={values.PACKAGE}
                    style={{ width: "12em", marginRight: "1em" }}
                  >
                    <MenuItem value="configuration">Configuration</MenuItem>
                    <MenuItem value="standard">Standard</MenuItem>
                    <MenuItem value="N/A">N/A</MenuItem>
                  </TextField>
                  <FormControlLabel
                    label="Flagged on config app"
                    control={
                      <Checkbox
                        checked={values.FLAGGED_ON_CONFIG_APP}
                        onChange={handleChange}
                        name="FLAGGED_ON_CONFIG_APP"
                      />
                    }
                  />
                  <FormControlLabel
                    label="NTP Submitted"
                    control={
                      <Checkbox
                        checked={values.NTP_SUBMITTED}
                        onChange={handleChange}
                        name="NTP_SUBMITTED"
                      />
                    }
                  />
                </div>
                <div style={{ display: "flex", marginBottom: "1em" }}>
                  <TextField
                    name="PROJECT_MANAGER_CONTACT"
                    value={values.PROJECT_MANAGER_CONTACT}
                    onChange={handleChange}
                    label="Project Manager"
                    style={{ marginRight: "1em" }}
                  />
                  <TextField
                    name="FE"
                    value={values.FE}
                    onChange={handleChange}
                    label="FE"
                    style={{ marginRight: "1em" }}
                  />
                  <TextField
                    name="STATUS"
                    value={values.STATUS}
                    onChange={handleChange}
                    label="Status"
                    select
                    style={{ flexGrow: 1 }}
                    error={Boolean(errors.STATUS)}
                  >
                    <MenuItem value="none" disabled>
                      Status
                    </MenuItem>
                    {statusList.map((key, i) => (
                      <MenuItem
                        style={{ textTransform: "capitalize" }}
                        value={key}
                        key={i}
                      >
                        {key}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div style={{ marginBottom: "1em" }}>
                  <TextField
                    multiline
                    variant="outlined"
                    style={{ width: "100%" }}
                    name="CONFIGURATION_INFORMATION"
                    value={values.CONFIGURATION_INFORMATION}
                    onChange={handleChange}
                    placeholder="Configuration information"
                    rows={4}
                    rowsMax={6}
                  />
                </div>
                <div>
                  <Button
                    variant="contained"
                    disableElevation
                    startIcon={<CloudUpload />}
                    component="label"
                    type="button"
                  >
                    Upload File
                    <input
                      hidden
                      type="file"
                      name="FILE"
                      onChange={(e) => setFile(e.target.files[0])}
                      onClick={(event) => {
                        event.target.value = null;
                      }}
                    />
                  </Button>
                  <span
                    style={{
                      fontSize: "1.2em",
                      fontWeight: "bold",
                      marginLeft: "1em",
                    }}
                  >
                    {file ? file.name : null}
                  </span>
                </div>
              </Form>
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <MaterialButton
              color="primary"
              onClick={() => {
                setAddDialogVisibility(false);
              }}
            >
              Cancel
            </MaterialButton>
            <MaterialButton
              variant="contained"
              color="primary"
              type="submit"
              form="addForm"
            >
              Add
            </MaterialButton>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
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
// const EditDialog = React.memo(() => {
//   const {
//     EditOrder,
//     editDialogVisibilityState,
//     statusListState,
//     workingOrderState,
//     // devicesListState,
//   } = useContext(InstallCartContext);
//   // const [devicesList] = devicesListState;
//   const [workingOrder, setWorkingOrder] = workingOrderState;
//   const [editForm] = Form.useForm();
//   editForm.resetFields();
//   const dateFormat = "MM/DD/YYYY";
//   const [statusList] = statusListState;
//   const [
//     editDialogVisibility,
//     setEditDialogVisibility,
//   ] = editDialogVisibilityState;
//   editForm.setFieldsValue({
//     gon: parseInt(workingOrder.GON),
//     projectName: workingOrder.PROJECT_DESCRIPTION,
//     shipDate: workingOrder.SHIP_DATE
//       ? moment(workingOrder.SHIP_DATE, dateFormat)
//       : null,
//     rosd: workingOrder.ROSD ? moment(workingOrder.ROSD, dateFormat) : null,
//     projectManager: workingOrder.PROJECT_MANAGER,
//     wrd: workingOrder.WRD ? moment(workingOrder.WRD, dateFormat) : null,
//     configurationInformation: workingOrder.CONFIGURATION_INFORMATION,
//     status: workingOrder.STATUS,
//   });
//   const onFinish = (values) => {
//     if (!values.rosd) {
//       values.rosd = moment(values.rosd).format(dateFormat);
//     } else {
//       values.rosd = "";
//     }
//     if (!values.shipDate) {
//       values.shipDate = moment(values.shipDate).format(dateFormat);
//     } else {
//       values.shipDate = "";
//     }
//     if (!values.recommendedBuild) {
//       values.recommendedBuild = false;
//     } else {
//       values.recommendedBuild = true;
//     }
//     if (!values.projectManager) {
//       values.projectManager = "";
//     }
//     values.wrd
//       ? (values.wrd = moment(values.wrd).format(dateFormat))
//       : (values.wrd = "");
//     if (!values.configurationInformation) {
//       values.configurationInformation = "";
//     }
//     if (!values.status) {
//       values.status = "";
//     }
//     if (!values.devices) {
//       values.devices = [];
//     }
//     values["id"] = workingOrder.ID;
//     EditOrder(values);
//   };
//   return (
//     <Dialog
//       open={editDialogVisibility}
//       scroll="body"
//       onClose={() => {
//         setEditDialogVisibility(false);
//         setWorkingOrder({});
//       }}
//       style={{ zIndex: 2 }}
//     >
//       <DialogTitle>Edit Item</DialogTitle>
//       <DialogContent>
//         <Form form={editForm} onFinish={onFinish}>
//           <div className="formRow">
//             <div className="formItem">
//               <span>General Order Number:</span>
//               <Form.Item name="gon" noStyle>
//                 <Input type="number" allowClear />
//               </Form.Item>
//             </div>
//             <div className="formItem">
//               <span>Project Name:</span>
//               <Form.Item name="projectName" noStyle>
//                 <Input allowClear />
//               </Form.Item>
//             </div>
//           </div>
//           <div className="formRow">
//             <div className="formItem">
//               <span>Ship Date:</span>
//               <Form.Item name="shipDate" noStyle>
//                 <DatePicker allowClear format={dateFormat} />
//               </Form.Item>
//             </div>
//             <div className="formItem">
//               <span>Requested On-Site Date:</span>
//               <Form.Item name="rosd" noStyle>
//                 <DatePicker allowClear format={dateFormat} />
//               </Form.Item>
//             </div>
//           </div>
//           <div className="formRow">
//             <div className="formItem">
//               <span>Project Manager:</span>
//               <Form.Item name="projectManager" noStyle>
//                 <Input allowClear />
//               </Form.Item>
//             </div>
//             <div className="formItem">
//               <span>Warehouse Requested Date:</span>
//               <Form.Item name="wrd" noStyle>
//                 <DatePicker allowClear format={dateFormat} />
//               </Form.Item>
//             </div>
//           </div>
//           <div className="formRow">
//             <div className="formItem" style={{ width: "100%", marginRight: 0 }}>
//               <span>Configuration information:</span>
//               <Form.Item name="configurationInformation" noStyle>
//                 <TextArea rows={3} allowClear />
//               </Form.Item>
//             </div>
//           </div>
//           <div className="formRow">
//             <div className="formItem" style={{ marginRight: 0, width: "100%" }}>
//               <span>Status:</span>
//               <Form.Item name="status" noStyle>
//                 <Select>
//                   {statusList.map((key, i) => {
//                     return (
//                       <Option key={i} value={key}>
//                         {key.charAt(0).toUpperCase() + key.slice(1)}
//                       </Option>
//                     );
//                   })}
//                 </Select>
//               </Form.Item>
//             </div>
//           </div>
//           <div className="formRow">
//             <Form.Item name="recommendedBuild" valuePropName="checked" noStyle>
//               <Checkbox defaultChecked>Want a recommended build?</Checkbox>
//             </Form.Item>
//           </div>
//         </Form>
//       </DialogContent>
//       <DialogActions>
//         <MaterialButton
//           variant="contained"
//           color="default"
//           onClick={() => {
//             setEditDialogVisibility(false);
//             setWorkingOrder({});
//           }}
//         >
//           Cancel
//         </MaterialButton>
//         <MaterialButton
//           variant="contained"
//           color="primary"
//           onClick={() => {
//             editForm.submit();
//           }}
//         >
//           Update
//         </MaterialButton>
//       </DialogActions>
//     </Dialog>
//   );
// });
export default Orders;
