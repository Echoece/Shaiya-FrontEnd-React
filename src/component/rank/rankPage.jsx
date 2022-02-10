import React, {Component} from 'react';
import _ from "lodash";
import {paginate} from "../../util/paginate";
import RankTable from "./rankTable";
import Pagination from "../util/pagination";
import SearchBox from "../util/searchBox";
import ListGroup from "../util/listGroup";
import Loading from "../util/loading";
import {getRankData} from "../../service/rank/rankService";


class RankPage extends Component {
    state = {
        allPlayer: [],
        allOptions: [
            {_id: "", name: "All"},
            {_id: 80, name: "Level 70"},
            {_id: 30, name: "Level 30"},
            {_id: 15, name: "Level 15"}
        ],
        currentPage: 1,
        pageCount: 50,
        searchQuery: '',
        selectedLevel:  null,
        sortColumn: {path: 'k1', order: 'desc'}
    }

    async componentDidMount() {
        const {data} = await getRankData();
        this.setState({allPlayer: data});
    }

    /*blank balls bars bubbles cubes cylon spin spinningBubbles spokes
    */

    render() {
        /*const loaderType= ['balls','bars','bubbles','cubes','spin','spinningBubbles','spokes']
        console.log(Math.floor(Math.random() * 10));*/
        // if no data, do nothing
        if (this.state.allPlayer.length === 0)
            return (
                <div className='container d-flex justify-content-center'>
                    <Loading color='#79edda' type='bubbles'/>
                </div>
            )
        // else print table


        const {searchQuery, allOptions, pageCount, currentPage, selectedLevel, sortColumn} = this.state;
        const {totalCount,data: players} = this.getPageData();

        return (
            <div className="d-flex">
                <div className="col-2">
                    <ListGroup Items={allOptions}
                               selectedOption={selectedLevel}
                               onItemSelect={this.handleOptionSelect}/>
                </div>
                <div className="container col-8">
                    <h1 className="text-center">Player Ranking Page</h1>
                    <h5 className='text-danger '>Click on a player name to see detailed stats</h5>
                    <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                    <RankTable charData={players}
                               sortColumn={sortColumn}
                               onLike={this.handleLike}
                               onDelete={this.handleDelete}
                               onSort={this.handleSort}
                    />
                    <Pagination itemCount={totalCount}
                                pageSize={pageCount}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange}/>
                </div>
            </div>
        );

    }

    // filtering, sorting and searching the page data.
    getPageData = () => {
        const {allPlayer, searchQuery, sortColumn, currentPage, pageCount, selectedLevel} = this.state;
        let filtered;
        // adding faction data
        filtered = allPlayer.filter(element => (element.family === 0 || element.family === 1) ? element.faction = "Alliance of Light" : element.faction = "Union of Fury");

        //const unique = [...new Set(filtered)]; or can use lodash uniqby function

        // searching function
        if (searchQuery) {
            filtered = allPlayer.filter(
                element => element.charName.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        }
        // list Group
        else if (selectedLevel && selectedLevel._id)
            filtered = allPlayer.filter(element => element.level === selectedLevel._id);
        // sorting
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        // pagination
        const players = paginate(sorted, currentPage, pageCount);

        return {totalCount: filtered.length, data: players};
    };

    handlePageChange = (pageNumber) => {
        this.setState({currentPage: pageNumber});
    };

    handleSearch = (query) => {
        this.setState({searchQuery: query, selectedLevel: null, currentPage: 1})
    };


    handleLike = (player) => {
        const players = [...this.state.allPlayer];
        const index = players.indexOf(player);
        players[index].liked = !players[index].liked;
        this.setState({allPlayer: players});
    }

    handleOptionSelect = (Level) => {
        this.setState({selectedLevel: Level, searchQuery: '', currentPage: 1})
    }

    handleSort = (sortColumn) => {
        this.setState({sortColumn})
    }
}

export default RankPage;