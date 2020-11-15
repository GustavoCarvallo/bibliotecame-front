import React from "react";
import { Route, Redirect } from "react-router-dom";
interface props {component: Function, path:string}
const ReverseAuthRoute = ({component: Component, ...rest}:props) => {
    return(
        <Route {...rest}
               render={props => {
                   if(!localStorage.getItem('token')) return <Component {...props} />;
                   //If trying to access a login site when already logged, redirects to /userhome.
                   return <Redirect to={{
                       pathname: '/home',
                       state: {from: props.location}
                   }}/>;
               }}
        >

        </Route>
    )
};

export default ReverseAuthRoute;