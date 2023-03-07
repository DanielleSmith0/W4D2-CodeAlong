//This is where all our methods will reside.
const movies = require("../db.json");
//grabs info
let globalId = 11

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies);
    },

    deleteMovie: (req, res) => {
        //destructuring id from the route params
        //loop through the movies array to find the movie with the id
        //splice the movie out of the movies array
        //send status 200 with updated array
        const { id } = req.params;
        const idx = movies.findIndex(movie => movie.id === +id);
        if(idx){
            movies.splice(idx, 1);
            res.status(200).send(movies);
        } else {
            res.sendStatus(404);
        }
    },

    updateMovie: (req, res) => {
        //destructuring id from the route params
        //destructure the type from the body
        //loop through the movies array to find the movie with the id 
        //if type is plus increment the movie rating by one else decrement rating by 1
        //if rating is already 5 do nothing or rating is 1
        //send the movies array back to front end
        const { id } = req.params;
        const { type } = req.body;
        const idx = movies.findIndex(movie => movie.id === +id);
        if(type === "plus") {
            if(movies[idx].rating < 5) movies[idx].rating++;
            res.status(200).send(movies);
        } else {
            if(movies[idx].rating > 1) movies[idx].rating--;
            res.status(200).send(movies);
        }
    },

    addMovie: (req, res) => {
        //destructure body obj
        //check body to make sure all data exists
        //copy body obj and add new id
        //push the copy to movies array
        //send status 200 with updated movies
        const {title, rating, imageURL} = req.body;
        if(!title || !rating || !imageURL) {
            res.sendStatus(400);
        }

        const copy = {...req.body, if: globalId};
        movies.push(copy);
        globalId++;
        res.status(200).send(movies);
    }
}