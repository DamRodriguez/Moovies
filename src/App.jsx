import './App.css'
import { useEffect, useState, useRef, useCallback } from 'react'
import { Movies } from './components/Movies/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from "just-debounce-it";

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede busacr una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return {search, updateSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const { movies, getMovies, loading } = useMovies({search, sort})
  
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({search})
    }, 1500), [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input className={error ? 'errorSearch' : ''} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix ...' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>

        {error && <p className='formError'>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>cargando</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
