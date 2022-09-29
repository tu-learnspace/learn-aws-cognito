import React from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from 'components/SvgIcon';
import SelectLanguage from 'components/Select';
import useHooks from './hooks';
import './styles/styles.css';

const HomeApp = () => {
  const { t } = useTranslation();
  const {
    states: {
      userDetails,
    },
  } = useHooks();

  return (
    <div className='App'>
      <div className='App-Language'>
        <SelectLanguage/>
      </div>
      <header className='App-header'>
        {JSON.stringify(userDetails)}
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
