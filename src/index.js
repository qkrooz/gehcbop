import ReactDOM from "react-dom";
import App from "./App";
import "./_resources/serverRoutes";
import "./_styles/normalize.css";
import "./_styles/globals.css";
import "antd/dist/antd.css";
// localStorage.clear();
ReactDOM.render(<App />, document.getElementById("root"));
