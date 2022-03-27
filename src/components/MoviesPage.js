import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function MoviesPage() {
    let navigate = useNavigate();
    let params = useParams();
    return (
        <div>
            <button onClick={() => { navigate(-1) }}> Go back </button>
            Movies Page
            {!params.movieId && <div> Lista filmów z szukaczką </div>}
            {params.movieId && < Outlet /> }
        </div>
    );
}