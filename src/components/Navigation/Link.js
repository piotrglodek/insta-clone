import PropTypes from 'prop-types';
import styled from 'styled-components';
// Router
import { NavLink, useRouteMatch } from 'react-router-dom';

export const Link = ({
  to,
  activeWhenExact,
  icon: Icon,
  activeIcon: ActiveIcon,
  children,
}) => {
  let match = useRouteMatch({
    path: to,
    exact: activeWhenExact,
  });
  return (
    <StyledLink to={to}>
      {children ? (
        <StyledContainer>
          {children}
          {match ? <Icon /> : <ActiveIcon />}
        </StyledContainer>
      ) : (
        <>{match ? <Icon /> : <ActiveIcon />}</>
      )}
    </StyledLink>
  );
};

const StyledLink = styled(NavLink)`
  flex: 1;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: ${({ theme: { color } }) => color.black};
  }
`;

const StyledContainer = styled.div`
  position: relative;
`;

Link.propTypes = {
  to: PropTypes.string.isRequired,
  activeWhenExact: PropTypes.bool.isRequired,
  icon: PropTypes.object.isRequired,
  activeIcon: PropTypes.object.isRequired,
};
