import loadable from "@loadable/component";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import { Game } from "../pages/Game";
import { Setting } from "../pages/Setting";
import { User } from "../pages/User";

const MainLayout = loadable(() => import("../layouts"));

const AuthRouters = () => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/user" component={User} />
        <Route exact path="/setting" component={Setting} />
      </Switch>
    </MainLayout>
  );
};
export { AuthRouters };
