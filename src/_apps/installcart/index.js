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
  const [completeOrders, setCompleteOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [devicesList, setDevicesList] = useState([]);
  const [ordersSwitch, setOrdersSwitch] = useState(false);
  const [ordersCheckbox, setOrdersCheckbox] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [carts, setCarts] = useState([]);
  const ic_getDatanConfiguration = () => {
    setMainProgress(15);
    function getStatusList() {
      return axios.get(
        `${USELPUTIL02}/${currentApplication}/fetchStatusList.php`
      );
    }
    function getDevicesList() {
      return axios.get(
        `${USELPUTIL02}/${currentApplication}/fetchDevicesList.php`
      );
    }
    function getOrders() {
      return axios.get(`${USELPUTIL02}/${currentApplication}/fetchOrders.php`);
    }
    function getCarts() {
      return axios.get(`${USELPUTIL02}/${currentApplication}/fetchCarts.php`);
    }
    Promise.all([getStatusList(), getDevicesList(), getOrders(), getCarts()])
      .then((results) => {
        setMainProgress(50);
        setStatusList(results[0].data);
        setDevicesList(results[1].data);
        setCompleteOrders(results[2].data.orders);
        setOrders(
          results[2].data.orders.filter(
            (item) => item.STATUS !== "order completed"
          )
        );
        setFilteredOrders(
          results[2].data.orders.filter(
            (item) => item.STATUS !== "order completed"
          )
        );
        setCarts(results[3].data);
        setMainProgress(99);
        setTimeout(() => {
          setMainProgress(100);
          setMainProgress(0);
        }, 750);
      })
      .catch((error) => console.log(error));
  };
  const AddOrder = () => {};
  const EditOrder = () => {};
  const DeleteOrder = () => {};
  const SearchOrders = (event) => {
    const searchText = event.target.value.toLowerCase();
    if (event.target.value === "") {
      if (ordersSwitch) {
        setOrders(completeOrders);
      } else {
        setOrders(filteredOrders);
      }
    } else {
      const search = completeOrders.filter(
        (element) =>
          element.PROJECT_NAME.toLowerCase().includes(searchText) ||
          element.GON.toLowerCase().includes(searchText) ||
          element.FW.toString().toLowerCase().includes(searchText) ||
          element.OWNER.toLowerCase().includes(searchText) ||
          element.PROJECT_MANAGER.toLowerCase().includes(searchText) ||
          element.STATUS.toLowerCase().includes(searchText)
      );
      setOrders(search);
    }
  };
  const SwitchOrders = (event, text) => {
    text = text.toLowerCase();
    setOrdersSwitch(event.target.checked);
    if (event.target.checked === true) {
      if (text === "") {
        setOrders(completeOrders);
      } else {
        setOrders(
          completeOrders.filter(
            (item) =>
              item.PROJECT_NAME.toLowerCase().includes(text) ||
              item.GON.toLowerCase().includes(text) ||
              item.FW.toString().toLowerCase().includes(text) ||
              item.OWNER.toLowerCase().includes(text) ||
              item.PROJECT_MANAGER.toLowerCase().includes(text) ||
              item.STATUS.toLowerCase().includes(text)
          )
        );
      }
    } else {
      if (text === "") {
        setOrders(filteredOrders);
      } else {
        setOrders(
          filteredOrders.filter(
            (item) =>
              item.PROJECT_NAME.toLowerCase().includes(text) ||
              item.GON.toLowerCase().includes(text) ||
              item.FW.toString().toLowerCase().includes(text) ||
              item.OWNER.toLowerCase().includes(text) ||
              item.PROJECT_MANAGER.toLowerCase().includes(text) ||
              item.STATUS.toLowerCase().includes(text)
          )
        );
      }
    }
  };
  const ToggleComplete = (event) => {
    setOrdersCheckbox(event);
    if (event) {
      setOrders(
        completeOrders.filter((item) => item.STATUS === "order completed")
      );
    } else {
      if (ordersSwitch) {
        setOrders(completeOrders);
      } else {
        setOrders(filteredOrders);
      }
    }
  };
  useEffect(() => {
    ic_getDatanConfiguration();
    // eslint-disable-next-line
  }, []);
  return (
    <InstallCartContext.Provider
      value={{
        // states
        ordersState: [orders, setOrders],
        completeOrdersState: [completeOrders, setCompleteOrders],
        filteredOrdersState: [filteredOrders, setFilteredOrders],
        statusListState: [statusList, setStatusList],
        devicesListState: [devicesList, setDevicesList],
        ordersSwitchState: [ordersSwitch, setOrdersSwitch],
        ordersCheckboxState: [ordersCheckbox, setOrdersCheckbox],
        isSearchingState: [isSearching, setIsSearching],
        cartsState: [carts, setCarts],
        // functions
        AddOrder: AddOrder,
        EditOrder: EditOrder,
        DeleteOrder: DeleteOrder,
        SearchOrders: SearchOrders,
        SwitchOrders: SwitchOrders,
        ToggleComplete: ToggleComplete,
      }}
    >
      <Tabs />
    </InstallCartContext.Provider>
  );
});
export default InstallCartIndex;
