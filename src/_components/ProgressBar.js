import React, { useContext } from "react";
import { Context } from "../_resources/context";
import "../_styles/progressbar.css";
const ProgressBar = React.memo(() => {
  const { mainProgressState } = useContext(Context);
  const [mainProgress, setMainProgress] = mainProgressState;
  return (
    <div className="progress-background">
      <div className="progress-bar" style={{ width: mainProgress + "%" }}></div>
    </div>
  );
});
export default ProgressBar;
