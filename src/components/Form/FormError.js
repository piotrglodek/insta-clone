import styled from 'styled-components';

export const FormError = ({ children }) => {
  return <StyledError>{children}</StyledError>;
};

const StyledError = styled.span`
  padding: 0.2rem 0.5rem;
  display: inline-block;
  background-color: ${({ theme: { color } }) => color.action};
  color: ${({ theme: { color } }) => color.white};
  border-radius: 0.2rem;
  margin-top: 0.4rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
`;
