import styled from 'styled-components';

export const Time = ({ date }) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();

  return <StyledTime> {`${hours}:${minutes}, ${month} ${day}`} </StyledTime>;
};

const StyledTime = styled.time`
  display: block;
  color: #bbbbbb;
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
`;
