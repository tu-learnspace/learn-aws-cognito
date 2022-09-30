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
      isMFAPopUpOpen,
      shouldShowUserInfo,
      isCompleteOTPSetUpOpen,
      qRCodeInfo,
      hasMFA,
    },
    handlers: {
      handleSettingsButtonClick,
      handleCloseButtonClick,
      handleMFAClick,
      handledAttributesButtonClick,
      handleSetUpMFA,
      handleCompleteSetUpMFA,
    }
  } = useHooks();


  return (
    <>
      {
        isMFAPopUpOpen && (
          <div className='Backdrop-MFA'>
            {
              isCompleteOTPSetUpOpen ? (
                <div className='OTP'>
                  <Flex direction="column" gap={tokens.space.medium}>
                    <div className='OTP-Info'>
                      <Heading className='OTP-Info-Item' level={3}>Scan this using your authentication app</Heading>
                      <img className='OTP-Info-Item' src={`${qRCodeInfo.url}`} alt='QR Code' width="300" height="300"/>
                      <p className='OTP-Info-Item'>Code: ${qRCodeInfo.code}</p>
                    </div>
                    <div className='MFA-Button'>
                      <Button onClick={handleCompleteSetUpMFA}>Complete Setup</Button>
                      <Button className='MFA-Button-Cancel' onClick={() => {handleCloseButtonClick('OTP')}}>Cancel</Button>
                    </div>
                  </Flex>
                </div>
              ) : (
                <div className='MFA'>
                  <Flex direction="column" gap={tokens.space.medium}>
                    {
                      hasMFA ? (
                        <>
                          <Button className='CloseButton' onClick={() => {handleCloseButtonClick('MFA')}}>x</Button>
                          <Heading level={3}>MFA Has Already Been Set</Heading>
                        </>
                      ) : (
                        <>
                          <Heading level={3}>MFA Not Set</Heading>
                          <Heading level={4}>Do you want to setup MFA?</Heading>
                          <div className='MFA-Button'>
                            <Button onClick={handleSetUpMFA}>Yes</Button>
                            <Button className='MFA-Button-Cancel' onClick={() => {handleCloseButtonClick('MFA')}}>Cancel</Button>
                          </div>
                        </>
                      )
                    }
                  </Flex>
                </div>
              )
            }
          </div>
        )
      }
      {
        isSettingsPopUpOpen && (
          <div className='Backdrop'>
            <div className='Settings'>
              <Flex direction="column" gap={tokens.space.medium}>
                <Button className='Settings-CloseButton' onClick={() => {handleCloseButtonClick('Settings')}}>x</Button>
                <Heading level={3}>Settings</Heading>
                __________________________________________
                <Heading level={4}>User Attributes</Heading>
                __________________________________________
                <Button className='Settings-Button' variation="link" onClick={handledAttributesButtonClick}>View Attributes</Button>
                <Button className='Settings-Button' variation="link">Update/Set Email</Button>
                <Button className='Settings-Button' variation="link">Update/Set Phone Number</Button>
                __________________________________________
                <Heading level={4}>Multi-factor authentication</Heading>
                __________________________________________
                <Button className='Settings-Button' onClick={handleMFAClick} variation="link">MFA Status</Button>
                __________________________________________
                <Button className='Settings-Button' variation="link">Change password</Button>
                {shouldShowUserInfo && JSON.stringify(userDetails)}
              </Flex>
            </div>
          </div>
        )
      }
      <div className='App'>
        <div className='App-Language'>
          <SelectLanguage/>
          <Button className='App-Language-Button' onClick={handleSettingsButtonClick}>Settings</Button>
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
    </>
  );
}

export default HomeApp;
