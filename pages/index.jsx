import React from 'react';

import Pages from '../src/templates/Pages';
import StockLayout from '../src/component/organism';

const Home = () => {
  return (
    <Pages>
      <StockLayout />
    </Pages>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
