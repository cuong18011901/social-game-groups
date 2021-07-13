import "antd/dist/antd.css";
import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { AuthRouters } from "../routes/routes";
import "./style.css";

function App() {
  const [initialState, setInitialState] = useState(true);

  if (!initialState) return <div className="loader"></div>;
  return (
    <HelmetProvider>
      <Helmet titleTemplate="A1k49 Since 1998" defaultTitle="A1K49 since 1998">
        <meta name="description" content="A1k49 Since 1998" />
      </Helmet>
      <BrowserRouter>
        <AuthRouters />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
