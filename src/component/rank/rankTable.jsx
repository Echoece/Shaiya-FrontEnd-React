import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Like from "../util/like";
import Table from "../util/table/table";

class RankTable extends Component {
    // columns of the table, those who have content, will be rendered the content
    columns = [
        {   path:'charName',
            label: 'Name',
            content: player=> (<Link
                    to={`/rank/${player.charId}`}
                >
                    {player.charName}
                </Link>
            )
        },
        {   path:'faction',
            label: 'Faction'
        },
        {   path:'map',
            label: 'Last Seen'
        },
        {   path:'k1',
            label: 'Kills'
        },
        {   path:'loginStatus',
            label: 'Status'
        },
        {
            key:'Favourite',
            label: 'Like',
            content: player => (
                <Like liked={player.liked}
                       onClick={()=>this.props.onLike(player)}/>
            )
        }
    ];
    render() {
        const {charData,sortColumn,onSort}=this.props;
        return (
            <Table columns={this.columns}
                   data={charData}
                   sortColumn={sortColumn}
                   onSort={onSort}
            />
        );
    }
}

export default RankTable;