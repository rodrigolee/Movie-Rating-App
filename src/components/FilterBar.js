import axios from 'axios';
import React, { Component } from 'react';
class FilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingType: '',
            years: [],
            genres: [],
            ratings: []
        }
    }
    componentDidMount() {
        //TODO create API that GETs the movie list
        //fetch.().then(this.setState({movieList: response}))
        axios.get('http://localhost:3001/movies/years')
        .then(response => {
            this.setState({ years: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })
        axios.get('http://localhost:3001/movies/genres')
        .then(response => {
            this.setState({ genres: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })
        axios.get('http://localhost:3001/movies/ratings')
        .then(response => {
            this.setState({ ratings: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    filter = (e) => {
        this.setState({ratingType: e.target.value})
        this.props.onChange(e.target.value);
    }
    clear = (e) => {
        this.setState({ratingType: ''})
        this.props.onChange(e = true)
    }
    movieRating = () => {
        const { ratings } = this.state
        const ratingSelection = !ratings ? null :
        ratings.map((rating, i) => {
            return <option key={i}>{rating}</option>
        })
        return <select onChange={(e) =>this.filter(e)}>{ratingSelection}</select>
    }
    releaseYear = () => {
        const { years } = this.state
        const yearSelection = !years ? null :
        years.map((year, i) => {
            return <option key={i}>{year}</option>
        })
        return <select onChange={(e) =>this.filter(e)}>{yearSelection}</select>
    }
    genres = () => {
        const { genres } = this.state
        const genreSelection = !genres ? null :
        genres.map((genre, i) => {
            return <option key={i}>{genre}</option>
        })
        return <select onChange={(e) =>this.filter(e)}>{genreSelection}</select>
    }
    render() {
        return (
            // <Visible when={this.props.movies}>
                <div>
                    <label> Movie Rating:
                        {this.movieRating()}
                    </label>
                    <label> Release Year:
                        {this.releaseYear()}  
                    </label>
                    <label> Genres:
                        {this.genres()}
                    </label>
                    <button onClick={this.clear}>Clear Filters</button>
                </div>
            // </Visible>
        )
    }
}
export default FilterBar;