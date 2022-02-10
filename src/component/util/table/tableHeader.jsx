import React, {Component} from 'react';

// columns: array of columns
// sortColumn: object with sorting column props
// onSort: function for sorting

class TableHeader extends Component {
    raiseSort = (path) => {
        const sortColumn = {...this.props.sortColumns};
        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        return this.props.onSort(sortColumn);
    }

    renderSortIcon= (column)=> {
        if(column.path !== this.props.sortColumns.path)
            return null;

        if(this.props.sortColumns.order==='asc')
            return <i className="fa fa-sort-asc"/>

        return <i className="fa fa-sort-desc"/>
    }
    render() {
        return (
            <thead>
            <tr>
                <th>Rank</th>
                {this.props.columns.map(column =>
                    <th key={column.path || column.key}
                        onClick={() => this.raiseSort(column.path)}
                        className="clickable"
                    >
                        {column.label} {this.renderSortIcon(column)}
                    </th>
                )}
            </tr>
            </thead>
        );
    }
}

export default TableHeader;