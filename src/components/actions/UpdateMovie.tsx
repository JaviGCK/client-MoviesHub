import { useState } from 'react';
import ReactModal from 'react-modal';
import { MovieForm } from '../forms/MovieForm';
import { UpdateMovieProps } from './actionTypes';

export const UpdateMovie: React.FC<UpdateMovieProps> = ({ movieId, onUpdateSuccess }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdateSuccess = () => {
        console.log('Movie updated successfully');
        if (onUpdateSuccess) {
            onUpdateSuccess();
        }
        closeModal();
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button className="action-button" onClick={openModal}>
                Update Movie
            </button>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Update Movie Modal"
                appElement={document.getElementById('root')!}
            >
                <button onClick={closeModal}>X</button>
                <MovieForm movieId={movieId} onActionSuccess={handleUpdateSuccess} />
            </ReactModal>
        </div>
    );
};
