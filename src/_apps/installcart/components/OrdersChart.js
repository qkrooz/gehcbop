import React, { useLayoutEffect, useContext } from "react";
import { InstallCartContext } from "../resources/InstallCartContext";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "../styles/charts.css";
am4core.useTheme(am4themes_animated);
const OrdersChart = React.memo(() => {
  const { ordersState } = useContext(InstallCartContext);
  const [orders] = ordersState;
  useLayoutEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.paddingBottom = 50;
    let data = [
      {
        status: "Cancelled",
        value: orders.filter((item) => item.STATUS === "cancelled").length,
      },
      {
        status: "Under Review",
        value: orders.filter((item) => item.STATUS === "under review").length,
      },
      {
        status: "Project Queued",
        value: orders.filter((item) => item.STATUS === "project queued").length,
      },
      {
        status: "MFG in process",
        value: orders.filter((item) => item.STATUS === "mfg in process").length,
      },
      {
        status: "Secure In Staging Space",
        value: orders.filter(
          (item) => item.STATUS === "secure in staging space"
        ).length,
      },
      {
        status: "Cart Loaded",
        value: orders.filter((item) => item.STATUS === "cart loaded").length,
      },
      {
        status: "Install cart config",
        value: orders.filter((item) => item.STATUS === "install cart config")
          .length,
      },
      {
        status: "Cart ready to ship",
        value: orders.filter((item) => item.STATUS === "cart ready to ship")
          .length,
      },
      {
        status: "Arrived on site",
        value: orders.filter((item) => item.STATUS === "arrived on site")
          .length,
      },
      {
        status: "In transit",
        value: orders.filter((item) => item.STATUS === "in transit").length,
      },
      {
        status: "Order completed",
        value: orders.filter((item) => item.STATUS === "order completed")
          .length,
      },
    ];
    chart.data = data;
    var series = chart.series.push(new am4charts.PieSeries());
    series.ticks.template.events.on("visibilitychanged", hideLabelsAndTicks);
    series.labels.template.events.on("visibilitychanged", hideLabelsAndTicks);
    series.ticks.template.events.on("ready", hideLabelsAndTicks);
    series.labels.template.events.on("ready", hideLabelsAndTicks);
    series.dataFields.value = "value";
    series.dataFields.radiusValue = "value";
    series.dataFields.category = "status";
    series.slices.template.cornerRadius = 0;
    series.colors.step = 3;
    series.hiddenState.properties.endAngle = -90;
    function hideLabelsAndTicks(env) {
      env.target.hide();
    }
    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    chart.legend.fontSize = 12;
    var marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color("#ccc");
    marker.width = 20;
    marker.height = 20;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 40;
    markerTemplate.height = 10;
    return () => {
      chart.dispose();
    };
  }, [orders]);
  return (
    <div className="ordersChartContainer">
      <div
        className="deco-fix"
        style={{
          width: "100%",
          height: "2em",
          position: "absolute",
          backgroundColor: "white",
          bottom: 0,
          zIndex: 2,
        }}
      ></div>
      <div
        id="chartdiv"
        style={{ width: "500px", height: "550px", alignSelf: "center" }}
      ></div>
    </div>
  );
});
export default OrdersChart;
