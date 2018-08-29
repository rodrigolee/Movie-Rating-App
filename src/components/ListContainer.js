import React, {Component} from 'react';
import CardComponent from './CardComponent';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar'
import axios from 'axios'

class ListContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            movieList: [],
            allMovies: [],
            filteredMovieList: [],
            searchResults: [],
        }
    }
    componentDidMount(){
        this.getMovieList()
    }
    getMovieList = () => {
        axios.get('http://localhost:3001/movies')
        .then(response => {
            this.setState({ movieList: response.data });
            this.setState({ allMovies: this.state.movieList })
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    setMovieRating = (e, movieId) => {
        axios.post('http://localhost:3001/movies/' + movieId +'/starrating', {starRating: e.target.value})
        .then(response => {
        })
        .catch(function(error) {
            console.log(error)
        })
        this.getMovieList()
    }
    sortByRating = (e) => {
        let filteredMovieList = this.state.movieList
        if(e !== true){
          if ((e.length < 5 || e === 'PG-13') && isNaN(e)) {
            //getMovieList
            filteredMovieList = this.state.movieList.filter(data=>{
                return data.mpaa_rating === e;
            })
        } else if(isNaN(e)) {
            filteredMovieList = this.state.movieList.filter(data=> {
                return data.genres.includes(e)
            })
        } else {
            filteredMovieList = this.state.movieList.filter(data=> {
                return data.release_year.toString() === e
            })
        }
        this.setState({movieList: filteredMovieList})
      } else {
        this.refresh()
      }
    }
    refresh = (e) => {
      this.setState({movieList: this.state.allMovies})
    }
    searchTextHandler = (e) => {
        if(e.length >= 1) {
          let filteredMovieList = this.state.movieList.filter(data=>{
              return data.title.toUpperCase().includes(e.toUpperCase());
          })
          this.setState({movieList: filteredMovieList})
        } else {
          this.refresh()
        }
    }
    render(){
        return(
            <div>
                <SearchBar onChange={this.searchTextHandler}/>
                <FilterBar movies={this.state.movieList} onChange={this.sortByRating}/>
                <CardComponent movies={this.state.movieList} setMovieRating={this.setMovieRating} postComment={this.getMovieList}/>
            </div>
        )
    }
}
export default ListContainer;