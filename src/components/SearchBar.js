import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchResults: []
        }
    }
    searchForTerm = (e) => {
        this.setState({searchText: e.target.value})
        this.props.onChange(e.target.value);
    }
    sortByRating = (e) => {
        this.setState({ratingType: e.target.value})
        this.props.onChange(e.target.value);
    }
    render() {
        return (
            <div>
                <input style={{ width: 800 }} onChange={(e) =>this.searchForTerm(e)} value={this.state.searchText}></input>
            </div>
        )
    }
}
export default SearchBar;