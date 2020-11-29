import { Route, Switch } from 'react-router-dom';
// Components
import { Navigation } from '../components';
// Screens
import {
  Feed,
  Explore,
  Notifications,
  Profile,
  PostCreator,
  PostPage,
  pathname,
} from './';

export const RouteTabs = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path={pathname.feed} component={Feed} />
        <Route exact path={pathname.explore} component={Explore} />
        <Route exact path={pathname.createPost} component={PostCreator} />
        <Route exact path={pathname.notifications} component={Notifications} />
        <Route exact path={pathname.profile} component={Profile} />
        <Route exact path={pathname.post} component={PostPage} />
      </Switch>
    </>
  );
};
