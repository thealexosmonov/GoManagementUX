import React from 'react';
import './App.css';
import {Switch, Route, Redirect, Router} from "react-router-dom";
import {history} from "./history";
import {SignInPage} from "./pages/signin.page";
import {RegisterPage} from "./pages/register.page";
import {UserDashboardPage} from "./pages/user.dashboard.page";
import {AdminDashboardPage} from "./pages/admin.dashboard.page";

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path={"/register"} exact component={RegisterPage} />
                    <Route path={"/dashboard/admin"} exact component={AdminDashboardPage} />
                    <Route path={"/dashboard/user"} exact component={UserDashboardPage} />
                    <Route path={"/signin"} exact component={SignInPage} />
                    <Redirect to={"/signin"} />
                </Switch>
            </Router>
        );
    }
}

export { App };