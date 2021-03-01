import React, { useState } from "react";
import { MemoryRouter as Router, Link, Switch, Route } from "react-router-dom";
import { Button, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "../styles/inventory.css";
import "../styles/addForm.css";
// tables
import DesktopsTable from "../components/desktopsTable";
import LaptopsTable from "../components/laptopsTable";
import MobilesTable from "../components/mobilesTable";
import LabelPrintersTable from "../components/labelPrintersTable";
import LaserPrintersTable from "../components/laserPrintersTable";
import ReservedIpsTable from "../components/reservedIpsTable";
const Inventory = React.memo(() => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [section, setSection] = useState("desktops");
  const sectionTitle = {
    desktops: "Desktops",
    laptops: "Laptops",
    mobiles: "Mobiles",
    laserPrinters: "Laser Printers",
    labelPrinters: "LabelPrinters",
    reservedIps: "Reserved IP's",
  };
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
            {sectionTitle[section]}
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
              <Link to="/" exact>
                Desktops
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setSection("laptops");
              }}
            >
              <Link to="/laptops">Laptops</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setSection("mobiles");
              }}
            >
              <Link to="/mobiles">Mobiles</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setSection("laserPrinters");
              }}
            >
              <Link to="/laserPrinters">Laser Printers</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setSection("labelPrinters");
              }}
            >
              <Link to="/labelPrinters">Label Printers</Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setSection("reservedIps");
              }}
            >
              <Link to="/reservedIps">Reserved Ip's</Link>
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
      </div>
    </Router>
  );
});
export default Inventory;
