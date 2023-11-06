import './menu.css';
import { FC, useEffect, useState } from 'react';

interface Genre {
    id: number;
    name: string;
    movieId: number;
}

interface InfoGenresProps {
    onActionSuccess: () => void;
}

export const InfoGenres: FC<InfoGenresProps> = ({ onActionSuccess }) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [visibleGenreName, setVisibleGenreName] = useState<string | null>(null);
    const [genresWithSameName, setGenresWithSameName] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchDataGenres = async () => {
            try {
                const response = await fetch('http://localhost:8080/genres');

                if (!response.ok) {
                    throw new Error(`Request Failed: ${response.status} ${response.statusText}`);
                }

                const dataFetched: Genre[] = await response.json();

                if (dataFetched && Array.isArray(dataFetched)) {
                    setGenres(dataFetched);
                } else {
                    console.warn("Invalid genre response:", dataFetched);
                }
            } catch (error) {
                console.error('Error fetching genres data:', error);
            }
        };

        fetchDataGenres();
    }, []);

    const uniqueGenres = Array.from(new Set(genres.map((genre) => genre.name)));

    const handleGenreClick = (genreName: string) => {
        const genresWithSameName = genres.filter((genre) => genre.name === genreName);
        setGenresWithSameName(genresWithSameName);

        if (visibleGenreName === genreName) {
            setVisibleGenreName(null);
        } else {
            setVisibleGenreName(genreName);
        }
    };

    const handleDeleteGenresWithSameName = async () => {
        try {
            const genreIdsToDelete = genresWithSameName.map((genre) => genre.id);

            const responses = await Promise.all(
                genreIdsToDelete.map(async (genreId) => {
                    const response = await fetch(`http://localhost:8080/genres/${genreId}`, {
                        method: 'DELETE',
                    });

                    return { genreId, status: response.status };
                })
            );

            const successfulDeletions = responses.filter((response) => response.status === 200);

            if (successfulDeletions.length > 0) {
                const updatedGenres = genres.filter((genre) => !genreIdsToDelete.includes(genre.id));
                setGenres(updatedGenres);
                setGenresWithSameName([]);
                setVisibleGenreName(null);
            } else {
                console.error('Error deleting genres. Status codes:', responses.map((response) => response.status));
            }

            if (onActionSuccess) {
                onActionSuccess();
            }
        } catch (error) {
            console.error('Error deleting genres:', error);
        }
    };

    return (
        <div className='info-data-div'>
            <h2 className="info-data-header">Genres</h2>
            <ul className="genre-list">
                {uniqueGenres.map((genreName) => (
                    <li className="genre-list-li" key={genreName} onClick={() => handleGenreClick(genreName)}>
                        {genreName}
                        {visibleGenreName === genreName && (
                            <span className='delete-confirmation-info-genres'>
                                Do you want to delete?
                                <button onClick={handleDeleteGenresWithSameName}>Delete</button>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
