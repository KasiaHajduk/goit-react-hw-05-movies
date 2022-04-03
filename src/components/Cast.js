import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const KEY = '80bf373e681ab9ab4bf0d2d924176b29';

export default function Cast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    async function fetchCast(id) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY}`);
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
        fetchCast(movieId)
            .then((response) => {
                console.log(response);
                setCast(response.cast);
                console.log(cast.length);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [movieId]);    



    return (
        <ul>
                {cast.length > 0 ? (
                    cast.map(({ id, profile_path, name, character }) => (
                        <li key={id}>
                            {profile_path !== null ? (
                                <img
                                    src={`http://image.tmdb.org/t/p/w200${profile_path}`}
                                    alt={name}
                                />
                            ) : (
                                    <p>We don't have any foto</p>
                            )}
                            <p>{name}</p>
                            <p>Character: {character}</p>
                        </li>
                    ))) : (
                        <p>We don't have any cast for this movie</p>
                )}
            </ul>
    )
}