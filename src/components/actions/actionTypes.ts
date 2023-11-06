export interface ActionMovieProps {
    movieId: number;
    onActionSuccess: () => void;
    accessToken: string;
}

export interface CreateMovieProps {
    userId: number;
    onCreateSuccess: () => void;
}

export interface DeleteGenreProps {
    genreId: number;
    onActionSuccess: () => void;
}


export interface UpdateMovieProps {
    movieId: number;
    onUpdateSuccess?: () => void;
}