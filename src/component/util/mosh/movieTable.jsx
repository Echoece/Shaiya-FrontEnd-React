import Liked from "./common/like";
import React, {Component} from 'react';
import Table from "./common/table/table";
import {Link} from "react-router-dom";
import {getCurrentUser} from "../service/authService";



class MoviesTable extends Component {
    // columns of the table, those who have content, will be rendered the content
    columns = [
        {   path:'title'
            ,label: 'Title'
            ,content: movie=> (<Link
                    to={`/movies/${movie._id}`}
                >
                    {movie.title}
                </Link>
            )
        },
        {   path:'genre.name'
            , label: 'Genre'
        },
        {   path:'numberInStock'
            , label: 'Stock'
        },
        {   path:'dailyRentalRate'
            , label: 'Rate'
        },
        {
            key:'like',
            content: movie => (
                <Liked liked={movie.liked}
                       onClick={()=>this.props.onLike(movie)}/>
            )
        }
    ];

    deleteColumn = {
        key:'delete',
        content: movie => (
            <button className="btn btn-danger"
                    onClick={()=>this.props.onDelete(movie)}>
                Delete
            </button>
        )

    }

    constructor() {
        super();
        const user= getCurrentUser();
        if(user && user.isAdmin)
            this.columns.push(this.deleteColumn);
    }
    render() {
        const {movies,sortColumn,onSort}=this.props;
        return (
            <Table columns={this.columns}
                   data={movies}
                   sortColumn={sortColumn}
                   onSort={onSort}
            />
        );
    }
}



export default MoviesTable;
