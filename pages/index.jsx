import React from 'react';
import Typography from '@material-ui/core/Typography';

import Pages from '../src/templates/Pages/Pages';

const Home = () => {
  return (
    <Pages>
      <Typography variant="h2" gutterBottom>
        Web App
      </Typography>
    </Pages>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
