import { useEffect, useState } from 'react';
import { Modals } from '../modal/Modals';
import { createUserIfNotExists, fetchDataAllUsers, fetchDataUserById } from '../../api/apiFetch';
import { useAuth0 } from '@auth0/auth0-react';
import { MoviesListDetail } from './movieListDetail';

export const MoviesList = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const fetchUserData = async () => {
    if (isAuthenticated && user && user.email) {
      try {
        const accessToken = await getAccessTokenSilently();
        const email = user.email;
        const name = user.given_name || "";

        const allUsers = await fetchDataAllUsers(accessToken);

        const matchedUser = allUsers.find((u) => u.email === email);

        if (!matchedUser) {
          const newUser = await createUserIfNotExists(name, email, accessToken);
          setUserData(newUser);
        } else {
          const existingUserData = await fetchDataUserById(matchedUser.id, accessToken);
          setUserData(existingUserData);
        }
      } catch (error) {
        console.error('Error fetching or creating user data:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user, isAuthenticated]);

  const handleActionSuccess = () => {
    fetchUserData();
  };

  return (
    <section>
      <Modals userData={userData} onActionSuccess={handleActionSuccess} />
      {userData ? (
        <MoviesListDetail movies={userData.movies || []} onActionSuccess={handleActionSuccess} />
      ) : (
        <p>Loading user data...</p>
      )}
    </section>
  );
};
