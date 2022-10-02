import React from 'react';
import useHooks from './hooks';

import './styles/styles.css';

const PublicPage = () => {
  const { states: {
    products
  }} = useHooks();

  return (
    <>
      <div className='Products'>
        Products Info:
      </div>
      {JSON.stringify(products)}
    </>
  );
};

export default PublicPage;
