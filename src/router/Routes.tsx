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

export type UserInformation = {
    fullName: string | null,
    isAdmin: boolean
}

const Router = () => {

    const [userInformation, setUserInformation] = React.useState<UserInformation>({
        fullName: null,
        isAdmin: false,
    });

    return (
        <BrowserRouter>
            <script src="https://kit.fontawesome.com/1521e42fd4.js" crossOrigin="anonymous"> </script>
            <div className="App">
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                                closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
                />
                <Switch>
                    <ReverseAuthRoute path={"/login"} component={() => <Login setUserInformation={setUserInformation}/>}/> //Requires not being logged in
                    <AuthRoute path={"/book"} component={() => <ContainedComponent children={() => <Book isAdmin={userInformation.isAdmin}/>} userInformation={userInformation} selected={0}/>}/>
                    <Route path={"/signup"} component={SignUp}/>
                    <AuthRoute path={'/profile'} component={() => <ProfileView userInformation={userInformation}/>}/>
                    <AuthRoute path={"/home"} component={() => <Home userInformation={userInformation}/>}/>
                    <AuthRoute path={"/loans"} component={() => <ContainedComponent children={LoanScreen} userInformation={userInformation} selected={1}/>}/>
                    <AuthRoute path={"/sanctions"} component={() => <ContainedComponent children={() => <SanctionsView/>} userInformation={userInformation} selected={2}/>}/>
                    <AuthRoute path={"/bookScreen"} component={BookScreen}/>
                    <Route path={"/"}> <Redirect to={"/home"}/> </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

type ContainedComponentProps = {
    userInformation: UserInformation,
    children: Function,
    selected?: number,
}

const ContainedComponent = (props: ContainedComponentProps) => {
    return(
        <div>
            <TopBar isAdmin={props.userInformation.isAdmin}/>
            <div className={"side-bar-container"}>
                <SideBar isAdmin={props.userInformation.isAdmin} selected={props.selected}/>
                {props.children()}
            </div>
        </div>
    )
}

export function Home({userInformation}: {userInformation: UserInformation}) {
    return (
        <div>
            <TopBar isAdmin={userInformation.isAdmin}/>
            <div className={"side-bar-container"}>
                <SideBar isAdmin={userInformation.isAdmin}/>
                <h2>Welcome!</h2>
            </div>
        </div>
    );
}

export function ProfileView({userInformation}: {userInformation: UserInformation}) {
    return (
        <div>
            <TopBar isAdmin={userInformation.isAdmin}/>
            <div className={"side-bar-container"}>
                <SideBar isAdmin={userInformation.isAdmin} selected={3}/>
                <Profile/>
            </div>
        </div>
    );
}

export default Router;
