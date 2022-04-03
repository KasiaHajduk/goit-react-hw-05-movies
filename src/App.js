import { NavLink, Outlet } from 'react-router-dom';
import './App.modules.css';
import Navigation from './components/Navigation/Navigation';

function App() {
    return (
        <div className="App">
            <div className="navigation">
                <Navigation
                    to={`/goit-react-hw-05-movies/`}
                    where={`Home`}
                />
                <Navigation
                    to={`/goit-react-hw-05-movies/movies/`}
                    where={`Movies`}
                />
            </div>
            <hr></hr>
            <Outlet />
        </div>
    )
}

export default App;
