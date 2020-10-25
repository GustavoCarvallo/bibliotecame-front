import React from 'react';
import ReactPaginate from "react-paginate";
import "./GenericPagination.css";

type Props = {
    pageCount: number,
    forcePage: number,
    onPageChange: (selected: number)=>void;
}

const GenericPagination = (props: Props) => {
    return(
        <ReactPaginate pageCount={props.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={4}
                       forcePage={props.forcePage}
                       onPageChange={(data) => props.onPageChange(data.selected)}
                       nextLabel={"Próximo"}
                       previousLabel={"Anterior"}
                       breakLabel={'...'}
                       pageClassName={"pagination-page"}
                       nextClassName={"pagination-next"}
                       previousClassName={"pagination-previous"}
                       breakClassName={"pagination-break"}
                       activeClassName={"pagination-active-page"}
                       containerClassName={"pagination-container"}/>
    )
}

export default GenericPagination;
