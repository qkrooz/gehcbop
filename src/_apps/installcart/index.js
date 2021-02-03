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
  // states
  const [currentApplication] = currentApplicationState;
  const [completeOrders, setCompleteOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [workingOrder, setWorkingOrder] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [devicesList, setDevicesList] = useState([]);
  const [ordersSwitch, setOrdersSwitch] = useState(false);
  const [ordersCheckbox, setOrdersCheckbox] = useState(false);
  const [carts, setCarts] = useState([]);
  const [inserts, setInserts] = useState([]);
  // progress
  const [, setMainProgress] = mainProgressState;
  const [genericLoader, setGenericLoader] = useState(false);
  // modals
  const [addDialogVisibility, setAddDialogVisibility] = useState(false);
  const [
    deleteConfirmDialogVisibility,
    setDeleteConfirmDialogVisibility,
  ] = useState(false);
  const [editDialogVisibility, setEditDialogVisibility] = useState(false);
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
    function getInserts() {
      return axios.get(`${USELPUTIL02}/${currentApplication}/fetchInserts.php`);
    }
    Promise.all([
      getStatusList(),
      getDevicesList(),
      getOrders(),
      getCarts(),
      getInserts(),
    ])
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
        setInserts(results[4].data);
        setMainProgress(99);
        setTimeout(() => {
          setMainProgress(100);
          setMainProgress(0);
        }, 750);
      })
      .catch((error) => console.log(error));
  };
  const AddOrder = (values) => {
    console.log(values);
    setGenericLoader(true);
    axios
      .post(`${USELPUTIL02}/${currentApplication}/addNewOrder.php`, values)
      .then((response) => {
        console.log(response.data);
        if (response.data.code === 200) {
          let temporalAddedItem = response.data.lastItem[0];
          if (temporalAddedItem.STATUS === "order completed") {
            setFilteredOrders((filteredOrders) => [
              temporalAddedItem,
              ...filteredOrders,
            ]);
          }
          setOrders((orders) => [temporalAddedItem, ...orders]);
          setCompleteOrders((completeOrders) => [
            temporalAddedItem,
            ...completeOrders,
          ]);
          setTimeout(() => {
            setGenericLoader(false);
          }, 1000);
        } else {
          setGenericLoader(false);
        }
      })
      .catch((error) => {
        setGenericLoader(false);
      });
  };
  const EditOrder = () => {};
  const DeleteOrder = (order) => {
    setGenericLoader(true);
    axios
      .post(`${USELPUTIL02}/${currentApplication}/deleteItem.php`, {
        id: order.ID,
      })
      .then((response) => {
        if (response.data.code === 200) {
          // set up orders
          let newCompleteOrders = completeOrders.filter(
            (item) => item.ID !== order.ID
          );
          let newFilteredOrders = newCompleteOrders.filter(
            (item) => item.STATUS !== "order completed"
          );
          setCompleteOrders(newCompleteOrders);
          setFilteredOrders(newFilteredOrders);
          if (ordersSwitch) {
            setOrders(newCompleteOrders);
          } else {
            setOrders(newFilteredOrders);
          }
          setTimeout(() => {
            setGenericLoader(false);
          }, 1000);
          setDeleteConfirmDialogVisibility(false);
        } else {
          console.log("ocurrio un error");
          setGenericLoader(false);
          setDeleteConfirmDialogVisibility(false);
        }
      })
      .catch((error) => console.log(error));
  };
  const SearchOrders = (event) => {
    const searchText = event.target.value.toLowerCase();
    if (event.target.value === "") {
      if (ordersSwitch) {
        setOrders(completeOrders);
      } else {
        setOrders(filteredOrders);
      }
    } else {
      setOrders(
        completeOrders.filter(
          (element) =>
            element.PROJECT_NAME.toLowerCase().includes(searchText) ||
            element.GON.toLowerCase().includes(searchText) ||
            element.FW.toString().toLowerCase().includes(searchText) ||
            element.OWNER.toLowerCase().includes(searchText) ||
            element.PROJECT_MANAGER.toLowerCase().includes(searchText) ||
            element.STATUS.toLowerCase().includes(searchText)
        )
      );
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
        workingOrderState: [workingOrder, setWorkingOrder],
        statusListState: [statusList, setStatusList],
        devicesListState: [devicesList, setDevicesList],
        ordersSwitchState: [ordersSwitch, setOrdersSwitch],
        ordersCheckboxState: [ordersCheckbox, setOrdersCheckbox],
        cartsState: [carts, setCarts],
        insertsState: [inserts, setInserts],
        genericLoaderState: [genericLoader, setGenericLoader],
        // progress
        addDialogVisibilityState: [addDialogVisibility, setAddDialogVisibility],
        deleteDialogVisibilityState: [
          deleteConfirmDialogVisibility,
          setDeleteConfirmDialogVisibility,
        ],
        editDialogVisibilityState: [
          editDialogVisibility,
          setEditDialogVisibility,
        ],
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
