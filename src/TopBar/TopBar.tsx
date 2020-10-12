import React from 'react';
import "./TopBar.css";
import {Link} from "react-router-dom";
import {deleteToken} from "../utils/http";

type Props = {
    isAdmin: boolean;
}

const TopBar = (props: Props) => {
    return (
        <div className={"top-bar"}>
            <div/>
            <div className={"top-bar-title"}><Link to={"/book"} className={"link-un-styled"}>Bibliotecame</Link></div>
            <div className={"vertical-divider"}/>
            <div className={"top-bar-right"}>
                <i className="far fa-user-circle user-circle-regular"/>
                <div className={"top-bar-user-name"}>
                    {localStorage.getItem('fullName')}
                    {props.isAdmin && <div>Administrador/a</div>}
                </div>
                <Link to={'/login'} className={'link-un-styled log-out-icon-container'} onClick={deleteToken}>
                    <i className="fas fa-sign-out-alt sign-out-alt-solid"/>
                </Link>
            </div>
        </div>
    )
}

export default TopBar;
