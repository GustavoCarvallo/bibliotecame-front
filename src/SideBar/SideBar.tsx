import React from 'react';
import "./SideBar.css";

type Props = {
    isAdmin: boolean;
}

const userRows = [
    {
        title: 'Búsqueda de Libros',
        icon: 'search',
    },
    {
        title: 'Préstamos Activos',
        icon: 'book',
    },
    {
        title: 'Historial de Préstamos',
        icon: 'history',
    },
    {
        title: 'Mi Perfil',
        icon: 'user-circle',
    }
];

const adminRows = [
    {
        title: 'Libros',
        icon: 'book',
    },
    {
        title: 'Ejemplares',
        icon: 'copy',
    },
    {
        title: 'Préstamos',
        icon: 'clipboard-list',
    },
    {
        title: 'Sanciones',
        icon: 'ban',
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
            {renderRows(props.isAdmin)}
        </div>
    )
}

function renderRows(isAdmin: boolean){
    const rows = isAdmin ? adminRows:userRows;
        return(
            <>
                {rows.map(row => (
                    <div className={"side-bar-row"}>
                        <i className={`fas fa-${row.icon} row-icon`}/>
                        <div className={"side-bar-row-title"}>{row.title}</div>
                    </div>
                ))}
            </>
        )
}

export default SideBar;
