import React, { useState, useContext } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import { MemoryRouter as Router, Link, Switch, Route } from "react-router-dom";
import { Button, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { sectionTitles } from "../resources/sectionTitles";
import { index } from "../components/addForms";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import "../styles/inventory.css";
import "../styles/addForm.css";
// tables
import DesktopsTable from "../components/desktopsTable";
import LaptopsTable from "../components/laptopsTable";
import MobilesTable from "../components/mobilesTable";
import LabelPrintersTable from "../components/labelPrintersTable";
import LaserPrintersTable from "../components/laserPrintersTable";
import ReservedIpsTable from "../components/reservedIpsTable";
// add forms

const Inventory = React.memo(() => {
  const { addDrawerVisibilityState } = useContext(ItSupportContext);
  const [
    addDrawerVisibility,
    setAddDrawerVisibility,
  ] = addDrawerVisibilityState;
  const [anchorEl, setAnchorEl] = useState(null);
  const [section, setSection] = useState("desktops");
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
                setSection("laserPrinters");
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
                setSection("labelPrinters");
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
                setSection("reservedIps");
              }}
            >
              <Link style={{ width: "100%", height: "100%" }} to="/reservedIps">
                Reserved Ip's
              </Link>
            </MenuItem>
          </Menu>
        </div>
        <div className="tableContainer">
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
                <Button variant="contained" color="primary">
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
