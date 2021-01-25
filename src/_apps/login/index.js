import React, { useState, useEffect, useContext } from "react";
import { Input, Button, Form, notification, Spin } from "antd";
import axios from "axios";
import { Context } from "../../_context/MainContext";
import Wallpaper1 from "../../_img/wallpapers/1.jpg";
import Wallpaper2 from "../../_img/wallpapers/2.jpg";
import Wallpaper3 from "../../_img/wallpapers/3.jpg";
import Wallpaper4 from "../../_img/wallpapers/4.jpg";
import Wallpaper5 from "../../_img/wallpapers/5.jpg";
import GELogo from "../../_img/gelogocolor.png";
import "./styles/login.css";
const Index = React.memo(() => {
  const { USELPUTIL02, getUserData } = useContext(Context);
  const [wallpaper, setWallpaper] = useState();
  const [checkingInfoLoader, setCheckingInfoLoader] = useState(false);
  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };
  const onFinish = (values) => {
    setCheckingInfoLoader(true);
    function checkUserExists() {
      return axios.post(`${USELPUTIL02}/gehcbop/userExists.php`, values);
    }
    Promise.all([checkUserExists()])
      .then((results) => {
        console.log(results[0]);
        const userExistsResponse = results[0].data;
        switch (userExistsResponse.code) {
          case 405:
            setCheckingInfoLoader(false);
            openNotificationWithIcon("error", "Error", "The user is invalid");
            break;
          case 406:
            setCheckingInfoLoader(false);
            openNotificationWithIcon("error", "Error", "The pin is invalid");
            break;
          case 407:
            setCheckingInfoLoader(false);
            openNotificationWithIcon(
              "error",
              "Error",
              "User does not have any app registered. Please contact IT Support Team."
            );
            break;
          case 200:
            getUserData(results[0].data.userID);
            break;
          default:
            setCheckingInfoLoader(false);
            break;
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const setWallpaperOnce = () => {
      const images = [
        Wallpaper1,
        Wallpaper2,
        Wallpaper3,
        Wallpaper4,
        Wallpaper5,
      ];
      const newWallpaper = images[Math.floor(Math.random() * images.length)];
      setWallpaper(newWallpaper);
    };
    setWallpaperOnce();
  }, []);
  return (
    <div className="login-container">
      <img src={wallpaper} alt="wallpaper" className="wallpaper" />
      <div className="login-form-container">
        <div className="branding-div">
          <img src={GELogo} alt="gelogo-color" />
          <span>GE Healthcare BOP</span>
          <Form className="login-form" onFinish={onFinish}>
            <Form.Item
              className="input-group"
              name="sso"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input allowClear placeholder="SSO" size="large" />
            </Form.Item>
            <Form.Item
              className="input-group"
              name="pin"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input.Password allowClear placeholder="Password" size="large" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" size="large">
                Log In
              </Button>
            </Form.Item>
            <Button
              type="link"
              style={{ fontSize: "0.9em", paddingLeft: 6, paddingBottom: 0 }}
            >
              Forgot password?
            </Button>
            <Button type="link" style={{ paddingLeft: 6, fontSize: "0.9em" }}>
              Sign Up Here
            </Button>
          </Form>
        </div>
        {checkingInfoLoader ? (
          <Spin size="large" style={{ marginTop: "1em" }} />
        ) : null}
      </div>
      <footer className="login-footer">
        <div className="footer-brand">
          <span>
            General Electric Healthcare 2020 {"\u00a9"} BOP IT Support Team
          </span>
        </div>
        <div className="useful-links">
          <button type="text" className="footer-link">
            About
          </button>
          <button type="text" className="footer-link">
            Support & Feedback
          </button>
          <button type="text" className="footer-link">
            Data Policy
          </button>
        </div>
      </footer>
    </div>
  );
});
export default Index;
