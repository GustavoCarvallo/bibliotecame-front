import React from "react";
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
import SignUp from "../signUp/SignUp";
import "./Routes.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Router = () => {
    return (
        <BrowserRouter>
            <script src="https://kit.fontawesome.com/1521e42fd4.js" crossOrigin="anonymous"></script>
            <div className="App">
                <Switch>
                    <ReverseAuthRoute path={"/login"} component={Login}/> //Requires not being logged in
                    <AuthRoute path={"/userhome"} component={Logged}/> //Requires being logged in
                    <Route path={"/signup"} component={signUp}/>
                    <AdminRoute path={"/adminhome"} component={AdminHome}/> //Requires admin role
                    <Route path={"/home"} component={Home}/>
                    <Route path={"/"}> <Redirect to={"/home"}/> </Route>
                </Switch>

            </div>
        </BrowserRouter>
    )
}

export default Router;

export function signUp(){
    return <SignUp/>
}

export function Home() {
    return (
        <div>
            <TopBar isAdmin/>
            <div className={"side-bar-container"}>
                <SideBar isAdmin/>
                <h2>Welcome!</h2>
            </div>
        </div>
    );
}

export function Login() {   //En implementacion, pasar esto.

    const url = window.location.href;
    const urlParts = url.split('?');
    const isSuccess : boolean = urlParts[1] === "success";

    const notify = () => toast.success('Se ha registrado exitosamente!', {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined});

    if(isSuccess){
        notify();
        window.history.replaceState("","",urlParts[0])
    }
    return (
        <div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
            />
            <h2>Here is where you'd log in!</h2>
        </div>
    );
}

export function Logged() {
    return <h2>You are a logged user!</h2>;
}

export function AdminHome() {
    return (
        <div>
            <TopBar isAdmin/>
            <div className={"side-bar-container"}>
                <SideBar isAdmin/>
                <h2>You are an admin!</h2>
            </div>
        </div>
    );
}
