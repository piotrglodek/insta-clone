import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Form = ({ children, ...rest }) => (
  <StyledForm {...rest}>{children}</StyledForm>
);

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

Form.propTypes = {
  onSubmit: PropTypes.func,
};
