import React, { useContext, useLayoutEffect } from "react";
import { InstallCartContext } from "../resources/InstallCartContext";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "../styles/charts.css";
const CartsChart = React.memo((props) => {
  const { cartsState } = useContext(InstallCartContext);
  const [carts] = cartsState;
  useLayoutEffect(() => {
    var chart = am4core.create("chartdiv2", am4charts.XYChart);
    let data = [
      {
        cartType: "In Stock",
        value: carts.filter((item) => item.STATUS === "In Stock").length,
      },
      {
        cartType: "Reserved In",
        value: carts.filter((item) => item.STATUS === "Reserved In").length,
      },
      {
        cartType: "Reserved",
        value: carts.filter((item) => item.STATUS === "Reserved").length,
      },
      {
        cartType: "Deployed",
        value: carts.filter((item) => item.STATUS === "Deployed").length,
      },
    ];
    chart.data = data;
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "cartType";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;

    categoryAxis.renderer.labels.template.adapter.add(
      "dy",
      function (dy, target) {
        if (target.dataItem && target.dataItem.index) {
          return dy + 25;
        }
        return dy;
      }
    );

    chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "cartType";
    // series.name = "cartType";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.8;
    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    return () => {
      chart.dispose();
    };
  }, [carts]);
  return (
    <div className="cartsChartContainer" {...props}>
      <div id="chartdiv2" style={{ width: "90%", height: "250px" }}></div>
    </div>
  );
});
export default CartsChart;
