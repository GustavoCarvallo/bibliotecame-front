import React, {useEffect} from 'react';
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import {get} from "../../utils/http";
import {Book} from "../Book";
import "./SearchBookTable.css";
import ActivateOrDeactivateButton from "./ActivateOrDeactivateButton";

type Props = {
    isAdmin: boolean,
    openBookDetails: (id: number) => void,
}

const constColumns: Column[] = [
    {
        header: 'Titulo',
        accessor: 'title'
    },
    {
        header: 'Autor',
        accessor: 'author'
    },
    {
        header: 'Editorial',
        accessor: 'publisher'
    },
]

const SearchBookTable = (props: Props) => {
    const columns: Column[] =
        [
            ...constColumns,
            {
                header: 'Acciones',
                component: props.isAdmin ?
                    (row => (
                        <div className={'admin-search-actions'}>
                            <ActivateOrDeactivateButton defaultValue={row.active} id={row.id}/>
                            <i className={"fas fa-edit search-book-green-icon"}
                               onClick={() => props.openBookDetails(row.id)}/>
                        </div>
                    ))
                    :
                    (row => (<i className={"fas fa-eye search-book-eye"}
                                onClick={() => props.openBookDetails(row.id)}/>))
            }
        ];

    const [books, setBooks] = React.useState<Book[]>([])

    useEffect(() => {
        get('book')
            .then(res => setBooks(res))
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <GenericTable columns={columns}
                          className={"table--4cols"}
                          data={books}/>
        </>
    )
}

export default SearchBookTable;
