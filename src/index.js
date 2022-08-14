import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import SlideView from "./Components/SlideView";

ReactDOM.render(
  <LocalizationProvider dateAdapter={AdapterLuxon}>
    <App />
  </LocalizationProvider>,
  document.getElementById("root")
);
