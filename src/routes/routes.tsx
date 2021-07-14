import loadable from "@loadable/component";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Game } from "../pages/Game";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Setting } from "../pages/Setting";
import { User } from "../pages/User";
import { UserInGame } from "../pages/UserInGame";

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
        <Route exact path="/play-game" component={UserInGame} />
      </Switch>
    </MainLayout>
  );
};

export { AuthRouters };
