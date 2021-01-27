import React, { useContext } from "react";
import { InstallCartContext } from "../resources/InstallCartContext";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const OrdersTotalChart = () => {
  const useStyles = makeStyles({
    cell: {
      textAlign: "start",
    },
  });
  const classes = useStyles();
  const { ordersState, completeOrdersState, filteredOrdersState } = useContext(
    InstallCartContext
  );
  const [orders] = ordersState;
  const [filteredOrders] = filteredOrdersState;
  const [completeOrders] = completeOrdersState;
  function createData(label, quantity) {
    return { label, quantity };
  }

  const rows = [
    createData("Current", orders.length),
    createData("Total", completeOrders.length),
    createData(
      "Uncomplete",
      completeOrders.filter((item) => item.STATUS !== "order completed").length
    ),
    createData(
      "Complete",
      completeOrders.filter((item) => item.STATUS === "order completed").length
    ),
  ];

  return (
    <div className="ordersTotalChartContainer">
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Concept</TableCell>
              <TableCell>Qty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label}>
                <TableCell>{row.label}</TableCell>
                <TableCell>{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default OrdersTotalChart;
