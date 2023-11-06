interface Movie {
    id: number;
    name: string;
    url: string;
    score: number;
    genres?: Genres[];
}

interface UserData {
    id: number;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    movies?: Movie[];
}

interface Genres {
    id: number;
    name: string;
}
