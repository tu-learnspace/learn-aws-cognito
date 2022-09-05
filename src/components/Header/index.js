import React, { memo } from 'react';

import './styles/styles.css';

const Header = ({ headerName, userName, children = null }) => {
  return (
    <div className='header'>
      <h4 className='font-size--h4 header-padding'>
        {headerName}
      </h4>
      <h4>{userName}</h4>
      {children}
    </div>
  );
};

export default memo(Header);

