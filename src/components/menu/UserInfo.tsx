import { useAuth0 } from '@auth0/auth0-react';
import './menu.css';

interface UserInfoProps {
    userData: {
        name: string;
        email: string;
    } | null;
}

export const UserInfo: React.FC<UserInfoProps> = ({ userData }) => {
    const { user } = useAuth0();

    return (
        <div>
            {userData ? (
                <div className='info-data-div'>
                    <h2 className='info-data-header'>User Profile</h2>
                    <img src={user?.picture} alt="User Profile Picture" />

                    {user?.nickname && <p>Nickname: {user.nickname}</p>}
                    <p>Name: {userData.name}</p>

                    {user?.family_name && <p>Family Name: {user.family_name}</p>}
                    <p>Email: {userData.email}</p>

                    {user?.locale && <p>Country: {user.locale}</p>}
                    <p>Email Verified: {user?.email_verified ? 'Yes' : 'No'}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};
