import React from "react";
import { loggedUser } from "../utils/mocksettings.json";  //mocked user login
import { Route, Redirect } from "react-router-dom";
interface props {component: Function, path:string}
const ReverseAuthRoute = ({component: Component, ...rest}:props) => {
    return(
        <Route {...rest}
               render={props => {
                   if(!loggedUser) return <Component {...props} />;
                   //If trying to access a login site when already logged, redirects to /userhome.
                   return <Redirect to={{
                       pathname: '/userhome',
                       state: {from: props.location}
                   }}/>;
               }}
        >

        </Route>
    )
};

export default ReverseAuthRoute;