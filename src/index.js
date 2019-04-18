import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

document.querySelector("html").style.overflowY = "scroll";
document.querySelector("body").style.backgroundColor = "#8eacbb";

ReactDOM.render(<App />, document.getElementById("root"));
