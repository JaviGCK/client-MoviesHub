import { useAuth0 } from "@auth0/auth0-react";
import { ActionMovieProps } from "./actionTypes";

export const DeleteMovie: React.FC<ActionMovieProps> = ({ movieId, onActionSuccess }) => {
    const { getAccessTokenSilently } = useAuth0();

    const handleDeleteClick = async () => {
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8080/movies/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.status === 204) {
                onActionSuccess();
            } else {
                console.error('Error deleting movie. Status code:', response.status);
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <button className="action-button" onClick={handleDeleteClick}>
            Delete Movie
        </button>
    );
};
