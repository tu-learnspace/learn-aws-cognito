import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button } from '@aws-amplify/ui-react';


const LogOutButton = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Button
      loadingText=""
      onClick={() => {
        history.push('/login');
      }}
      ariaLabel=""
    >
      {t('signOut')}
    </Button>
  );
}

export default LogOutButton;
