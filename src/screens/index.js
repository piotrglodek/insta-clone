export { Register } from './Register';
export { Login } from './Login';
export { PrivateRoute } from './PrivateRoute';
export { Feed } from './Feed';
export { Explore } from './Explore';
export { Notifications } from './Notifications';
export { Profile } from './Profile';
export { PostCreator } from './PostCreator';
export { PostPage } from './PostPage';
export { RouteTabs } from './RouteTabs';

export const pathname = {
  register: '/register',
  login: '/login',
  feed: '/',
  explore: '/explore',
  notifications: '/notifications',
  profile: '/:username',
  createPost: '/postCreator',
  post: '/p/:postId',
};
