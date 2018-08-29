import React from 'react';
import TextArea from'./TextArea'

this.state = {
    message: ''
}
// go through array genre and list all
const displayGenre = (genres) => {
    return genres.map((genre, i) => {
        return <p key={i}>{genre}</p>
    })
}
// computation for average star rating
const avgStarRating = (rating => {
    console.log(rating)
    if(rating){
        if(isNaN(rating.totalStars/rating.count)){
            return <p>0</p>
        } else {
            return <p>{(rating.totalStars/rating.count).toFixed(2)}</p>
        }
    }
    else {
        return <p>0</p>
    }
})
// all comments
const displayComments = (comments) => {
    if(comments) {
        return comments.map((comment, i) => {
            return <p key={i}>{comment}</p>
        })
    }
}
// last star rating
const yourStarRating = (rating) => {
    let ratingArr = rating.lastRating
    if(ratingArr.length > 0) {
        let lastRating = ratingArr[ratingArr.length - 1]
        return <p>You have rated this movie {lastRating} stars!</p>
    }
}
const CardComponent = ({movies, setMovieRating, postComment}) => {
    return movies.map(movie => {
        console.log(movie.star_rating)
        return (
            <div key={movie._id}>
                <h3>Movie Title: {movie.title}</h3>
                <p>Mpaa Rating: {movie.mpaa_rating}</p>
                <p>Director: {movie.director}</p>
                <p>Release Year: {movie.release_year}</p>
                {/* //underline */}
                <strong>Genres</strong>
                {displayGenre(movie.genres)}
                {/* Add Rating Component */}
                <select onChange={(e) =>setMovieRating(e, movie._id)}>
                    <option value={1} key={1}>1 star</option>
                    <option value={2} key={2}>2 stars</option>
                    <option value={3} key={3}>3 stars</option>
                    <option value={4} key={4}>4 stars</option>
                    <option value={5} key={5}>5 stars</option>
                </select>
                {yourStarRating(movie.star_rating)}
                {avgStarRating(movie.star_rating)}
                <TextArea postComment={postComment} movieId={movie._id} ></TextArea>
                <strong>Comments</strong>
                {displayComments(movie.comments)}
            </div>
        )
    })
}

export default CardComponent;