import styled from 'styled-components';
// Components
import { Link } from '../';
// Router
import { pathname } from '../../screens';
// Icons
import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as HomeActiveIcon } from '../../assets/home_border.svg';
import { ReactComponent as ExploreIcon } from '../../assets/explore.svg';
import { ReactComponent as ExploreActiveIcon } from '../../assets/explore_border.svg';
import { ReactComponent as NotificationsIcon } from '../../assets/notifications.svg';
import { ReactComponent as NotificationsActiveIcon } from '../../assets/notifications_border.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as UserActiveIcon } from '../../assets/user_border.svg';
import { ReactComponent as AddPhotoIcon } from '../../assets/add_photo.svg';
import { ReactComponent as AddPhotoActiveIcon } from '../../assets/add_photo_border.svg';
// Store
import { useSelector } from 'react-redux';
import {
  selectProfile,
  selectNotifications,
} from '../../store/features/user/userSlice';

export const Navigation = () => {
  const { name } = useSelector(selectProfile);
  const notifications = useSelector(selectNotifications);

  const unreadNotifications = notifications.filter(
    notification => notification.unread
  ).length;

  return (
    <StyledNav>
      <StyledNavContainer>
        <Link
          to={pathname.feed}
          activeWhenExact={true}
          icon={HomeIcon}
          activeIcon={HomeActiveIcon}
        />
        <Link
          to={pathname.explore}
          activeWhenExact={true}
          icon={ExploreIcon}
          activeIcon={ExploreActiveIcon}
        />
        <Link
          to={pathname.createPost}
          activeWhenExact={true}
          icon={AddPhotoIcon}
          activeIcon={AddPhotoActiveIcon}
        />
        <Link
          to={pathname.notifications}
          activeWhenExact={true}
          icon={NotificationsIcon}
          activeIcon={NotificationsActiveIcon}
        >
          {unreadNotifications && (
            <StyledBadge>{unreadNotifications}</StyledBadge>
          )}
        </Link>
        <Link
          to={`/${name}`}
          activeWhenExact={true}
          icon={UserIcon}
          activeIcon={UserActiveIcon}
        />
      </StyledNavContainer>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4.4rem;
  z-index: ${({ theme: { zIndex } }) => zIndex.appBar};
  background-color: ${({ theme: { color } }) => color.white};
  box-shadow: rgba(0, 0, 0, 0.12) 0px -1px 3px, rgba(0, 0, 0, 0.24) 0px -1px 2px;
`;
const StyledNavContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
`;

const StyledBadge = styled.span`
  top: 0;
  right: 0;
  height: 2rem;
  display: flex;
  padding: 0 0.6rem;
  position: absolute;
  flex-wrap: wrap;
  font-size: 0.75rem;
  min-width: 2rem;
  align-items: center;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.medium};
  line-height: 1;
  align-content: center;
  border-radius: 1rem;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ theme: { color } }) => color.accent};
  color: ${({ theme: { color } }) => color.white};
  transform: translate(40%, -35%);
`;
