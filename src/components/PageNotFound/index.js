import React from 'react';
import { useTranslation } from 'react-i18next';


const ErrorPageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('pageNotFoundMessage')}
    </div>
  );
};

export default ErrorPageNotFound;
