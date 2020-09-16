import React from "react";
// import { isAdmin } from "../utils/mocksettings.json";  //mocked admin
import { Route, Redirect } from "react-router-dom";
interface props {component: Function, path:string}

const AdminRoute = ({component: Component, ...rest}:props) => {
    return(
        <Route {...rest}
               render={props => {
                   if(localStorage.getItem('admin') === "true") return <Component {...props} />;
                   //If trying to access an admin route as a normal user, redirects to /home.
                   return <Redirect to={{
                       pathname: '/home',
                       state: {from: props.location}
                   }}/>;
               }}
        >

        </Route>
    )
};

export default AdminRoute;