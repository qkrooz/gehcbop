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
  const AddOrder = () => {};
  const EditOrder = () => {};
  const DeleteOrder = () => {};
  useEffect(() => {
    ic_getData();
    // eslint-disable-next-line
  }, []);
  return (
    <InstallCartContext.Provider value={{ ordersState: [orders, setOrders] }}>
      <Tabs />
    </InstallCartContext.Provider>
  );
});
export default InstallCartIndex;
