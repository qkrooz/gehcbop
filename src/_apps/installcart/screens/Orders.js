import React, { useContext, useState } from "react";
import { InstallCartContext } from "../resources/InstallCartContext";
import { Menu, Button } from "antd";
import "../styles/orders.css";
const Orders = React.memo(() => {
  const { ordersState } = useContext(InstallCartContext);
  const [orders] = ordersState;
  return (
    <div className="ordersMainContainer">
      <div className="ordersContainer">
        <div className="ordersList">
          {Object.values(orders).map((order, i) => (
            <OrderElement data={order} key={i} />
          ))}
        </div>
      </div>
      <div className="chartsContainer"></div>
    </div>
  );
});
const OrderElement = ({ data }) => {
  const [detailsCollapse, setDetailsCollapse] = useState(false);
  const [coninfCollapse, setConinfCollapse] = useState(false);
  const ellipsisMenu = (
    <Menu>
      <Menu.Item key="0">
        <Button
          type="text"
          onClick={() => {
            PreEdit({ id: data.ID });
          }}
        >
          <EditOutlined />
          Edit
        </Button>
      </Menu.Item>
      <Menu.Item key="1">
        <Button
          type="text"
          onClick={() => {
            ConfirmModal({ DeleteItem: DeleteItem, id: data.ID });
          }}
        >
          <DeleteOutlined />
          Delete
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="order-container-outter ">
      <div className="order-container-inner">
        <Button style={{ marginRight: "1.5em" }} shape="circle" size="large">
          <FileTextOutlined />
        </Button>
        <div className="primary-data-container">
          <Tooltip title="Project name" placement="right">
            <span className="projName-label">{data.PROJECT_NAME}</span>
          </Tooltip>
          <Tooltip title="General order number" placement="right">
            <span className="gon-inner-label">GON#</span>
            <span className="gon-label">{data.GON}</span>
          </Tooltip>
        </div>
        <div className="fw-container">
          <span className="desc">Fiscal Week</span>
          <span className="fw-label">{data.FW}</span>
        </div>
        <div className="dates-container">
          <span className="desc">Ship Date</span>
          <span className="date">{data.SHIP_DATE}</span>
          <span className="desc">Requested On-Site Date</span>
          <span className="date">{data.ROSD}</span>
        </div>
        <div className="extra-info-container">
          <span className="desc">Created Date</span>
          <span className="date">{data.CREATED_DATE}</span>
          <span className="desc">Owner</span>
          <span className="date">{data.OWNER}</span>
        </div>
        <div className="captions"></div>
      </div>
    </div>
  );
};
export default Orders;
