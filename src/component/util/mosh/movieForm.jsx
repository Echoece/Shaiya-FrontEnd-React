import React from 'react';
import Form from "./common/form/form";
import Joi from "joi-browser";
import {getGenres} from "../service/genreService";
import {getMovie, saveMovie} from "../service/movieService";

class MovieForm extends Form {
    state={
        data:{
            title:'',
            genreId:'',
            numberInStock:'',
            dailyRentalRate:''
        },
        genres:[],
        errors:{}
    }

    schema = {
        _id: Joi.string(),

        title: Joi.string()
            .required()
            .label('Title'),

        genreId: Joi.string()
            .required()
            // .valid('Action','Comedy','Thriller')
            .label('Genre'),

        numberInStock: Joi.number()
            .min(0)
            .max(100)
            .required()
            .label('Number in Stock'),

        dailyRentalRate: Joi.number()
            .min(0)
            .max(10)
            .required()
            .label('Daily Rental Rate')
    };



    async componentDidMount() {
        await this.populateGenre();
        await this.populateMovie();
    }
    // populating genre
    async populateGenre(){
        const {data:genres} =await getGenres();
        this.setState({genres});
    }

    // populating movies
    async populateMovie(){
        const movieId= this.props.match.params.id;
        if(movieId==='new')
            return;
        try{
            const {data:movie}=await getMovie(movieId);
            this.setState({data:this.mapToViewModel(movie)});
        }catch (e) {
            if(e.response && e.response.status === 404)
                return this.props.history.replace("/not-found");
        }
    }

    // helper method for populate movie function
    mapToViewModel= (movie)=> {
        return {
            _id:movie._id,
            title:movie.title,
            genreId:movie.genre._id,
            numberInStock:movie.numberInStock,
            dailyRentalRate:movie.dailyRentalRate
        };
    }

    doSubmit= async ()=>{
        await saveMovie(this.state.data);
        this.props.history.push('/movies');
    }

    render() {
        return (
            <div className='container'>
                <h1>Movie Form </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title','Title')}
                    {this.renderSelect('genreId','Genre',this.state.genres)}
                    {this.renderInput('numberInStock','Number In Stock')}
                    {this.renderInput('dailyRentalRate','Rate')}
                    {this.renderButton('Save ')}
                </form>
            </div>
        );
    }

    handleSave = () => {
        // Navigate to /products
        this.props.history.replace("/movies");
    };

}

export default MovieForm;