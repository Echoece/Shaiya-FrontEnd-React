import React, {Component} from 'react';
import _ from "lodash";

class TableBody extends Component {
    renderCell = (item,column) =>{
        if(column.content)
            return column.content(item);

        return _.get(item,column.path);
    }

    render() {
        const {data,columns} = this.props;
        let id = 0;
        let serial =0;
        return (
            <tbody>
            {data.map(item =>(
                <tr key={item.charId} >
                    <td>{++serial}</td>
                    {columns.map(element=>
                        <td key={++id}>
                            {this.renderCell(item,element)}
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        );
    }
}

export default TableBody;