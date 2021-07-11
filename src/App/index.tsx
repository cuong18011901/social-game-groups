import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { AuthRouters } from "../routes/routes";
import "antd/dist/antd.css";
import "./style.css";

function App() {
  const [initialState, setInitialState] = useState(true);

  if (!initialState) return <div className="loader"></div>;

  return (
    <HelmetProvider>
      <Helmet titleTemplate="Edu Demo" defaultTitle="Edu Demo">
        <meta name="description" content="Edu Demo" />
      </Helmet>
      <BrowserRouter>
        <AuthRouters />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
