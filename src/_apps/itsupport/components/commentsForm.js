import React, { useEffect, useContext } from "react";
import { ItSupportContext } from "../resources/ItSupportContext";
import { Textarea } from "@chakra-ui/react";
import MenuItem from "@material-ui/core/MenuItem";
const CommentsDesktopsForm = React.memo(() => {
  const { inventoryCommentsDataState } = useContext(ItSupportContext);
  const [
    inventoryCommentsData,
    setInventoryCommentsData,
  ] = inventoryCommentsDataState;
  useEffect(() => {
    console.log(inventoryCommentsData);
  }, [inventoryCommentsData]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <span style={{ fontSize: "1.1em", color: "gray", marginBottom: "1em" }}>
        Comments
      </span>
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <Textarea
          defaultValue={inventoryCommentsData}
          onChange={(e) => {
            setInventoryCommentsData(e.target.value);
          }}
        ></Textarea>
      </div>
    </div>
  );
});

export const indexComments = {
  desktops: <CommentsDesktopsForm />,
  // laptops: <AddLaptopsForm />,
  // mobiles: <AddMobilesForm />,
  // laser_printers: <AddLabelPrintersForm />,
  // label_printers: <AddLaserPrintersForm />,
  // reserved_ips: <AddReservedIpsForm />,
};
