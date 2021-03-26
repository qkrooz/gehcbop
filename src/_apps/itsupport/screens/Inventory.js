import React, { useState, useContext } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import { MemoryRouter as Router, Link, Switch, Route } from "react-router-dom";
import { Button, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { sectionTitles } from "../resources/sectionTitles";
import { index } from "../components/addForms";
import { indexAudit } from "../components/auditItems";
import { indexComments } from "../components/commentsForm";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import "../styles/inventory.css";
import "../styles/addForm.css";
import axios from "axios";
import { USELPUTIL02 } from "../../../_resources/serverRoutes";
// tables
import DesktopsTable from "../components/desktopsTable";
import LaptopsTable from "../components/laptopsTable";
import MobilesTable from "../components/mobilesTable";
import LabelPrintersTable from "../components/labelPrintersTable";
import LaserPrintersTable from "../components/laserPrintersTable";
import ReservedIpsTable from "../components/reservedIpsTable";
// add forms
const auditItems = (values) => {
  axios
    .post(`${USELPUTIL02}/itsupport/auditItem.php`, values)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};
const commentItems = (values) => {
  axios
    .post(`${USELPUTIL02}/itsupport/addComment.php`, values)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};
const addMultiple = (values) => {
  axios
    .post(`${USELPUTIL02}/itsupport/addMultipleItems.php`, values)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};
const addMultipleItems = (values) => {
  values.serviceTag = values.serviceTag
    .toUpperCase()
    .split("\n")
    .filter(String);
  let hostname = values.serviceTag.map((serviceTag) => "G" + serviceTag + "E");
  values.specs = JSON.stringify(values.specs);
  values.hostname = hostname;
  var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  values.ADDED = date;
  values.AUDITED = `{"status":"", "comments":""}`;
  const count = hostname.length;
  values.count = count;
  console.log(values);
  addMultiple(values);
};
const Inventory = React.memo(() => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [section, setSection] = useState("desktops");
  const {
    addDrawerVisibilityState,
    heightdiv,
    auditModalVisibilityState,
    inventoryAuditDataState,
    commentsDrawerVisibilityState,
    inventoryCommentsDataState,
    inventoryFormDataState,
  } = useContext(ItSupportContext);
  const [
    addDrawerVisibility,
    setAddDrawerVisibility,
  ] = addDrawerVisibilityState;
  const [
    auditModalVisibility,
    setAuditModalVisibility,
  ] = auditModalVisibilityState;
  const [
    commentsDrawerVisibility,
    setCommentsDrawerVisibility,
  ] = commentsDrawerVisibilityState;

  const [inventoryFormData, setInventoryFormData] = inventoryFormDataState;
  const [inventoryAuditData, setInventoryAuditData] = inventoryAuditDataState;
  const [
    inventoryCommentsData,
    setInventoryCommentsData,
  ] = inventoryCommentsDataState;

  const initialAuditValues = [
    { status: "good", comments: "" },
    { status: "good", comments: "" },
    { status: "good", comments: "" },
    { status: "good", comments: "" },
    { status: "good", comments: "" },
    { status: "good", comments: "" },
    { status: "good", comments: "" },
    { status: "good", comments: "" },
    { status: "good", comments: "" },
    { status: "good", comments: "" },
  ];
  return (
    <Router>
      <div className="inventoryMainContainer" style={{ flexGrow: 1 }}>
        <div className="dataNavigatorContainer">
          <Button
            startIcon={<MenuIcon />}
            variant="contained"
            disableElevation
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            {sectionTitles[section]}
          </Button>
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
                setAnchorEl(null);
                setSection("desktops");
              }}
            >
              <Link style={{ width: "100%", height: "100%" }} to="/">
                Desktops
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setSection("laptops");
              }}
            >
              <Link style={{ width: "100%", height: "100%" }} to="/laptops">
                Laptops
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setSection("mobiles");
              }}
            >
              <Link style={{ width: "100%", height: "100%" }} to="/mobiles">
                Mobiles
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setSection("laser_printers");
              }}
            >
              <Link
                style={{ width: "100%", height: "100%" }}
                to="/laserPrinters"
              >
                Laser Printers
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setSection("label_printers");
              }}
            >
              <Link
                style={{ width: "100%", height: "100%" }}
                to="/labelPrinters"
              >
                Label Printers
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setSection("reserved_ips");
              }}
            >
              <Link style={{ width: "100%", height: "100%" }} to="/reservedIps">
                Reserved Ip's
              </Link>
            </MenuItem>
          </Menu>
        </div>
        <div className="tableContainer" ref={heightdiv}>
          <Switch>
            <Route component={DesktopsTable} path="/" exact />
            <Route component={LaptopsTable} path="/laptops" />
            <Route component={MobilesTable} path="/mobiles" />
            <Route component={LabelPrintersTable} path="/labelPrinters" />
            <Route component={LaserPrintersTable} path="/laserPrinters" />
            <Route component={ReservedIpsTable} path="/reservedIps" />
          </Switch>
        </div>
        <Drawer
          size="sm"
          isOpen={addDrawerVisibility}
          placement="right"
          onClose={() => {
            setAddDrawerVisibility(!addDrawerVisibility);
          }}
          onOverlayClick={() => {
            setAddDrawerVisibility(false);
          }}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Add new {sectionTitles[section]} item</DrawerHeader>
              <DrawerBody>{index[section]}</DrawerBody>
              <DrawerFooter>
                <Button
                  mr={3}
                  onClick={() => {
                    setAddDrawerVisibility(!addDrawerVisibility);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    inventoryFormData.section = section;
                    addMultipleItems(inventoryFormData);
                    setAddDrawerVisibility(!addDrawerVisibility);
                  }}
                >
                  Add
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
        <Modal
          isOpen={auditModalVisibility}
          onClose={() => {
            setAuditModalVisibility(!auditModalVisibility);
            setInventoryAuditData(initialAuditValues);
          }}
          onOverlayClick={() => {
            setAuditModalVisibility(!auditModalVisibility);
            setInventoryAuditData(initialAuditValues);
          }}
          size="5xl"
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Audit {sectionTitles[section]}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{indexAudit[section]}</ModalBody>
            <ModalFooter>
              <Button
                mr={3}
                onClick={() => {
                  setAuditModalVisibility(!auditModalVisibility);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // console.log(inventoryAuditData);
                  inventoryAuditData.forEach((data) => {
                    let auditResult = { auditString: "", sn: "", section: "" };
                    auditResult.auditString = `{"status": "${data.status}","comments":"${data.comments}"}`;
                    auditResult.sn = data.serialnumber;
                    auditResult.section = section;
                    console.log(auditResult);
                    auditItems(auditResult);
                  });
                  setTimeout(() => {
                    setInventoryAuditData(initialAuditValues);
                  }, 1000);
                  setAuditModalVisibility(!auditModalVisibility);
                }}
              >
                Finish
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Drawer
          size="sm"
          isOpen={commentsDrawerVisibility}
          placement="right"
          onClose={() => {
            setCommentsDrawerVisibility(!commentsDrawerVisibility);
          }}
          onOverlayClick={() => {
            setCommentsDrawerVisibility(false);
          }}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                Add Comment | {sectionTitles[section]}{" "}
              </DrawerHeader>
              <DrawerBody>{indexComments[section]}</DrawerBody>
              <DrawerFooter>
                <Button
                  mr={3}
                  onClick={() => {
                    setCommentsDrawerVisibility(!commentsDrawerVisibility);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    let commentsInfo = { comment: "", section: "", sn: "" };
                    commentsInfo.comment = inventoryCommentsData.comment;
                    commentsInfo.sn = inventoryCommentsData.serialnumber;
                    commentsInfo.section = section;
                    commentItems(commentsInfo);
                    setCommentsDrawerVisibility(!commentsDrawerVisibility);
                  }}
                >
                  Add
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </div>
    </Router>
  );
});
export default Inventory;
