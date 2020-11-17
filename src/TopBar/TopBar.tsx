import React from 'react';
import "./TopBar.css";
import {Link} from "react-router-dom";
import {deleteToken} from "../utils/http";
import {fullName, isAdmin} from "../router/Routes";
import ReactTooltip from "react-tooltip";


const TopBar = ({defaultFullName}: {defaultFullName?: string}) => {
    const admin = isAdmin();

    return (
        <div className={"top-bar"}>
            <div/>
            <div className={"top-bar-title"}><Link to={"/book"} className={"link-un-styled"}>Bibliotecame</Link></div>
            <div className={"vertical-divider"}/>
            <div className={"top-bar-right"}>
                <i className="far fa-user-circle user-circle-regular"/>
                <div className={"top-bar-user-name"}>
                    {defaultFullName ?? fullName()}
                    {admin && <div>Administrador/a</div>}
                </div>
                <Link to={'/login'} className={'link-un-styled log-out-icon-container'} onClick={deleteToken}>
                    <ReactTooltip/>
                    <i className="fas fa-sign-out-alt sign-out-alt-solid" data-tip={"Salir"}/>
                </Link>
            </div>
        </div>
    )
}

export default TopBar;
