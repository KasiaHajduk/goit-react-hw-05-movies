import { useState } from 'react';
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Notiflix from 'notiflix';


const KEY = '80bf373e681ab9ab4bf0d2d924176b29';

export default function MoviesPage() {
    let navigate = useNavigate();
    let params = useParams();

    const [movies, setMovies] = useState([]);
    const [searchMovies, setSearchMovies] = useState('');


    async function fetchMovies(searchMovies) {
        try {
            await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchMovies}`)
            .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setMovies(data.results);
                    console.log(data.results);
                });
            } catch (error) {
            return console.error(error);
            }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event);
        // console.log(event.currentTarget);
        // console.log(event.currentTarget.elements);
        // console.log(event.currentTarget.elements.search);
        // console.log(event.currentTarget.elements.search.value);
        const inputSearch = event.currentTarget.elements.search.value;
        console.log(inputSearch);

        if (inputSearch.trim() === '') {
            Notiflix.Notify.warning('Please enter a topic to search !');
            return;
        }
        else {
            setSearchMovies(inputSearch);
            console.log(searchMovies);
            fetchMovies(searchMovies);
        }
       // setSearchMovies('');
    }



    return (
        <div>
            <button onClick={() => { navigate(-1) }}> Go back </button>
            Movies Page
            {!params.movieId &&
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="search" />
                        <button type="submit">
                            Search
                        </button>
                    </form>
                    Lista filmów z szukaczką
                </div>}
            {params.movieId && < Outlet /> }
        </div>
    );
}