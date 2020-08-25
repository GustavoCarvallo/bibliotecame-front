import React, {useState} from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import AuthRoute from "./AuthRoute";

let currentUser = true;

const Router = () => {
    return (
        <Switch>
            <AuthRoute path={"/home"} component={Home}/>
        </Switch>
    )
}

export default Router;

export function Home() {
    if(currentUser) return<h2>Hi, you are logged!</h2>;
    return <h2>You should log in!</h2>;
}

export function About() {
    if(!currentUser) return  <Redirect to="/" />;
    return <h2>About</h2>;
}

export function Logout() {
    currentUser=false;
    return <h2>I logged out!</h2>;
}

export function Login() {
    currentUser=true;
    return <h2>I logged in!</h2>
}

