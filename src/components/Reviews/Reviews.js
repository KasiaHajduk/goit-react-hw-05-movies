import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const KEY = '80bf373e681ab9ab4bf0d2d924176b29';

export default function Reviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    async function fetchReviews(id) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${KEY}`);
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
        fetchReviews(movieId)
            .then((response) => {
                console.log(response);
                setReviews(response.results);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [movieId]);  


    return (
        <div>
            {reviews.length > 0 ? (
            <ul>
                {reviews.map(({ id, author, content }) => (
                    <li key={id}>
                        <h2>Author: {author}</h2>
                        <p>{content}</p>
                    </li>
                ))}
            </ul>
            ) : (
                <p>We don't have any reviews for this movie.</p>
            )}
        </div>
    )
}