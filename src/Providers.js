// Theme provider
import { ThemeProvider } from './theme/ThemeProvider';
// Redux provider
import { StoreProvider } from './store/StoreProvider';
// React-router-dom provider
import { BrowserRouter as Router } from 'react-router-dom';
// React-helmet-async provider
import { HelmetProvider } from 'react-helmet-async';

export const Providers = ({ children }) => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <HelmetProvider>
          <Router>{children}</Router>
        </HelmetProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
