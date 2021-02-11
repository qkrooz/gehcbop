import React, { useContext, useEffect, useState } from "react";
import Tabs from "./components/Tabs";
import axios from "axios";
import { Context } from "../../_context/MainContext";
import { ItSupportContext } from "./resources/ItSupportContext";
const ItSupportIndex = React.memo(() => {
  const {
    mainProgressState,
    USELPUTIL02,
    currentApplicationState,
  } = useContext(Context);
  //states
  const [currentApplication] = currentApplicationState;
  const [desktops, setDesktops] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const [labelPrinters, setLabelPrinters] = useState([]);
  const [laserPrinters, setLaserPrinters] = useState([]);
  const [reservedIps, setReservedIps] = useState([]);
  //progress
  const [, setMainProgress] = mainProgressState;
  const [genericLoader, setGenericLoader] = useState(false);
  //modals
  const [addDesktopVisibility, setAddDesktopVisibility] = useState(false);
  const [addLaptopVisibility, setAddLaptopVisibility] = useState(false);
  const [addMobileVisibility, setAddMobileVisibility] = useState(false);
  const [addLabelPrinterVisibility, setAddLabelPrinterVisibility] = useState(
    false
  );
  const [addLaserPrinterVisibility, setAddLaserPrinterVisibility] = useState(
    false
  );
  const [addReservedIpVisibility, setAddReservedIpVisibility] = useState(false);
  //functions
  const AddItem = (values) => {
    console.log(`${USELPUTIL02}/${currentApplication}/addItem.php`, values);
    axios
      .post(`${USELPUTIL02}/${currentApplication}/addItem.php`, values)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };
  const ic_getDatanConfiguration = () => {
    function getDesktops() {
      return axios.get(
        `${USELPUTIL02}/${currentApplication}/fetchDesktops.php`
      );
    }
    function getLaptops() {
      return axios.get(`${USELPUTIL02}/${currentApplication}/fetchLaptops.php`);
    }
    function getMobiles() {
      return axios.get(`${USELPUTIL02}/${currentApplication}/fetchMobiles.php`);
    }
    function getLabelPrinters() {
      return axios.get(
        `${USELPUTIL02}/${currentApplication}/fetchLabelPrinters.php`
      );
    }
    function getLaserPrinters() {
      return axios.get(
        `${USELPUTIL02}/${currentApplication}/fetchLaserPrinters.php`
      );
    }
    function getReservedIps() {
      return axios.get(`${USELPUTIL02}/${currentApplication}/fetchIps.php`);
    }
    Promise.all([
      getDesktops(),
      getLaptops(),
      getMobiles(),
      getLabelPrinters(),
      getLaserPrinters(),
      getReservedIps(),
    ])
      .then((results) => {
        setMainProgress(50);
        setDesktops(results[0].data);
        setLaptops(results[1].data);
        setMobiles(results[2].data);
        setLabelPrinters(results[3].data);
        setLaserPrinters(results[4].data);
        setReservedIps(results[5].data);
        setMainProgress(99);
        setTimeout(() => {
          setMainProgress(100);
          setMainProgress(0);
        }, 750);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    ic_getDatanConfiguration();
    // eslint-disable-next-line
  }, []);
  return (
    <ItSupportContext.Provider
      value={{
        addDesktopVisibilityState: [
          addDesktopVisibility,
          setAddDesktopVisibility,
        ],
        addLaptopVisibilityState: [addLaptopVisibility, setAddLaptopVisibility],
        addMobileVisibilityState: [addMobileVisibility, setAddMobileVisibility],
        addLabelPrinterVisibilityState: [
          addLabelPrinterVisibility,
          setAddLabelPrinterVisibility,
        ],
        addLaserPrinterVisibilityState: [
          addLaserPrinterVisibility,
          setAddLaserPrinterVisibility,
        ],
        addReservedIpVisibilityState: [
          addReservedIpVisibility,
          setAddReservedIpVisibility,
        ],
        AddItem: AddItem,
        desktopsState: [desktops, setDesktops],
        laptopsState: [laptops, setLaptops],
        mobilesState: [mobiles, setMobiles],
        labelPrintersState: [labelPrinters, setLabelPrinters],
        laserPrintersState: [laserPrinters, setLaserPrinters],
        reservedIpsState: [reservedIps, setReservedIps],
      }}
    >
      <Tabs />
    </ItSupportContext.Provider>
  );
});
export default ItSupportIndex;
