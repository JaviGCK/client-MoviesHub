import { DeleteGenreProps } from "./actionTypes";

export const DeleteGenre: React.FC<DeleteGenreProps> = ({ genreId, onActionSuccess }) => {
    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/genres/${genreId}`, {
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
