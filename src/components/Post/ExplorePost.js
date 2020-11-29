import styled from 'styled-components';
// Router
import { Link } from 'react-router-dom';

export const ExplorePost = ({ id, image }) => {
  return <StyledExplorePost to={`/p/${id}`} image={image} />;
};

const StyledExplorePost = styled(Link)`
  text-decoration: none;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: 50%;
  &::before {
    content: '';
    display: block;
    width: 0;
    padding-bottom: 100%;
    grid-row: 1/1;
    grid-column: 1/1;
  }
`;
