import React, {Component} from 'react';
import _ from "lodash";
import {paginate} from "../../util/paginate";
import RankTable from "./rankTable";
import Pagination from "../util/pagination";
import SearchBox from "../util/searchBox";
import ListGroup from "../util/listGroup";


class RankPage extends Component {
    state = {
        allPlayer: [
            {
                "map": 42,
                "level": 80,
                "family": 3,
                "charId": 1,
                "charName": "DDD",
                "del": 0,
                "k1": 400000,
                "loginStatus": 0,
                "userUID": 1
            },
            {
                "map": 42,
                "level": 1,
                "family": 3,
                "charId": 2,
                "charName": "CCC",
                "del": 0,
                "k1": 6000,
                "loginStatus": 0,
                "userUID": 2
            },
            {
                "map": 70,
                "level": 80,
                "family": 3,
                "charId": 3,
                "charName": "FFF",
                "del": 1,
                "k1": 12333,
                "loginStatus": 0,
                "userUID": 2
            },
            {
                "map": 0,
                "level": 80,
                "family": 0,
                "charId": 4,
                "charName": "EEE",
                "del": 0,
                "k1": 170,
                "loginStatus": 0,
                "userUID": 3
            },
            {
                "map": 42,
                "level": 80,
                "family": 2,
                "charId": 5,
                "charName": "BBB",
                "del": 0,
                "k1": 350000,
                "loginStatus": 0,
                "userUID": 1
            },
            {
                "map": 2,
                "level": 80,
                "family": 2,
                "charId": 6,
                "charName": "XXX",
                "del": 0,
                "k1": 50000,
                "loginStatus": 0,
                "userUID": 1
            },
            {
                "map": 1,
                "level": 1,
                "family": 0,
                "charId": 7,
                "charName": "JJJJ",
                "del": 0,
                "k1": 700000,
                "loginStatus": 0,
                "userUID": 3
            },
            {
                "map": 42,
                "level": 80,
                "family": 0,
                "charId": 8,
                "charName": "RRR",
                "del": 0,
                "k1": 400000,
                "loginStatus": 0,
                "userUID": 10
            },
            {
                "map": 42,
                "level": 1,
                "family": 1,
                "charId": 9,
                "charName": "test",
                "del": 0,
                "k1": 50,
                "loginStatus": 0,
                "userUID": 10
            },
            {
                "map": 42,
                "level": 1,
                "family": 0,
                "charId": 10,
                "charName": "addasd",
                "del": 1,
                "k1": 1,
                "loginStatus": 0,
                "userUID": 10
            },
            {
                "map": 42,
                "level": 1,
                "family": 0,
                "charId": 11,
                "charName": "shutdown",
                "del": 1,
                "k1": 0,
                "loginStatus": 0,
                "userUID": 10
            }
        ],
        allOptions: [
            {_id: "", name: "All"},
            {_id: 80, name: "Level 70"},
            {_id: 30, name: "Level 30"},
            {_id: 15, name: "Level 15"}
        ],
        currentPage: 1,
        pageCount: 50,
        searchQuery: '',
        selectedLevel: null,
        sortColumn: {path: 'k1', order: 'desc'}
    }


    componentDidMount() {
        // const charData = get data from api; then setstate into all player
    }


    render() {
        // if no data, do nothing
        if (this.state.allPlayer.length === 0)
            return <p>there is no movies to show</p>
        // else print table
        const {searchQuery, allOptions, pageCount, currentPage, selectedLevel, sortColumn} = this.state;
        const {totalCount, data:players} = this.getPageData();

        return (
            <div className=" row">
                <div className="col-2">
                    <ListGroup Items={allOptions}
                               selectedGenre={selectedLevel}
                               onItemSelect={this.handleOptionSelect}/>
                </div>
                <div className="container col-8">
                        <h1 className="h1 text-center">Player Ranking Page</h1>
                        <SearchBox value={searchQuery} onChange={this.handleSearch} />
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

    getPageData = ()=>{
        const {allPlayer,searchQuery,sortColumn,currentPage,pageCount,selectedLevel} = this.state;

        let filtered;
        // adding faction data
        filtered=allPlayer.filter(element=> (element.family===0 || element.family===1)? element.faction="Alliance of Light": element.faction="Union of Fury"  );
        // searching function
        if(searchQuery){
            filtered= allPlayer.filter(
                element=> element.charName.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        }
        // list Group
        else if(selectedLevel && selectedLevel._id)
            filtered=allPlayer.filter( element=> element.level === selectedLevel._id);
        // sorting
        const sorted = _.orderBy(filtered, [sortColumn.path],[sortColumn.order]);
        // pagination
        const players =paginate(sorted,currentPage,pageCount);

        return {totalCount: filtered.length,data:players};
    };

    handlePageChange = (pageNumber)=>{
        this.setState({currentPage:pageNumber});
    };

    handleSearch= (query)=>{
        this.setState({searchQuery:query, selectedLevel:null,currentPage:1})
    };


    handleLike = (player)=>{
        const players = [...this.state.allPlayer];
        const index = players.indexOf(player);
        players[index].liked=!players[index].liked;
        this.setState({allPlayer:players});
    }

    handleOptionSelect = (Level)=> {
        this.setState({selectedLevel:Level,searchQuery:'', currentPage:1})
    }

    handleSort= (sortColumn)=> {
        this.setState({sortColumn})
    }
}

export default RankPage;