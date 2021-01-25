import React, { useContext, useEffect, useState } from "react";
import Tabs from "./components/Tabs";
import axios from "axios";
import { Context } from "../../_context/MainContext";
import { InstallCartContext } from "./resources/InstallCartContext";
const InstallCartIndex = React.memo(() => {
  const {
    mainProgressState,
    USELPUTIL02,
    currentApplicationState,
  } = useContext(Context);
  const [, setMainProgress] = mainProgressState;
  const [currentApplication] = currentApplicationState;
  const [orders, setOrders] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [devicesList, setDevicesList] = useState([]);
  const ic_getData = () => {
    setMainProgress(15);
    axios
      .get(`${USELPUTIL02}/${currentApplication}/fetchOrders.php`)
      .then((response) => {
        setMainProgress(50);
        setOrders(response.data.orders);
        setMainProgress(99);
        setTimeout(() => {
          setMainProgress(100);
          setMainProgress(0);
        }, 750);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ic_Configuration = () => {
    function getStatusList() {
      return axios.get("");
    }
    function getDevicesList() {
      return axios.get("");
    }
  };
  const AddOrder = () => {};
  const EditOrder = () => {};
  const DeleteOrder = () => {};
  useEffect(() => {
    ic_getData();
    // eslint-disable-next-line
  }, []);
  return (
    <InstallCartContext.Provider
      value={{
        // states
        ordersState: [orders, setOrders],
        statusListState: [statusList, setStatusList],
        devicesListState: [devicesList, setDevicesList],
        // functions
        AddOrder: AddOrder,
        EditOrder: EditOrder,
        DeleteOrder: DeleteOrder,
      }}
    >
      <Tabs />
    </InstallCartContext.Provider>
  );
});
export default InstallCartIndex;
