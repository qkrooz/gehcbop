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
          defaultValue={inventoryCommentsData.comment}
          onChange={(e) => {
            inventoryCommentsData.comment = e.target.value;
            setInventoryCommentsData(inventoryCommentsData);
          }}
        ></Textarea>
      </div>
    </div>
  );
});

export const indexComments = {
  desktops: <CommentsDesktopsForm />,
  // laptops: <CommentsLaptopsForm />,
  // mobiles: <CommentsMobilesForm />,
  // laser_printers: <CommentsLabelPrintersForm />,
  // label_printers: <CommentsLaserPrintersForm />,
  // reserved_ips: <CommentsReservedIpsForm />,
};
