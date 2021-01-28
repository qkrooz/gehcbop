import React, { useLayoutEffect, useContext } from "react";
import { InstallCartContext } from "../resources/InstallCartContext";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "../styles/dashboard.css";
import CartsChart from "../components/CartsChart";
import OrdersChart from "../components/OrdersChart";
const Dashboard = React.memo(() => {
  const { completeOrdersState } = useContext(InstallCartContext);
  return (
    <div className="dashboardMainContainer">
      <div className="upperCharts">
        <div className="leftChartContainer">
          <Dash1 />
        </div>
        <div className="rightChartContainer">
          <OrdersChart />
          <CartsChart />
        </div>
      </div>
      <div className="lowerCharts">
        <div className="leftChartContainer2">
          <Dash2 />
          <Dash3 />
          <Dash4 />
        </div>
        <div className="rightChartContainer2">
          <Dash5 />
        </div>
      </div>
    </div>
  );
});
const Dash1 = () => {
  const { completeOrdersState } = useContext(InstallCartContext);
  const [completeOrders] = completeOrdersState;
  useLayoutEffect(() => {
    if (completeOrders.length !== 0) {
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
      // Create chart instance
      var chart = am4core.create("lineChartContainer", am4charts.XYChart);
      // data generation
      let dash2Data = [];
      let tempCompleteOrders = completeOrders.filter(
        (item) => item.STATUS === "order completed"
      );

      tempCompleteOrders.forEach((item) => {
        if (item.DEVICE_COUNT !== "") {
          let date = item.SHIP_DATE.trim();
          let value = JSON.parse(item.DEVICE_COUNT).reduce(
            (accum, item) => accum + parseInt(item.quantity),
            0
          );
          dash2Data.push({ date: date, value: value });
        }
      });
      dash2Data.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      dash2Data.reverse();
      chart.data = dash2Data;
      // Set input format for the dates
      chart.dateFormatter.inputDateFormat = "MM/dd/yyyy";
      // Create axes
      var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // Create series
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.dateX = "date";
      series.tooltipText = "{value}";
      series.strokeWidth = 2;
      series.minBulletDistance = 15;
      // Drop-shaped tooltips
      series.tooltip.background.cornerRadius = 20;
      series.tooltip.background.strokeOpacity = 0;
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.label.minWidth = 40;
      series.tooltip.label.minHeight = 40;
      series.tooltip.label.textAlign = "middle";
      series.tooltip.label.textValign = "middle";
      // Make bullets grow on hover
      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color("#fff");
      var bullethover = bullet.states.create("hover");
      bullethover.properties.scale = 1.3;
      // Make a panning cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "panXY";
      chart.cursor.xAxis = dateAxis;
      chart.cursor.snapToSeries = series;
      // Create vertical scrollbar and place it before the value axis
      chart.scrollbarY = new am4core.Scrollbar();
      chart.scrollbarY.parent = chart.leftAxesContainer;
      chart.scrollbarY.toBack();
      // Create a horizontal scrollbar with previe and place it underneath the date axis
      chart.scrollbarX = new am4charts.XYChartScrollbar();
      chart.scrollbarX.series.push(series);
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      dateAxis.start = 0;
      dateAxis.keepSelection = true;
    }
  }, [completeOrders]);
  return (
    <div className="dash1Container">
      <div id="lineChartContainer"></div>
      <div className="tableDataContainer"></div>
    </div>
  );
};
const Dash2 = () => {
  return <div className="dash2Container"></div>;
};
const Dash3 = () => {
  return <div className="dash2Container"></div>;
};
const Dash4 = () => {
  return <div className="dash2Container"></div>;
};
const Dash5 = () => {
  return <div className="dash3Container"></div>;
};
export default Dashboard;
