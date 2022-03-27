import { Outlet } from 'react-router-dom';
import './App.css'

function App() {
    return (
        <div className="App">
            Jestem App
            <Outlet />
        </div>
    )
}

export default App;
