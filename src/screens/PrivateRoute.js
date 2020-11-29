import { Redirect, Route } from 'react-router-dom';
// Store
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/features/user/userSlice';

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const isAuth = useSelector(selectIsAuthenticated);
  return (
    <Route
      {...rest}
      render={routeProps =>
        isAuth ? <RouteComponent {...routeProps} /> : <Redirect to='/login' />
      }
    />
  );
};
