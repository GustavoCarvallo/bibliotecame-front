import React , { FC } from "react";
import { Route, Redirect } from "react-router-dom";
interface props {component: FC}
const AuthRoute = ({component: Component, ...rest}:props) => {
    const isLoggedIn = true;
    return(
        <Route {...rest}
            render={props => {
            if(isLoggedIn) return <Component {...props} />;
            return <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>;
            }}
        >

        </Route>
    )
};

export default AuthRoute;