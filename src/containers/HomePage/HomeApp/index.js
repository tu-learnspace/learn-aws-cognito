import React from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from 'components/SvgIcon';
import SelectLanguage from 'components/Select';
import { Button, Flex, Heading, useTheme } from '@aws-amplify/ui-react';
import useHooks from './hooks';
import './styles/styles.css';

const HomeApp = () => {
  const { t } = useTranslation();
  const { tokens } = useTheme();
  const {
    states: {
      userDetails,
      isSettingsPopUpOpen,
    },
    handlers: {
      handleSettingsButtonClick,
      handleCloseButtonClick,
    }
  } = useHooks();

  return (
    <>
      {
        isSettingsPopUpOpen && (
          <div className='Backdrop'>
            <div className='Settings'>
              <Flex direction="column" gap={tokens.space.medium}>
                <Button className='Settings-CloseButton' onClick={handleCloseButtonClick}>x</Button>
                <Heading level={3}>Settings</Heading>
                __________________________________________
                <Heading level={4}>User Attributes</Heading>
                __________________________________________
                <Button className='Settings-Button' variation="link">
                  View Attributes
                </Button>
                <Button className='Settings-Button' variation="link">
                  Update/Set Email
                </Button>
                <Button className='Settings-Button' variation="link">
                  Update/Set Phone Number
                </Button>
                <Heading level={4}>Multi-factor authentication</Heading>
                __________________________________________
                <Button className='Settings-Button' variation="link">
                  MFA Status
                </Button>
                __________________________________________
                <Button className='Settings-Button' variation="link">
                  Change password
                </Button>
              </Flex>
            </div>
          </div>
        )
      }
      <div className='App'>
        <div className='App-Language'>
          <SelectLanguage/>
          <Button
            className='App-Language-Button'
            onClick={handleSettingsButtonClick}
          >
            Settings
          </Button>
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
    </>
  );
}

export default HomeApp;
