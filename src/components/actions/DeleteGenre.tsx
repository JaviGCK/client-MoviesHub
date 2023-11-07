import { DeleteGenreProps } from "./actionTypes";

export const DeleteGenre: React.FC<DeleteGenreProps> = ({ genreId, onActionSuccess }) => {
    const handleDeleteClick = async () => {
        const { API_BASE_URL } = import.meta.env;
        try {
            const response = await fetch(`${API_BASE_URL}/genres/${genreId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                onActionSuccess();
                console.log('Deleted genre');
            } else {
                console.error('Error deleting genre. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
    };

    return <button onClick={handleDeleteClick}>Delete</button>;
};
