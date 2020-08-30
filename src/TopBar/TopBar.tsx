import React from 'react';
import "./TopBar.css";
import {Link} from "react-router-dom";

type Props = {
    isAdmin: boolean;
}

const TopBar = (props: Props) => {
    return(
        <div className={"top-bar"}>
            <div/>
            <div className={"top-bar-title"}><Link to={"/home"} className={"link-un-styled"}>Bibliotecame</Link></div>
            <div className={"vertical-divider"}/>
            <div className={"top-bar-right"}>
                <i className="far fa-user-circle user-circle-regular"/>
                <div className={"top-bar-user-name"}>
                    Juan Ignacio Rodriguez
                    {props.isAdmin && <div>Administrador/a</div>}
                </div>
                <i className="fas fa-sign-out-alt sign-out-alt-solid"/>
            </div>
        </div>
    )
}

export default TopBar;
