import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './MovieDetailsPage.modules.css'


const KEY = '80bf373e681ab9ab4bf0d2d924176b29';

export default function MoviesDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState([]);

    console.log(movieId);

    async function fetchMovieId(id) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`);
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                console.log(response.json);
                return response.json();
            }
        } catch (error) {
            return console.error(error);
        }
    }

    useEffect(() => {
        fetchMovieId(movieId)
        .then((response) => {
            console.log(response);
            setMovie(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [movieId]);

    const {
        original_title,
        poster_path,
        vote_average,
        overview,
        genres,
        release_date,
    } = movie;

    return (
        <div>
        <div className="movieMain">
            <div >
                    <img className="movieImg"
                        src={`http://image.tmdb.org/t/p/w500${poster_path}`}
                        alt="poster"
                    />
            </div>
            <div >
                <h1>
                    {original_title} ({release_date ? release_date.slice(0, 4) : ""})
                </h1>
                <p>User Score: {vote_average * 10}%</p>
                <h2>Overview</h2>
                    <p>{overview}</p>
                <h2>Genres</h2>
                    <p className="movieGenres">
                        { genres !== undefined ?
                            genres.map(({id, name}) => (
                                <li key={id} className="movieGenre"> 
                                    {name}
                                </li>
                            )) : 'No movie genre.'}
                    </p>
                    

            </div>
      </div>
      <hr></hr>
      <div >
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link
                to={`/goit-react-hw-05-movies/movies/${movieId}/cast`} >
                Cast              
            </Link>
          </li>
          <li>
            <Link
                to={`/goit-react-hw-05-movies/movies/${movieId}/reviews`}>
                Reviews              
            </Link>
          </li>
        </ul>
      </div> 
        <hr></hr>  
            <Outlet />
        </div>
    )
}