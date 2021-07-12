import "antd/dist/antd.css";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Redirect } from "react-router-dom";
import { auth } from "../initialFirebase";
import { AuthRouters, UnAuthRouters } from "../routes/routes";
import "./style.css";

function App() {
  const [initialState, setInitialState] = useState(true);
  const user = auth.currentUser;

  if (!initialState) return <div className="loader"></div>;
  return (
    <HelmetProvider>
      <Helmet titleTemplate="A1k49 Since 1998" defaultTitle="A1K49 since 1998">
        <meta name="description" content="A1k49 Since 1998" />
      </Helmet>
      <BrowserRouter>
        {user == null ? (
          <Fragment>
            <Redirect to={"/login"} />
            <UnAuthRouters />
          </Fragment>
        ) : (
          <AuthRouters />
        )}
        )
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
