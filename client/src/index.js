import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Errorboundary from "./ErrorBounday";

ReactDOM.render(
  <Errorboundary>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Errorboundary>,
  document.getElementById("root")
);
