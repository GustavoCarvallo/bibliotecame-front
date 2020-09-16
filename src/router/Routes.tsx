import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    useParams
} from "react-router-dom";
import AuthRoute from "./AuthRoute";
import AdminRoute from "./AdminRoute";
import ReverseAuthRoute from "./ReverseAuthRoute";
import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import SignUp from "../signUp/SignUp";
import "./Routes.css";
import 'react-toastify/dist/ReactToastify.css';
import Book from "../Book/Book";
import BookScreen from "../Book/BookScreen";
import Profile from "../Profile/Profile";
import Login from "../Login/Login"

const Router = () => {
    return (
        <BrowserRouter>
            <script src="https://kit.fontawesome.com/1521e42fd4.js" crossOrigin="anonymous"> </script>
            <div className="App">
                <Switch>
                    <ReverseAuthRoute path={"/login"} component={Login}/> //Requires not being logged in
                    <AdminRoute path={"/book"} component={() => <ContainedComponent children={Book} isAdmin={true} selected={0}/>}/>
                    <Route path={"/signup"} component={SignUp}/>
                    <AuthRoute path={'/profile/:userId'} component={ProfileView}/>
                    <AuthRoute path={"/home"} component={Home}/>
                    <AuthRoute path={"/bookScreen"} component={BookScreen}/>
                    <Route path={"/"}> <Redirect to={"/home"}/> </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

type ContainedComponentProps = {
    isAdmin: boolean,
    children: Function,
    selected?: number,
}

const ContainedComponent = (props: ContainedComponentProps) => {
    return(
        <div>
            <TopBar isAdmin/>
            <div className={"side-bar-container"}>
                <SideBar isAdmin selected={props.selected}/>
                {props.children()}
            </div>
        </div>
    )
}

export function Home() {
    const isAdmin = localStorage.getItem('admin');
    let adminBool = false;
    if(isAdmin === 'true') adminBool = true;
    return (
        <div>
            <TopBar isAdmin={adminBool}/>
            <div className={"side-bar-container"}>
                <SideBar isAdmin={adminBool}/>
                <h2>Welcome!</h2>
            </div>
        </div>
    );
}

export function ProfileView() {

    let {userId} = useParams();

    return (
        <div>
            <TopBar isAdmin={false}/>
            <div className={"side-bar-container"}>
                <SideBar isAdmin={false}/>
                <Profile pathVariable={userId}/>
            </div>
        </div>
    );
}

export default Router;