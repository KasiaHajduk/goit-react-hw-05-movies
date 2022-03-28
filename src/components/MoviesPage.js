import { useState } from 'react';
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Notiflix from 'notiflix';
import Loader from './Loader';
import { Link } from 'react-router-dom';


const KEY = '80bf373e681ab9ab4bf0d2d924176b29';

export default function MoviesPage() {
    let navigate = useNavigate();
    let params = useParams();

    const [movies, setMovies] = useState([]);
    const [searchMovies, setSearchMovies] = useState('');
    const [isDone, setDone] = useState(false);

    
    const handleChange = event => {
        const value = event.target.value;
        setSearchMovies(value); 
        console.log(`handleChange ${searchMovies}`);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (searchMovies.trim() === '') {
            Notiflix.Notify.warning('Please enter a topic to search !');
            return;
        }
        else {
            fetchMovies(searchMovies)
            .then((response) => {
                //console.log(response);
                setMovies(response);
                setDone(true);
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
        <div>
            <button onClick={() => { navigate(-1) }}> Go back </button>
            Movies Page
            {!params.movieId &&
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={searchMovies}
                            type="text"
                            name="search"
                            onChange={handleChange}
                        />
                            
                        <button type="submit">
                            Search
                        </button>
                    </form>
                                <ul className="trendingUl">
            {isDone === true && (
                movies.results.map(({ id, original_title }) => (
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
            {params.movieId && < Outlet /> }
        </div>
    );
}