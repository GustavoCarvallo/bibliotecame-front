import React from 'react';
import "./SideBar.css";
import {Link} from "react-router-dom";

type Props = {
    isAdmin: boolean;
    selected?: number,
}

const userRows = [
    {
        title: 'Búsqueda de Libros',
        icon: 'search',
        path: '',
    },
    {
        title: 'Préstamos Activos',
        icon: 'book',
        path: '',
    },
    {
        title: 'Historial de Préstamos',
        icon: 'history',
        path: ''
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
        title: 'Ejemplares',
        icon: 'copy',
        path: ''
    },
    {
        title: 'Préstamos',
        icon: 'clipboard-list',
        path: ''
    },
    {
        title: 'Sanciones',
        icon: 'ban',
        path: ''
    }
]

const SideBar = (props: Props) => {
    return (
        <div className={"side-bar"}>
            <div className={"name-and-img-container"}>
                <i className="far fa-user-circle user-circle-2x"/>
                <div className={"side-bar-name-container"}>
                    <div className={"side-bar-name"}>Juan Ignacio Rodriguez</div>
                    {props.isAdmin && <div className={"side-bar-name"}>Administrador/a</div>}
                </div>
            </div>
            {renderRows(props.isAdmin, props.selected)}
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
