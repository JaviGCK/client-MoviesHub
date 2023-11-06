export type Movies = {
    id: number;
    poster: string;
    origin: string;
    year: number;
    name: string;
    genres?: Genre[];
    description?: string;
    score?: Score[];
    numVotes?: number;
};

export interface CartCommunityProps {
    id: number;
    poster: string;
    origin: string;
    year: number;
    name: string;
    genres?: Genre[];
    score?: Score[];
}

export type Genre = {
    name: string;
};

export type Score = {
    id: number;
    score: number;
}

