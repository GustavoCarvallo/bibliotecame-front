import React, {useEffect} from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import AuthRoute from "./AuthRoute";
import ReverseAuthRoute from "./ReverseAuthRoute";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import SignUp from "../signUp/SignUp";
import "./Routes.css";
import {toast, ToastContainer, ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Book from "../Book/Book";
import BookScreen from "../Book/BookScreen";
import Profile from "../Profile/Profile";
import "../common/Notify.css";
import Login from "../Login/Login"
import "../common/Notify.css"
import LoanScreen from "../loan/LoanScreen";
import SanctionsView from "../Sanction/SanctionsView";


export const isAdmin = () => {
    return localStorage.getItem('admin') === 'true';
}

export const fullName = () => {
    return localStorage.getItem('fullName');
}

const Router = () => {

    return (
        <BrowserRouter>
            <script src="https://kit.fontawesome.com/1521e42fd4.js" crossOrigin="anonymous"> </script>
            <div className="App">
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                                closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
                />
                <Switch>
                    <ReverseAuthRoute path={"/login"} component={Login}/> //Requires not being logged in
                    <AuthRoute path={"/book"} component={() => <ContainedComponent children={Book} selected={0}/>}/>
                    <Route path={"/signup"} component={SignUp}/>
                    <AuthRoute path={'/profile'} component={ProfileView}/>
                    <AuthRoute path={"/home"} component={Home}/>
                    <AuthRoute path={"/loans"} component={() => <ContainedComponent children={LoanScreen} selected={1}/>}/>
                    <AuthRoute path={"/sanctions"} component={() => <ContainedComponent children={SanctionsView} selected={2}/>}/>
                    <AuthRoute path={"/bookScreen"} component={BookScreen}/>
                    <Route path={"/"}> <Redirect to={"/home"}/> </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

type ContainedComponentProps = {
    children: Function,
    selected?: number,
}

const ContainedComponent = (props: ContainedComponentProps) => {
    return(
        <div>
            <TopBar/>
            <div className={"side-bar-container"}>
                <SideBar selected={props.selected}/>
                {props.children()}
            </div>
        </div>
    )
}

export function Home() {
    return (
        <div>
            <TopBar/>
            <div className={"side-bar-container"}>
                <SideBar/>
                <h2>Welcome!</h2>
            </div>
        </div>
    );
}

export function ProfileView() {
    return (
        <div>
            <TopBar/>
            <div className={"side-bar-container"}>
                <SideBar selected={3}/>
                <Profile/>
            </div>
        </div>
    );
}

export default Router;
