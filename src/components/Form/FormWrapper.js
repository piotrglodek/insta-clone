import styled from 'styled-components';

export const FormWrapper = ({ children }) => (
  <StyledWrapper>{children}</StyledWrapper>
);

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
`;
