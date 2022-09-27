import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@aws-amplify/ui-react';


const LogOutButton = ({ onSignOut }) => {
  const { t } = useTranslation();

  return (
    <Button
      loadingText=""
      onClick={onSignOut}
      ariaLabel=""
    >
      {t('signOut')}
    </Button>
  );
}

export default LogOutButton;
