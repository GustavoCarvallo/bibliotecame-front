import React, {useState} from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import AuthRoute from "./AuthRoute";
import AdminRoute from "./AdminRoute";
import ReverseAuthRoute from "./ReverseAuthRoute";

const Router = () => {
    return (
        <BrowserRouter>
        <Switch>
            <AdminRoute path={"/adminhome"} component={AdminHome}/> //Requires admin role
            <ReverseAuthRoute path={"/login"} component={Login}/> //Requires not being logged in
            <AuthRoute path={"/userhome"} component={Logged}/> //Requires being logged in
            <Route path={"/"} component={Home}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Router;

export function Home() {
    return <h2>Welcome!</h2>;
}

export function Login() {
    return <h2>Here is where you'd log in!</h2>;
}

export function Logged() {
    return <h2>You are a logged user!</h2>;
}

export function AdminHome() {
    return <h2>You are an admin!</h2>;
}