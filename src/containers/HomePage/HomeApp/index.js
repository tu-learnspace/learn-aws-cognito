import React from 'react';
import { useTranslation } from 'react-i18next';

import SvgIcon from 'components/SvgIcon';
import SelectLanguage from 'components/Select';

import './styles/styles.css';

// khung l ha
const HomeApp = () => {
  const { t } = useTranslation();

  return (
    <div className='App'>
      <div className='App-Language'>
        <SelectLanguage/>
      </div>

      <header className='App-header'>
        <SvgIcon name='logo' className="App-logo"/>
        <p> {t('greeting')} </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('learnReact')}
        </a>
      </header>
      <p>Language: {t('language')}</p>
    </div>
  );
}

export default HomeApp;
