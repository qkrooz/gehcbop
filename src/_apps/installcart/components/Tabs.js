import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// Screens
import Dashboard from "../screens/Dashboard";
import Inventory from "../screens/Inventory";
import Orders from "../screens/Orders";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} indicatorColor="primary">
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Orders" {...a11yProps(1)} />
          <Tab label="Inventory" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        style={{ flexGrow: 1, display: "flex" }}
        index={0}
      >
        <Dashboard />
      </TabPanel>
      <TabPanel
        value={value}
        style={{ flexGrow: 1, display: "flex" }}
        index={1}
      >
        <Orders />
      </TabPanel>
      <TabPanel
        value={value}
        style={{ flexGrow: 1, display: "flex" }}
        index={2}
      >
        <Inventory />
      </TabPanel>
    </div>
  );
}
