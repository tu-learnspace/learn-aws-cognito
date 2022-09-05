import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';


const LogOutButton = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Button
      variant='outlined'
      onClick={() => {
        history.push('/login');
      }}
    >
      {t('logOut')}
    </Button>
  );
}

export default LogOutButton;
