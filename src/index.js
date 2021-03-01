import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./_resources/serverRoutes";
import "./_styles/normalize.css";
import "./_styles/globals.css";
import "antd/dist/antd.css";
ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
