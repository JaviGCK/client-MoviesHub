import { useState, useEffect } from 'react';
import './moviesListDetail.css';
import { AddGenre, DeleteMovie, DeleteGenre, UpdateMovie } from '../actions/index';
import { useAuth0 } from '@auth0/auth0-react';
import { MoviesListDetailProps } from './movieTypes';

export const MoviesListDetail: React.FC<MoviesListDetailProps> = ({ movies, onActionSuccess }) => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [visibleGenreId, setVisibleGenreId] = useState<number | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const handleGenreClick = (genreId: number) => {
        setVisibleGenreId(visibleGenreId === genreId ? null : genreId);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAccessTokenSilently();
                setAccessToken(token || null);
            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        };

        fetchData();
    }, [getAccessTokenSilently]);

    return (
        <section className='list-movies-section'>
            <h2 className='list-movies-title'>Movies {user?.nickname}</h2>
            {Array.isArray(movies) && movies.length > 0 ? (
                <ul className='list-movies-ul'>
                    {movies.map((movie) => (
                        <div className='movie-detail-animation' key={movie.id}>
                            <li className='list-movies-li'>
                                <div className='movie-image-div'>
                                    <img className='movie-image' src={movie.url} alt={movie.name} />
                                </div>
                                <div className='movie-details'>
                                    <p className='movie-property'>Name: {movie.name}</p>
                                    <p className='movie-property'>Rating: {movie.score}</p>
                                    <p className='movie-property'>
                                        Genres: {movie.genres && movie.genres.slice(0, 3).map((genre, genreIndex) => (
                                            <span key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                                                {genreIndex > 0 && ', '}
                                                {genre.name}
                                                {visibleGenreId === genre.id && (
                                                    <>
                                                        <span className='delete-confirmation'>
                                                            Do you want to delete?
                                                            <DeleteGenre genreId={genre.id} onActionSuccess={onActionSuccess} />
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                        ))}
                                    </p>
                                    <div className='action-button-div'>
                                        <AddGenre movieId={movie.id} onActionSuccess={onActionSuccess} accessToken={accessToken || ""} />
                                        <UpdateMovie movieId={movie.id} onUpdateSuccess={onActionSuccess} />
                                        <DeleteMovie movieId={movie.id} onActionSuccess={onActionSuccess} accessToken={accessToken || ""} />
                                    </div>
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            ) : (
                <p className='no-movies-found'>No movies found.</p>
            )}
        </section>
    );
};
