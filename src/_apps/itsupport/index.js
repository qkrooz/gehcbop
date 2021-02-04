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
  //modals
  const [addDialogVisibility, setAddDialogVisibility] = useState(false);
  return (
    <ItSupportContext.Provider
      value={{
        addDialogVisibilityState: [
          setAddDialogVisibility,
          setAddDialogVisibility,
        ],
      }}
    >
      <Tabs />
    </ItSupportContext.Provider>
  );
});
export default ItSupportIndex;
