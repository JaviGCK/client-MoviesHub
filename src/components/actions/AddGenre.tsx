import '../forms/movieForm.css';
import { FC, useState } from 'react';
import ReactModal from 'react-modal';
import { ActionMovieProps } from './actionTypes';

export const AddGenre: FC<ActionMovieProps> = ({ movieId, onActionSuccess }) => {
    const [genreName, setGenreName] = useState('');
    const [error, setError] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!genreName.trim()) {
            setError('Genre name cannot be empty');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/genres/${movieId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: genreName }),
            });

            if (response.ok) {
                setGenreName('');
                setError('');
                onActionSuccess();
                closeModal();
            } else {
                setError('Only three genres per movie');
            }
        } catch (error) {
            console.error('Error adding genre:', error);
            setError('Error adding genre. Please try again.');
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button className='action-button' onClick={openModal}>Add Genre</button>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add Genre Modal"
                appElement={document.getElementById('root')!}
            >
                <button onClick={closeModal}>X</button>
                <h3 className='form-header'>Add Genre</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={genreName}
                        onChange={(e) => setGenreName(e.target.value)}
                        placeholder="Enter genre name"
                    />
                    <button type="submit">Add Genre</button>
                </form>
            </ReactModal>
        </div>
    );
};
