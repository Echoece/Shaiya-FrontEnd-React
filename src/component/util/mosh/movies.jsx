import React, {Component} from 'react';
import {deleteMovie, getMovies} from '../service/movieService';
import {getGenres} from '../service/genreService';
import Pagination from './common/pagination';
import {paginate} from "../util/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from 'lodash';
import {Link} from "react-router-dom";
import SearchBox from "./common/searchBox";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class Movies extends Component {

    state={
        allMovies: [],
        allGenre:[],
        currentPage:1,
        pageCount: 4,
        searchQuery:'',
        selectedGenre:null,
        sortColumn:{path:'title', order:'asc'}
    }
    async componentDidMount() {
        const genres=await getGenres();
        const genre= [{_id: "",name:"allGenre"},...genres.data];

        const movies = await getMovies();
        this.setState({
            allMovies:movies.data,
            allGenre:genre
        })
    }

    render() {
        if(this.state.allMovies.length===0)
            return <p>there is no movies to show</p>

        const {searchQuery,allGenre,pageCount,currentPage,selectedGenre,sortColumn} = this.state;
        const {user}= this.props;

        const {totalCount, data:movies} = this.getPageData();

        return (
            <div className="container row">

                <div className="col-2 ">
                    <ListGroup Items={allGenre}
                               selectedGenre={selectedGenre}
                               onItemSelect={this.handleGenreSelect}/>
                </div>
                <div className="col-8">
                    <h1 className="h1">Showing {totalCount} movies from the database</h1>

                    {   user &&
                    <Link to='/movies/new'
                          className="btn btn-primary"
                    >
                        Add New Movie
                    </Link>
                    }

                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <MoviesTable movies={movies}
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
        const {allMovies,searchQuery,sortColumn,currentPage,pageCount,selectedGenre} = this.state;

        let filtered= allMovies;
        if(searchQuery){
            filtered= allMovies.filter(
                element=> element.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        }
        else if(selectedGenre && selectedGenre._id)
            filtered=allMovies.filter( element=> element.genre._id === selectedGenre._id);

        const sorted = _.orderBy(filtered, [sortColumn.path],[sortColumn.order]);
        const movies =paginate(sorted,currentPage,pageCount);

        return {totalCount: filtered.length,data:movies};
    };

    handlePageChange = (pageNumber)=>{
        this.setState({currentPage:pageNumber});
    };

    handleSearch= (query)=>{
        this.setState({searchQuery:query, selectedGenre:null,currentPage:1})
    };

    handleDelete=async (movieToDelete)=> {
        const originalMovies = this.state.allMovies;
        const allMovies = originalMovies.filter(element => element._id !== movieToDelete._id);
        this.setState({allMovies});

        try{
            await deleteMovie(movieToDelete._id);
        }catch (e){
            if(e.response && e.response.status=== 404)
                toast.error('this movie has already been deleted');
            this.setState({allMovies:originalMovies })
        }
    };

    handleLike = (movie)=>{
        const movies = [...this.state.allMovies];
        const index=movies.indexOf(movie);
        movies[index].liked=!movies[index].liked;
        this.setState({allMovies:movies});

    }

    handleGenreSelect = (Genre)=> {
        this.setState({selectedGenre:Genre,searchQuery:'', currentPage:1})
    }

    handleSort= (sortColumn)=> {
        this.setState({sortColumn})
    }
}

export default Movies;