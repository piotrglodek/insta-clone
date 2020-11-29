import { css } from 'styled-components';

// Shared
const white = css`
  ${({ theme: { color } }) => color.white}
`;

const black = css`
  ${({ theme: { color } }) => color.black}
`;

export const base = css`
  color: ${black};
  border: 0.1rem solid #dbdbdb;
  background-color: ${({ theme: { color } }) => color.gray};
  svg {
    fill: ${black};
  }
`;

export const danger = css`
  color: ${white};
  background-color: ${({ theme: { color } }) => color.action};
  svg {
    fill: ${white};
  }
`;

export const primary = css`
  color: ${white};
  background-color: ${({ theme: { color } }) => color.accent};
  svg {
    fill: ${white};
  }
`;
