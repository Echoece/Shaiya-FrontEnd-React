import React, {Component} from 'react';
import Table from "../../util/table/table";
import _ from "lodash";
import Loading from "../../util/loading";
import {getRankData} from "../../../service/rank/rankService";


class PlayerDetail extends Component {
    columns = [
        {   path:'charName',
            label: 'Name',

        },
        {   path:'level',
            label: 'Level'
        },
        {   path:'str',
            label: 'Str '
        },
        {   path:'dex',
            label: 'Dex'
        },
        {   path:'rec',
            label: 'Rec'
        },
        {
            path:'inT',
            label: 'Int',
        },
        {   path:'wis',
            label: 'Wis'
        },
        {   path:'luc',
            label: 'Luc'
        },
        {   path:'statPoint',
            label: 'Stat-Points'
        },
        {
            path:'k1',
            label: 'Kills'
        }
    ];

    state = {
        sortColumn : {path: 'charName', order: 'desc'},
        allPlayer: []
    }

    async componentDidMount() {
        const {data} = await getRankData();
        this.setState({allPlayer: data});
    }


    render() {

        const {sortColumn,allPlayer:data} = this.state;

        const playerUID = parseInt(this.props.match.params.id) ;

        const filtered = data.filter(element => element.userUID === playerUID);
        const sorted=   _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        if(sorted.length > 0)
            return (
                <div className = 'container'>
                    <Table columns = {this.columns}
                           data = {sorted}
                           sortColumn = {sortColumn}
                           onSort = {this.handleSort}
                    />
                </div>
            );

        return (
            <div className='container d-flex justify-content-center'>
                <Loading color='#79edda' type='bubbles'/>
            </div>
        )
    }

    handleSort = (sortColumn) => {
        this.setState({sortColumn})
    }
}



export default PlayerDetail;