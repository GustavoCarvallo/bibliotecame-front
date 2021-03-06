import React from "react";
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
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Book from "../Book/Book";
import BookScreen from "../Book/BookScreen";
import Profile from "../Profile/Profile";
import "../common/Notify.css";
import Login from "../Login/Login"
import "../common/Notify.css"
import LoanScreen from "../loan/LoanScreen";
import SanctionsView from "../Sanction/SanctionsView";
import LoanHistory from "../LoanHistory/LoanHistory";
import ResetPassword from "../Login/ResetPassword/ResetPassword";
import NewPassword from "../Login/ResetPassword/NewPassword";
import VerifyToken from "../Login/VerifyToken";
import AdminIncorporationScreen from "../Incorporation/AdminIncorporation/AdminIncorporationScreen";
import IncorporationRequestScreen from "../Incorporation/StudentIncorporation/IncorporationRequestScreen";
import Dashboard from "../Dashboard/Dashboard";

export const isAdmin = () => {
    return localStorage.getItem('admin') === 'true';
}

export const fullName = () => {
    return localStorage.getItem('fullName');
}

export const notifyError = (message: string) => {
    toast.dismiss()
    toast.error(message)
}

export const notifySuccess = (message: string) => {
    toast.dismiss();
    toast.success(message);
}

const Router = () => {

    return (
        <BrowserRouter>

            <div className="App">
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false}
                                closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover closeButton={true}
                />
                <Switch>
                    <ReverseAuthRoute path={"/login"} component={Login}/> //Requires not being logged in
                    <AuthRoute path={"/book"} component={() => <ContainedComponent children={Book} selected={isAdmin() ? 1 : 0}/>}/>
                    <Route path={"/signup"} component={SignUp}/>
                    <AuthRoute path={'/profile'} component={ProfileView}/>
                    <ReverseAuthRoute path={"/forgotPassword"} component={ResetPassword}/>
                    <ReverseAuthRoute path={"/reset/:token"} component={NewPassword}/>
                    <AuthRoute path={"/loans"} component={() => <ContainedComponent children={LoanScreen} selected={isAdmin() ? 2 : 1}/>}/>
                    <AuthRoute path={"/loan-history"} component={() => <ContainedComponent children={LoanHistory} selected={2}/>}/>
                    <AuthRoute path={"/incorporation-request"} component={() => <ContainedComponent children={IncorporationRequestScreen} selected={3}/>}/>
                    <AuthRoute path={"/sanctions"} component={() => <ContainedComponent children={SanctionsView} selected={3}/>}/>
                    <AuthRoute path={"/incorporation"} component={() => <ContainedComponent children={AdminIncorporationScreen} selected={4}/>}/>
                    <AuthRoute path={"/dashboard"} component={() => <ContainedComponent children={Dashboard} selected={0}/>}/>
                    <AuthRoute path={"/bookScreen"} component={BookScreen}/>
                    <ReverseAuthRoute path={"/verify/:token"} component={() => <VerifyToken/>}/>
                    <Route path={"/"}> <Redirect to={isAdmin() ? "/dashboard" : "/book"}/> </Route>
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

export function ProfileView() {
    const [fullName, setFullName] = React.useState<string | undefined>(undefined);

    return (
        <div>
            <TopBar defaultFullName={fullName}/>
            <div className={"side-bar-container"}>
                <SideBar selected={isAdmin()? 5 : 4} defaultFullName={fullName}/>
                <Profile setFullName={setFullName}/>
            </div>
        </div>
    );
}

export default Router;
