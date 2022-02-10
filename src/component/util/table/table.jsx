import React from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import './table.css'

const Table = (props) => {
    const {columns,sortColumn,onSort,data} = props;
    return (
        <table className="table customTable">
            <TableHeader onSort={onSort}
                         columns={columns}
                         sortColumns={sortColumn}
            />
            <TableBody data={data}
                       columns={columns}
            />
        </table>
    );
};

export default Table;
