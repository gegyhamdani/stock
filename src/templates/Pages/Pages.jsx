import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const Pages = ({ children }) => {
  return (
    <>
      <div className={styles.container}>{children}</div>
      <style jsx global>
        {`
          html,
          body {
            padding: 0;
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </>
  );
};
Pages.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
};

Pages.defaultProps = {
  children: null
};

export default Pages;
