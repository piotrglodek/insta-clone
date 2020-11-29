import styled from 'styled-components';
import PropTypes from 'prop-types';

export const DialogActions = ({ children }) => {
  return <StyledActionsContainer>{children}</StyledActionsContainer>;
};

const StyledActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  & > :not(:first-child) {
    margin-left: 10px;
  }
`;

DialogActions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
