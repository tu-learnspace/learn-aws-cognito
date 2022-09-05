import React from 'react';
import {useTranslation} from 'react-i18next';

import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import useHooks from './hooks';

const Login = () => {
  const { t } = useTranslation();
  const { states: { isBackdropOpen }, handlers: { handleLogIn } } = useHooks();

  return (
    <div>
      <Button
        variant='outlined'
        onClick={handleLogIn}
      >
        {t('logIn')}
      </Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBackdropOpen}
      >
        <CircularProgress color='inherit'/>
      </Backdrop>
    </div>
  );
}

export default Login;
