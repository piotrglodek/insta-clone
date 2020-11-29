import { ThemeProvider as StyledThemeProvider } from 'styled-components';
// Theme
import { theme, GlobalStyles } from './theme';

export const ThemeProvider = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};
