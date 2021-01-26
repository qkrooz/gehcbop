import React, { useEffect, useState } from "react";
import useLocalStorage from "./_resources/useLocalStorage";
import { Context } from "./_context/MainContext";
import { USELPUTIL02 } from "./_resources/serverRoutes";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Main from "./Main";
import Login from "./_apps/login";
const App = React.memo(() => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );
  const [userID, setUserID] = useLocalStorage("userID", 0);
  const [userStatus, setUserStatus] = useLocalStorage("userStatus", "online");
  const [currentPage, setCurrentPage] = useLocalStorage("currentPage", "/");
  const [userData, setUserData] = useState({});
  const [appPool, setAppPool] = useState([]);
  const [mainProgress, setMainProgress] = useState(0);
  const [currentApplication, setCurrentApplication] = useLocalStorage(
    "currentApplication",
    null
  );
  const getUserData = (ID, event) => {
    axios
      .post(`${USELPUTIL02}/gehcbop/getUserDataByID.php`, { userID: ID })
      .then((response) => {
        if (response.data.code === 200) {
          setUserData(response.data.userData[0]);
          setUserID(ID);
          if (event === "recover") {
            setUserStatus(response.data.userData[0].ACTIVITY_STATUS);
            setAppPool(JSON.parse(response.data.userData[0].APP_POOL));
            changeUserActivity(
              response.data.userData[0].ACTIVITY_STATUS,
              response.data.userData[0].ID
            );
          } else {
            setUserStatus("online");
            changeUserActivity("online", response.data.userData[0].ID);
            setAppPool(JSON.parse(response.data.userData[0].APP_POOL));
          }
          setIsAuthenticated(true);
        } else {
          clearUserData();
        }
      })
      .catch(() => {});
  };
  const clearUserData = () => {
    setUserData({});
    setCurrentPage("/");
    setIsAuthenticated(false);
    localStorage.clear();
  };
  const changeUserActivity = (status, ID) => {
    axios
      .post(`${USELPUTIL02}/gehcbop/changeStatus.php`, {
        userID: ID ? ID : userID,
        status: status,
      })
      .then((response) => {
        setUserData(response.data.userData[0]);
        setUserStatus(response.data.userData[0].ACTIVITY_STATUS);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (userID && isAuthenticated) {
      getUserData(userID, "recover");
    } else {
      clearUserData();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Context.Provider
      value={{
        isAuthenticatedState: [isAuthenticated, setIsAuthenticated],
        currentPageState: [currentPage, setCurrentPage],
        userDataState: [userData, setUserData],
        userStatusState: [userStatus, setUserStatus],
        appPoolState: [appPool, setAppPool],
        mainProgressState: [mainProgress, setMainProgress],
        currentApplicationState: [currentApplication, setCurrentApplication],
        USELPUTIL02: USELPUTIL02,
        // functions
        getUserData: getUserData,
        clearUserData: clearUserData,
        changeUserActivity: changeUserActivity,
      }}
    >
      <Router>
        <Switch>
          {isAuthenticated ? (
            <>
              <Redirect to="/" />
              <Route path="/" component={Main} />
            </>
          ) : (
            <>
              <Redirect to="/login" />
              <Route path="/login" component={Login} />
            </>
          )}
        </Switch>
      </Router>
    </Context.Provider>
  );
});
export default App;
