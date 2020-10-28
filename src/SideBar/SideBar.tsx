import React from 'react';
import "./SideBar.css";
import {Link} from "react-router-dom";
import {isAdmin} from "../router/Routes";

type Props = {
    selected?: number,
}

const userRows = [
    {
        title: 'Búsqueda de Libros',
        icon: 'search',
        path: '/book',
    },
    {
        title: 'Préstamos Activos',
        icon: 'book',
        path: '/loans',
    },
    {
        title: 'Historial de Préstamos',
        icon: 'history',
        path: '/loan-history'
    },
    {
        title: 'Mi Perfil',
        icon: 'user-circle',
        path: '/profile'
    }
];

const adminRows = [
    {
        title: 'Libros',
        icon: 'book',
        path: '/book'
    },
    {
        title: 'Préstamos',
        icon: 'clipboard-list',
        path: '/loans'
    },
    {
        title: 'Sanciones',
        icon: 'ban',
        path: '/sanctions'
    },
    {
        title: 'Solic. Incorporación',
        icon: 'exclamation-circle',
        path: '/incorporation'
    },
    {
        title: 'Mi Perfil',
        icon: 'user-circle',
        path: '/profile'
    }
]

const SideBar = (props: Props) => {
    const admin = isAdmin();

    return (
        <div className={"side-bar"}>
            <div className={"name-and-img-container"}>
                <div className={"name-and-img"}>
                    <i className="far fa-user-circle user-circle-2x"/>
                    <div className={"side-bar-name-container"}>
                        <div className={"side-bar-name"}>{localStorage.getItem('fullName')}</div>
                        {admin && <div className={"side-bar-name"}>Administrador/a</div>}
                    </div>
                </div>
            </div>
            {renderRows(admin, props.selected)}
        </div>
    )
}

function renderRows(isAdmin: boolean, selected?: number) {
    const rows = isAdmin ? adminRows : userRows;
    return (
        <>
            {rows.map((row, index) => (
                <Link to={row.path} className={"link-un-styled"}>
                    <div className={"side-bar-row" + (selected === index ? " selected-row" : "")}>
                        <i className={`fas fa-${row.icon} row-icon`}/>
                        <div className={"side-bar-row-title"}>{row.title}</div>
                    </div>
                </Link>
            ))}
        </>
    )
}

export default SideBar;
