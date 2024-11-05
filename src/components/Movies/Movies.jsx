import './Movies.css'

function ListOfMovies ( {movies} ) {
    return (
        <ul className='movies'>
            {
            movies.map(movie => (
                <li className='movie' key={movie.id}>
                    <h3>{movie.title}</h3>
                    <img src={movie.poster} alt={movie.title} />
                    <p>{movie.year}</p>
                </li>
            ))
            }
        </ul>
    )
}

function NoMoviesResults () {
    return (
        <p>No se encontraron resultados</p>
    )
}

export function Movies ( {movies} ) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies 
            ? <ListOfMovies movies={movies} />
            : <NoMoviesResults />
    )
}