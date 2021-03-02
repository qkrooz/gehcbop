import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../_context/MainContext";
import { ItSupportContext } from "./resources/ItSupportContext";
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/NavBar";
// screens
import Inventory from "./screens/Inventory";
import Miscellaneous from "./screens/Miscellaneous";
const ItSupportIndex = React.memo(() => {
  //states
  const [inventoryFormData, setInventoryFormData] = useState({});
  const [data, setData] = useState([]);
  const [genericLoader, setGenericLoader] = useState(false);
  const [addDrawerVisibility, setAddDrawerVisibility] = useState(false);
  const [its_inventory_section, set_its_inventory_section] = useState(
    "desktops"
  );
  const { USELPUTIL02, currentApplicationState } = useContext(Context);
  const [currentApplication] = currentApplicationState;
  //progress
  //functions
  const AddItem = (values) => {
    console.log(`${USELPUTIL02}/${currentApplication}/addItem.php`, values);
    axios
      .post(`${USELPUTIL02}/${currentApplication}/addItem.php`, values)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };
  const EditItem = (values) => {
    console.log(`${USELPUTIL02}/${currentApplication}/editItem.php`, values);
    axios
      .post(`${USELPUTIL02}/${currentApplication}/editItem.php`, values)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };
  const DeleteItem = (values) => {
    console.log(`${USELPUTIL02}/${currentApplication}/deleteItem.php`, values);
    axios
      .post(`${USELPUTIL02}/${currentApplication}/deleteItem.php`, values)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const ac = new AbortController();
    setData([]);
    if (its_inventory_section) {
      setGenericLoader(true);
      let route;
      switch (its_inventory_section) {
        case "desktops":
          route = `${USELPUTIL02}/${currentApplication}/fetchDesktops.php`;
          break;
        case "laptops":
          route = `${USELPUTIL02}/${currentApplication}/fetchLaptops.php`;
          break;
        case "mobiles":
          route = `${USELPUTIL02}/${currentApplication}/fetchMobiles.php`;
          break;
        case "labelPrinters":
          route = `${USELPUTIL02}/${currentApplication}/fetchLabelPrinters.php`;
          break;
        case "laserPrinters":
          route = `${USELPUTIL02}/${currentApplication}/fetchLaserPrinters.php`;
          break;
        case "reservedIps":
          route = `${USELPUTIL02}/${currentApplication}/fetchIps.php`;
          break;
        default:
          break;
      }
      axios
        .post(route)
        .then((response) => {
          setData(response.data);
          setGenericLoader(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => ac.abort();
    // eslint-disable-next-line
  }, [its_inventory_section]);
  return (
    <Router>
      <ItSupportContext.Provider
        value={{
          addDrawerVisibilityState: [
            addDrawerVisibility,
            setAddDrawerVisibility,
          ],
          inventoryFormDataState: [inventoryFormData, setInventoryFormData],
          //  functiones
          AddItem: AddItem,
          EditItem: EditItem,
          DeleteItem: DeleteItem,
          dataState: [data, setData],
          genericLoaderState: [genericLoader, setGenericLoader],
          its_inventory_sectionState: [
            its_inventory_section,
            set_its_inventory_section,
          ],
        }}
      >
        <Redirect to={`/${currentApplication}/inventory`} />
        <NavBar />
        <Switch>
          <Route
            component={Inventory}
            path={`/${currentApplication}/inventory`}
          />
          <Route
            component={Miscellaneous}
            path={`/${currentApplication}/miscellaneous`}
          />
        </Switch>
      </ItSupportContext.Provider>
    </Router>
  );
});
export default ItSupportIndex;
