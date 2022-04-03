import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';



//import { useEffect } from 'react';
// import { useCallback } from 'react';
// import { useEffect } from 'react/cjs/react.production.min';
// import trendingAPI from '../services/trending-api';

const KEY = '80bf373e681ab9ab4bf0d2d924176b29';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [isDone, setDone] = useState(false);
  
    async function fetchTrending() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`);
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        } catch (error) {
            return console.error(error);
        }
    }
    
    function Trending() {
        fetchTrending()
            .then((response) => {
                //console.log(response);
                setMovies(response);
                setDone(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (!isDone) {
            Trending();
        }
    });

    return (
        <div>
            <h1>Trending today</h1>
            <ul>
            {isDone === false ? (<Loader /> ) : (
                movies.results.map(({ id, original_title }) => (
                    <li key={id}>
                        <Link
                            to={`/goit-react-hw-05-movies/movies/${id}`}
                        >
                            {original_title}
                        </Link>
                    </li>
                ))
            )}
            </ul>
        </div>
    )
}
