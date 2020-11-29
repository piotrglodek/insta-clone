import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// Screens
import { Register, Login, PrivateRoute, RouteTabs, pathname } from './screens';
// Store
import { useDispatch } from 'react-redux';
import {
  signOut,
  updateProfile,
  authenticateUser,
  updateNotifications,
} from './store/features/user/userSlice';
// Services
import { auth, db } from './firebase';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const { uid } = authUser;

        // Get user data
        const unsubscribeUser = await db
          .collection('users')
          .doc(uid)
          .onSnapshot(doc => {
            if (doc) {
              dispatch(updateProfile(doc.data()));
              dispatch(authenticateUser());
            }
          });

        // Get user notifications
        const unsubscribeNotifications = await db
          .collection('users')
          .doc(uid)
          .collection('notifications')
          .orderBy('timestamp', 'desc')
          .onSnapshot(spanshoot => {
            const array = spanshoot.docs.map(note => ({
              ...note.data(),
            }));
            dispatch(updateNotifications(array));
          });

        // Clean up
        return () => {
          unsubscribeUser();
          unsubscribeNotifications();
        };
      } else {
        dispatch(signOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Switch>
      <Route path={pathname.login} component={Login} />
      <Route path={pathname.register} component={Register} />
      <PrivateRoute path='/' component={RouteTabs} />
    </Switch>
  );
}
