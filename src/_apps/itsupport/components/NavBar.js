import React from "react";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "../styles/navbarButtonFix.css";
const NavBar = React.memo(() => {
  return (
    <nav style={{ backgroundColor: "black" }}>
      <Button
        className="navButton"
        style={{
          color: "white",
          margin: 0,
          padding: "0",
          borderRadius: 0,
          height: "3.5em",
        }}
      >
        <NavLink
          to="/itsupport/inventory"
          style={{
            color: "white",
            height: "100%",
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "0 3em",
          }}
          activeStyle={{
            borderBottom: "4px solid #3792cb",
            color: "white",
            height: "100%",
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "0 3em",
          }}
        >
          Inventory
        </NavLink>
      </Button>
      <Button
        className="navButton"
        style={{
          color: "white",
          margin: 0,
          padding: "0",
          borderRadius: 0,
          height: "3.5em",
        }}
      >
        <NavLink
          to="/itsupport/miscellaneous"
          style={{
            color: "white",
            height: "100%",
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "0 3em",
          }}
          activeStyle={{
            borderBottom: "4px solid #3792cb",
            color: "white",
            height: "100%",
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "0 3em",
          }}
        >
          Miscellaneous
        </NavLink>
      </Button>
    </nav>
  );
});
export default NavBar;
