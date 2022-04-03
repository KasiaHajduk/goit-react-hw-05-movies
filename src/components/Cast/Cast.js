import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import './Cast.modules.css';
import PropTypes from 'prop-types';

const KEY = '80bf373e681ab9ab4bf0d2d924176b29';

function Cast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    async function fetchCast(id) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY}`);
            if (!response.ok) {
                throw new Error(response.status);
            } else {
               // console.log(response.json);
                return response.json();
            }
        } catch (error) {
            return console.error(error);
        }
    }

    useEffect(() => {
        fetchCast(movieId)
            .then((response) => {
                //console.log(response);
                setCast(response.cast);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [movieId]);    



    return (
        <div>
            {cast.length > 0 ? (
            <ul>
                {cast.map(({ id, profile_path, name, character }) => (
                    <li key={id} className="cast">
                        {profile_path !== null ? (
                        <img className="castProfile"
                            src={`http://image.tmdb.org/t/p/w200${profile_path}`}
                            alt={name}
                        />
                        ) : (
                            <p>We don't have any foto.</p>
                        )}
                        <p>{name}</p>
                        <p>Character: {character}</p>
                    </li>
                    ))
                }
            </ul>
            ): (
                  <p>We don't have any cast for this movie</p>  
            )}
        </div>
    )
}

Cast.propTypes = {
    movieId: PropTypes.number,
    cast: PropTypes.object,
};

export default Cast;