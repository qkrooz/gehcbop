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
  //progress
  const [genericLoader, setGenericLoader] = useState(false);
  //modals
  const [addDialogVisibility, setAddDialogVisibility] = useState(false);
  //functions
  const AddItem = (values) => {
    console.log(`${USELPUTIL02}/${currentApplication}/addItem.php`, values);
    axios
      .post(`${USELPUTIL02}/${currentApplication}/addItem.php`, values)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };
  return (
    <ItSupportContext.Provider
      value={{
        addDialogVisibilityState: [
          setAddDialogVisibility,
          setAddDialogVisibility,
        ],
        AddItem: AddItem,
      }}
    >
      <Tabs />
    </ItSupportContext.Provider>
  );
});
export default ItSupportIndex;
