import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.MIDDLE,
};

function App() {
  return (
    <BrowserRouter>
      <Provider template={AlertTemplate} {...options}>
        <MainRouter />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
