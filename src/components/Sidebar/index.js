import React, { memo } from 'react';

import { NavLink } from 'react-router-dom';

import SvgIcon from 'components/SvgIcon';

import routes from './constant';

const Sidebar = () => {
  return (
    <nav className='sideNav'>
      <article className='sideNav--header'>
        <div className='sideNav-logo'>
          <SvgIcon name='product-marks' />
        </div>
        {routes.map((item) => {
          const { name, path, logo } = item;
          return (
            <NavLink
              key={name}
              className='sideNav-link'
              activeClassName='sideNav-link selected'
              to={path}
            >
            </NavLink>
          );
        })}
      </article>
    </nav>
  );
};

export default memo(Sidebar);
