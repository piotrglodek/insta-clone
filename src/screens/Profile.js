import { useState, useEffect } from 'react';
// Components
import { PageTitle, UserProfile, Spinner } from '../components';
// Router
import { useParams } from 'react-router-dom';
// Store
import { useSelector } from 'react-redux';
import { selectProfile } from '../store/features/user/userSlice';

// Services
import { db } from '../firebase';

export const Profile = () => {
  const { username } = useParams();

  const { name, following } = useSelector(selectProfile);

  const [user, setUser] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .where('name', '==', username)
      .onSnapshot(snapshot => {
        const doc = snapshot.docs[0];
        if (doc) {
          setUser({
            ...doc.data(),
          });
          setIsLoading(false);
        }
      });

    return () => unsubscribe();
  }, [username]);

  const isThisCurrentUserProfile = username === name;
  const isUserFollowed = following.includes(user.id);

  return (
    <PageTitle title={username}>
      {user.id ? (
        <UserProfile
          isThisCurrentUserProfile={isThisCurrentUserProfile}
          isUserFollowed={isUserFollowed}
          user={user}
        />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <p>profile not found</p>
      )}
    </PageTitle>
  );
};
