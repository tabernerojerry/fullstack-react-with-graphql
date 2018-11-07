import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Search from "./Recipe/Search";
import AddRecipe from "./Recipe/AddRecipe";
import RecipePage from "./Recipe/RecipePage";
import Profile from "./Profile";

import withSession from "./withSession";

const Router = ({ refetch, authSession }) => (
  <BrowserRouter>
    <Fragment>
      <Header authSession={authSession} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />

        <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
        <Route path="/signup" render={() => <SignUp refetch={refetch} />} />

        <Route
          path="/recipe/add"
          render={() => <AddRecipe authSession={authSession} />}
        />
        <Route path="/recipes/:_id" component={RecipePage} />

        <Route
          path="/profile"
          render={() => <Profile authSession={authSession} />}
        />
      </Switch>
      <Footer />
    </Fragment>
  </BrowserRouter>
);

export default withSession(Router);
