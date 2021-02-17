import React, { useContext, useState, useEffect } from "react";
import { Context } from "./_context/MainContext";
import useLocalStorage from "./_resources/useLocalStorage";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Layout, Menu, Dropdown, Button, Tooltip, Input } from "antd";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  SearchOutlined,
  PoweroffOutlined,
  BellOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  FileDoneOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import GELogo from "./_img/gelogocolor.png";
import "./_styles/main.css";
import "./_styles/sider.css";
const { Sider, Content } = Layout;
const Main = React.memo(() => {
  const { currentPageState, appPoolState, mainProgressState } = useContext(
    Context
  );
  const [mainProgress] = mainProgressState;
  const [renderApps, setRenderApps] = useState([]);
  const [currentPage] = currentPageState;
  const [appPool] = appPoolState;
  const [appLoader, setAppLoader] = useState(true);
  useEffect(() => {
    if (appPool.length !== 0) {
      let tempApps = [];
      Object.values(appPool).forEach((App) => {
        import("./_apps/" + App.appName).then((ImportedApp) =>
          tempApps.push(ImportedApp.default)
        );
      });
      setRenderApps(tempApps);
      setAppLoader(false);
    }
    // eslint-disable-next-line
  }, [appPool]);
  return (
    <>
      <Redirect exact to="/" />
      <Layout className="main-layout">
        <SiderBar />
        <Content style={{ display: "flex", flexDirection: "column" }}>
          {mainProgress === 0 || mainProgress === 100 ? null : (
            <LinearProgress
              variant="determinate"
              value={mainProgress}
              color="primary"
            />
          )}

          {appLoader ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : null}
          <Switch>
            <Route exact path="/">
              <SelectAppPage />
            </Route>
            {renderApps.length === 0
              ? null
              : renderApps.map((App, i) => {
                  return (
                    <Route
                      key={appPool[i].appName}
                      path={"/" + appPool[i].appName}
                    >
                      <App />
                    </Route>
                  );
                })}
          </Switch>
        </Content>
      </Layout>
    </>
  );
});
const SiderBar = React.memo(() => {
  const appIcons = {
    installcart: <FileDoneOutlined />,
    itsupport: <DesktopOutlined />,
  };
  const {
    currentPageState,
    changeUserActivity,
    userDataState,
    userStatusState,
    appPoolState,
    clearUserData,
    currentApplicationState,
  } = useContext(Context);
  const [, setCurrentApplication] = currentApplicationState;
  const [appPool] = appPoolState;
  const [userData] = userDataState;
  const [userStatus] = userStatusState;
  const [currentPage, setCurrentPage] = currentPageState;
  const [siderCollapsedState, setSiderCollapsedState] = useLocalStorage(
    "siderCollapsedState",
    false
  );
  const [, setAboutModalVisibility] = useState(false);
  const [onofftootlipvisibility, setonofftootlipvisibility] = useState(false);
  const powerMenu = (
    <Menu>
      <Menu.Item>
        <Button
          onClick={() => {
            changeUserActivity("offline");
            clearUserData();
          }}
          type="text"
          icon={<PoweroffOutlined />}
        >
          Sign-Out
        </Button>
      </Menu.Item>
    </Menu>
  );
  const statusMenu = (
    <Menu>
      <Menu.Item>
        <Button
          onClick={() => {
            changeUserActivity("online");
          }}
          type="text"
        >
          Online
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          onClick={() => {
            changeUserActivity("bussy");
          }}
          type="text"
        >
          Bussy
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          onClick={() => {
            changeUserActivity("away");
          }}
          type="text"
        >
          Away
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Sider
      className="main-sider"
      collapsible
      collapsed={siderCollapsedState}
      onCollapse={() => {
        setSiderCollapsedState(!siderCollapsedState);
      }}
    >
      <div className="ge-logo">
        <img src={GELogo} alt="ge-logo-img" />
        {siderCollapsedState ? null : <span>GE Healthcare BOP</span>}
      </div>
      <div
        className="divider"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: siderCollapsedState ? "center" : "flex-start",
        }}
      >
        <span>Apps</span>
      </div>
      {Object.values(userDataState).length !== 0 ? (
        <Menu theme="dark" mode="inline">
          {Object.values(appPool).map((app, i) => {
            return (
              <Menu.Item
                key={i}
                icon={appIcons[app.appName]}
                onClick={() => {
                  setCurrentPage(`/${app.appName}`);
                  setCurrentApplication(app.appName);
                  console.log(app.appName);
                }}
              >
                <Link to={`/${app.appName}`} />
                {app.appTitle}
              </Menu.Item>
            );
          })}
        </Menu>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {siderCollapsedState ? null : (
        <>
          <div
            className="divider"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: siderCollapsedState ? "center" : "flex-start",
              marginBottom: "",
            }}
          >
            <SearchOutlined className="search-icon" />
            <Input
              bordered={false}
              style={{ color: "white" }}
              className="sidebar-search-bar"
              placeholder="Search app..."
            />
          </div>
          <div
            className="divider"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: siderCollapsedState ? "center" : "space-between",
              marginBottom: "0.5em",
              paddingLeft: "1em",
              paddingRight: "1em",
            }}
          >
            <Tooltip title="Notifications">
              <Button type="text" icon={<BellOutlined />}></Button>
            </Tooltip>
            <Tooltip title="Settings">
              <Button type="text" icon={<SettingOutlined />}></Button>
            </Tooltip>
            <Tooltip title="About">
              <Button
                type="text"
                icon={<QuestionCircleOutlined />}
                onClick={() => {
                  setAboutModalVisibility(true);
                }}
              ></Button>
            </Tooltip>
            <Tooltip title="Session settings" visible={onofftootlipvisibility}>
              <Dropdown
                overlay={powerMenu}
                placement="topLeft"
                trigger={["click"]}
              >
                <Button
                  onMouseEnter={() => {
                    setonofftootlipvisibility(true);
                  }}
                  onMouseLeave={() => {
                    setonofftootlipvisibility(false);
                  }}
                  type="text"
                  icon={<PoweroffOutlined />}
                  onClick={() => {
                    setonofftootlipvisibility(false);
                  }}
                ></Button>
              </Dropdown>
            </Tooltip>
          </div>
        </>
      )}
      {Object.values(userData).length !== 0 ? (
        <div
          className="user"
          style={{
            justifyContent: siderCollapsedState ? "center" : "space-evenly",
          }}
        >
          <Dropdown
            overlay={statusMenu}
            placement="topLeft"
            trigger={["click"]}
            arrow
          >
            <div className="user-img">
              <img
                src={`https://supportcentral.gecdn.com/images/person/temp/${userData.SSO}.jpg`}
                alt="user-img"
              />
              <div className={"status-" + userStatus}></div>
            </div>
          </Dropdown>
          {siderCollapsedState ? null : (
            <div className="user-data">
              <span className="user-name">{userData.USER_NAME}</span>
              {Object.values(userData).length !== 0 ? (
                userData.ROLE.length > 18 ? (
                  <Tooltip title={userData.ROLE}>
                    <span className="user-ROLE">
                      {userData.ROLE.length < 19
                        ? userData.ROLE
                        : userData.ROLE.substring(0, 18) + "..."}
                    </span>
                  </Tooltip>
                ) : (
                  <span className="user-ROLE">
                    {userData.ROLE.length < 19
                      ? userData.ROLE
                      : userData.ROLE.substring(0, 18) + "..."}
                  </span>
                )
              ) : null}
              <span className="user-sso">{userData.SSO}</span>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1.5em 0em",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </Sider>
  );
});
function SelectAppPage() {
  return (
    <div className="selectAppPageContainer">
      <h1>Select an application</h1>
    </div>
  );
}
export default Main;
