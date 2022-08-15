import React, { memo } from 'react';

import PropTypes from 'prop-types';

import './styles/styles.css';

const Header = ({ headerName, children = null }) => {
  return (
    <div className='header'>
      <h4 className='font-size--h4 header-padding'>
        {headerName}
      </h4>
      {children}
    </div>
  );
};

Header.propTypes = {
  headerName: PropTypes.string,
  children: PropTypes.node,
};

export default memo(Header);

