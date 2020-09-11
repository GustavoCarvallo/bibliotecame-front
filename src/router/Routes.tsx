import React, {useEffect, useState} from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import AuthRoute from "./AuthRoute";
import AdminRoute from "./AdminRoute";
import ReverseAuthRoute from "./ReverseAuthRoute";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import "./Routes.css";
import BookScreen from "../book/BookScreen";

const Router = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <TopBar isAdmin/>
                <div className={"side-bar-container"}>
                    <SideBar isAdmin/>
                    <Switch>
                        <AdminRoute path={"/adminHome"} component={AdminHome}/> //Requires admin role
                        <ReverseAuthRoute path={"/login"} component={Login}/> //Requires not being logged in
                        <AuthRoute path={"/userHome"} component={Logged}/> //Requires being logged in
                        <AuthRoute path={"/bookScreen"} component={BookScreen}/>
                        <Route path={"/home"} component={Home}/>
                        <Route path={"/"}> <Redirect to={"/home"}/> </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default Router;

export function Home() {
    return<h2> Welcome!</h2>
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
