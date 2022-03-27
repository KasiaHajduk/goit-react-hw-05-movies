import { NavLink, Outlet } from 'react-router-dom';
import './App.css'

function App() {
    return (
        <div className="App">
            Jestem App
            <NavLink
                style={({ isActive }) => {
                return {
                    display: "block",
                    margin: "1rem 0",
                    color: isActive ? "red" : "",
                };
                }}
                to={`/goit-react-hw-05-movies`}
            >
                Home
            </NavLink>
            <NavLink
                style={({ isActive }) => {
                return {
                    display: "block",
                    margin: "1rem 0",
                    color: isActive ? "red" : "",
                };
                }}
                to={`/goit-react-hw-05-movies/movies`}
            >
                Movies
            </NavLink>

            <Outlet />
        </div>
    )
}

export default App;
