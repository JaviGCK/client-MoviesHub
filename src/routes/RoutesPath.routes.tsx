import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/login/LoginPage';
import { useAuth0 } from '@auth0/auth0-react';

function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth0();
    return isAuthenticated ? children : <LoginPage />;
}

export const RoutesPath = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LoginPage />} />


                <Route
                    path="/home"
                    element={
                        <AuthenticatedRoute>
                            <HomePage />
                        </AuthenticatedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
