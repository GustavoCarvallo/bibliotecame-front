import React from "react";
import { Route, Redirect } from "react-router-dom";
interface props {component: Function, path:string}
const AuthRoute = ({component: Component, ...rest}:props) => {
    return(
        <Route {...rest}
            render={props => {
            if(localStorage.getItem('token')) return <Component {...props} />;
            //If trying to access a logged user route while not being logged in, redirects to /login.
            return <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>;
            }}
        >

        </Route>
    )
};

export default AuthRoute;