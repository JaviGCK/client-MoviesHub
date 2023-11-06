import React, { createContext, useContext, useState } from 'react';

interface ScoreContextType {
    score: number | null;
    setScore: (score: number | null) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const useScoreContext = () => {
    const context = useContext(ScoreContext);
    if (!context) {
        throw new Error('useScoreContext must be used within a ScoreProvider');
    }
    return context;
};

interface ScoreProviderProps {
    children: React.ReactNode;
}

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
    const [score, setScore] = useState<number | null>(null);


    return (
        <ScoreContext.Provider value={{ score, setScore }}>
            {children}
        </ScoreContext.Provider>
    );
};
