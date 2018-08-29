import React, {Component} from 'react';
import axios from 'axios'

class TextArea extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: '',
        }
    }
    onChange = (e) => this.setState({ comment: e.target.value })
    //Post Comment
    postComment = () => {
        let movieId = this.props.movieId
        let comment = this.state.comment
        axios.post('http://localhost:3001/movies/' + movieId + '/comments', {comment})
        .then(response => {
        alert('Comment posted')
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    render(){
        return(
            <div>
                <form>
                    Comment:<textarea onChange={this.onChange} value={this.state.comment}></textarea>
                </form>
                <button onClick={this.postComment}>Post Comment</button>
            </div>
        )
    }
}
export default TextArea;