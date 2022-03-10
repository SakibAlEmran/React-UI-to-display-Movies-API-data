import { useEffect, useState } from "react";

import MovieCard from "./components/MovieCard";
import SearchIcon from "./search.svg";
import "./App.css"; 

//movies data from omdb
const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=c8ce162a";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        searchMovies('fight club');
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    return (
        <div className="app">
            <h1>MoviesWorld</h1>

            <div className="search">
                <input 
                    value={searchTerm}
                    placeholder="search for movies"
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <img 
                    src={SearchIcon} 
                    alt="Search" 
                    onClick={()=> searchMovies(searchTerm)}
                />
            </div>

            {
                movies.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => {
                            return <MovieCard movie={movie}/>
                        })}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies Found.</h2>
                    </div>
                )
            }
        </div>
    )
}

export default App;