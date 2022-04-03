import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

// import HomePage from './components/HomePage/HomePage';
// import MoviesPage from './components/MoviesPage/MoviesPage';
// import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';
// import Cast from './components/Cast/Cast';
// import Reviews from './components/Reviews/Reviews';


const HomePage = React.lazy(() => import('./components/HomePage/HomePage'));
const MoviesPage = React.lazy(() => import ('./components/MoviesPage/MoviesPage'));
const MovieDetailsPage = React.lazy(() => import ('./components/MovieDetailsPage/MovieDetailsPage'));
const Cast = React.lazy(() => import ('./components/Cast/Cast'));
const Reviews = React.lazy (() => import ('./components/Reviews/Reviews'));



ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter basename="/goit-react-hw-05-movies/"> */}
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/goit-react-hw-05-movies/" element={<App />}>
          <Route
            index
            element={<HomePage />}
          />
          <Route path="/goit-react-hw-05-movies/movies/" element={<MoviesPage />}>
            <Route path=":movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <main style = {{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
          
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
