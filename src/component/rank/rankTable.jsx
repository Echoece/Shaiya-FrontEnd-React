import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Like from "../util/like";
import Table from "../util/table/table";
import _ from "lodash";
import {MapIDToName} from "./mapID";


class RankTable extends Component {
    // columns of the table, those who have content, will be rendered the content
    columns = [
        {   path:'charName',
            label: 'Name',
            content: player=> (<Link  className="link-success text-decoration-none text-danger "
                    /*  this is one way to pass data through link, but better to use redux, or context api.
                        to={
                            {
                                pathname: `/rank/${player.charId}`,
                                allPlayers:  this.props.data.filter(element => element.userUID === player.userUID)
                            }
                        }
                    */
                    to={`/rank/${player.userUID}`}


                >
                    {player.charName}
                </Link>
            )
        },
        {   path:'faction',
            label: 'Faction'
        },
        {   path:'map',
            label: 'Last Seen',
            content: player =>(MapIDToName[player.map]? MapIDToName[player.map]: `Map ${player.map}`)
        },
        {   path:'k1',
            label: 'Kills'
        },
        {   key:'loginStatus',
            label: 'Status',
            content: player=>(
                <span className={parseInt(player.loginStatus)===1 ?'text-success': 'text-danger'}>
                    {parseInt(player.loginStatus)===1 ? 'Online': 'Offline'}
                </span>
            )
        }/*,
        {
            key:'Favourite',
            label: 'Like',
            content: player => (
                <Like liked={player.liked}
                       onClick={()=>this.props.onLike(player)}/>
            )
        }*/
    ];
    render() {
        const {charData,sortColumn,onSort}=this.props;

        return (
            <Table columns={this.columns}
                   //data={charData}
                   data={_.uniqBy(charData,'userUID')}      // lodash function to get the unique value from
                   sortColumn={sortColumn}
                   onSort={onSort}
            />
        );
    }
}

export default RankTable;