import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Notiflix from 'notiflix';
import { Link } from 'react-router-dom';
import {ImArrowLeft } from "react-icons/im";
import './MoviesPage.modules.css';
import PropTypes from 'prop-types';


const KEY = '80bf373e681ab9ab4bf0d2d924176b29';

function MoviesPage() {
    let navigate = useNavigate();
    let params = useParams();

    const [movies, setMovies] = useState([]);
    const [searchMovies, setSearchMovies] = useState('');
    const [isDone, setDone] = useState(false);

    
    const handleChange = event => {
        const value = event.target.value;
        setSearchMovies(value); 
        //console.log(`handleChange ${searchMovies}`);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (searchMovies.trim() === '') {
            Notiflix.Notify.warning('Please enter a topic to search !');
            //setMovies([]);
            return;
        }
        else {
            fetchMovies(searchMovies)
            .then((response) => {
                //console.log(response);
                //console.log(response.total_pages);
                setMovies(response.results);
                setDone(true);
                if (!response.total_pages) {
                    Notiflix.Notify.warning('No movies found! Please enter a topic to search !');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        setSearchMovies('');
    }

    async function fetchMovies(searchMovies) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchMovies}`);
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        } catch (error) {
            return console.error(error);
        }
    }

    return (
        <div className="moviesPage">
            {!params.movieId &&
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="movieInput"
                            value={searchMovies}
                            type="text"
                            name="search"
                            onChange={handleChange}
                        />
                        <button className='button' type="submit">
                            Search
                        </button>
                    </form>
                    <ul>
                        {isDone === true && (
                        movies.map(({ id, original_title }) => (
                            <li key={id}>
                                <Link className="trendingLink"
                                to={`/goit-react-hw-05-movies/movies/${id}`}
                                >
                                {original_title}
                                </Link> 
                            </li>
                        ))
                        )}
                    </ul>
                </div>}
            {params.movieId &&
                <div>
                    <button className="button" onClick={() => { navigate(-1) }}><ImArrowLeft/>  Go back </button>
                    <Outlet />
                </div>
            }
        </div>
    );
}

MoviesPage.propTypes = {
    movies: PropTypes.array,
    searhMovies: PropTypes.string,
    isDone: PropTypes.bool,
};

export default MoviesPage;
    
    