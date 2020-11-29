import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

export const PageTitle = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{`Instagram | ${title}`}</title>
      </Helmet>
      {children}
    </>
  );
};

PageTitle.defaultProps = {
  title: 'Instagram',
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
