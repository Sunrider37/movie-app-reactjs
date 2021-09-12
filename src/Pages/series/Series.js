import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Genres from '../../components/Genres'
import CustomPagination from '../../components/pagination/CustomPagination'
import SingleContent from '../../components/singleContent/SingleContent'
import useGenre from '../../hooks/useGenre'

const Series = () => {
    const [page, setPage] = useState(1)
    const [genres, setGenres] = useState([])
    const [content, setcontent] = useState([])
    const [numOfPages, setnumOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([])
    const genreForURL = useGenre(selectedGenres)
    const fetchMovies = async () =>{
    const {data} = 
    await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreForURL}`)

    setcontent(data.results)
    setnumOfPages(data.total_pages)
    }
    useEffect(() => {
       fetchMovies()
       // eslint-disable-next-line
    }, [page, genreForURL])


    return (
        <div>
            <span className="pageTitle">Series</span>
            <Genres type='tv' selectedGenres={selectedGenres} 
         setSelectedGenres={setSelectedGenres}
          genres={genres} 
          setGenres={setGenres}
          setPage={setPage}
          />
            <div className="trending">
                {
                    content && content.map((c) => (
                        <SingleContent key={c.id} 
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type='tv'
                        vote_average={c.vote_average}
                          />
                    ))
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} />

            )}
        </div>
    )
}

export default Series