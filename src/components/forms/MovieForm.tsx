import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { createMoviePost, updateMoviePut } from '../../api/apiFetch';

interface MovieFormProps {
    userId?: number;
    movieId?: number;
    onUpdate?: () => void;
    onActionSuccess?: () => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({ userId, movieId, onUpdate, onActionSuccess }) => {
    const { getAccessTokenSilently } = useAuth0();

    const initialMovieData = {
        name: '',
        url: null as File | null,
        score: '',
        description: '',
    };

    const [movieData, setMovieData] = useState(initialMovieData);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const { API_BASE_URL } = import.meta.env;
            if (movieId) {
                try {
                    const accessToken = await getAccessTokenSilently();
                    const response = await fetch(`${API_BASE_URL}/movies/${movieId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });

                    if (response.status === 200) {
                        const movieDetails = await response.json();
                        setMovieData({
                            name: movieDetails.name || '',
                            url: null,
                            score: movieDetails.score || '',
                            description: movieDetails.description || '',
                        });
                    } else {
                        console.error('Error fetching movie details:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching movie details:', error);
                }
            }
        };

        fetchMovieDetails();
    }, [movieId, getAccessTokenSilently]);

    const handleFieldChange = (name: string, value: string | File | null) => {
        setMovieData((prevMovieData) => ({
            ...prevMovieData,
            [name]: value,
        }));
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, url, score, description } = movieData;

        if (userId || movieId) {
            if (userId && (!name || !url || score === '')) {
                setErrorMessage('All fields are required for create');
                return;
            }

            try {
                const movieFormData = new FormData();

                if (name !== '') {
                    movieFormData.append('name', name);
                }
                if (url !== null) {
                    movieFormData.append('url', url as File);
                }
                if (score !== '') {
                    movieFormData.append('score', Number(score).toString());
                }
                if (description !== '') {
                    movieFormData.append('description', description);
                }

                const accessToken = await getAccessTokenSilently();
                const response =
                    userId
                        ? await createMoviePost(userId, movieFormData, accessToken)
                        : movieId
                            ? await updateMoviePut(movieId, movieFormData, accessToken)
                            : null;

                if (response && response.status === 200) {
                    setMovieData(initialMovieData);

                    if (onUpdate) {
                        onUpdate();
                    }
                    if (onActionSuccess) {
                        onActionSuccess();
                    }
                    setSuccessMessage('Movie created/updated successfully');
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('Error creating/updating movie. Please try again.');
            }
        } else {
            console.error('Please provide a user or movie ID.');
        }
    };

    return (
        <div className='form-div'>
            <h2 className='form-header'>{userId ? 'Create Movie' : 'Update Movie'}</h2>
            <form onSubmit={handleSubmit}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={movieData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="url">URL:</label>
                    <input
                        type="file"
                        id="url"
                        name="url"
                        onChange={(e) => handleFieldChange('url', e.target.files ? e.target.files[0] : null)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="score">Score:</label>
                    <input
                        type="number"
                        id="score"
                        name="score"
                        value={movieData.score}
                        onChange={(e) => handleFieldChange('score', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={movieData.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">{userId ? 'Create' : 'Update'} Movie</button>
                </div>
            </form>
        </div>
    );
};
