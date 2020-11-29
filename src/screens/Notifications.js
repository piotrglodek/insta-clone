import styled from 'styled-components';
import { useEffect } from 'react';
// Components
import { PageTitle, Header, NotificationItem } from '../components';
// Store
import { useSelector } from 'react-redux';
import {
  selectNotifications,
  selectProfile,
} from '../store/features/user/userSlice';
// Services
import { db } from '../firebase';

export const Notifications = () => {
  const notificationsList = useSelector(selectNotifications);
  const { id } = useSelector(selectProfile);

  useEffect(() => {
    const unread = notificationsList.filter(not => not.unread);

    unread.forEach(not => {
      db.collection('users')
        .doc(id)
        .collection('notifications')
        .doc(not.id)
        .update({ unread: false });
    });
  }, [notificationsList, id]);

  const elements = notificationsList.map(not => (
    <NotificationItem key={not.id} data={not} />
  ));

  return (
    <PageTitle title='notifications'>
      <Header>
        <StyledHeaderContainer>
          <StyledHeaderText>Activity</StyledHeaderText>
        </StyledHeaderContainer>
      </Header>
      <StyledMain>
        {notificationsList.length ? (
          elements
        ) : (
          <p>You don't have notifications.</p>
        )}
      </StyledMain>
    </PageTitle>
  );
};

const StyledHeaderContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const StyledHeaderText = styled.p`
  margin: 0;
  color: ${({ theme: { color } }) => color.black};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.medium};
`;

const StyledMain = styled.main`
  width: 100%;
  margin: 3rem auto 7.4rem auto;
  max-width: 60rem;
`;
