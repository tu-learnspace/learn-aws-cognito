import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabItem, Loader, Button, TextField, PasswordField } from '@aws-amplify/ui-react'
import '@fontsource/inter/variable.css';
import '@aws-amplify/ui-react/styles.css';
import ConfirmCodePopUp from 'containers/ConfirmCode';

import useHooks from './hooks';
import './styles/styles.css';

const LoginPage = () => {
  const { t } = useTranslation();
  const {
    states: {
      isBackdropOpen,
      isConfirmCodePopUpOpen,
      hasEmailError,
      emailErrorMessage,
      hasPasswordError,
      passwordErrorMessage,
    },
    handlers: {
      handleSignIn,
      handleSignUp,
      onEmailInputChange,
      onPasswordInputChange,
      onConfirmPasswordInputChange,
    }
  } = useHooks();

  return (
    <>
      {
        isBackdropOpen && (
          <div className='Backdrop'>
            <Loader width="3rem" height="3rem" />
          </div>
        )
      }
      {
        isConfirmCodePopUpOpen && (
          <div className='ConfirmationCode'>
            <ConfirmCodePopUp/>
          </div>
        )
      }
      <div className='LoginPage'>
        <div className='Login'>
          <Tabs
            spacing="equal"
            justifyContent="flex-start">
            <TabItem title="Sign In">
              <Button
                onClick={() => alert('hello')}
              >
                {t('signInAmazon')}
              </Button>
              <Button
                onClick={() => alert('hello')}
              >
                {t('signInApple')}
              </Button>
              <Button
                onClick={() => alert('hello')}
              >
                {t('signInFacebook')}
              </Button>
              <Button
                onClick={() => alert('hello')}
              >
                {t('signInGoogle')}
              </Button>
              - or -
              <div className='TextField'>
                <TextField
                  label='Username'
                  labelHidden
                  isRequired
                  placeholder="Username"
                />
                <PasswordField
                  placeholder="Password"
                  autoComplete="new-password"
                  name="password"
                />
              </div>
              <Button
                loadingText=""
                onClick={handleSignIn}
                ariaLabel=""
              >
                {t('signIn')}
              </Button>
              Forget password
            </TabItem>
            <TabItem title="Create account">
              <Button
                onClick={() => alert('hello')}
              >
                {t('signUpAmazon')}
              </Button>
              <Button
                onClick={() => alert('hello')}
              >
                {t('signUpApple')}
              </Button>
              <Button
                onClick={() => alert('hello')}
              >
                {t('signUpFacebook')}
              </Button>
              <Button
                onClick={() => alert('hello')}
              >
                {t('signUpGoogle')}
              </Button>
              - or -
              <div className='TextField'>
                <TextField
                  placeholder="Username"
                  isRequired
                  hasError={hasEmailError}
                  onChange={onEmailInputChange}
                  errorMessage={emailErrorMessage}
                />
                <PasswordField
                  name="password"
                  placeholder="Password"
                  isRequired
                  hasError={hasPasswordError}
                  errorMessage={passwordErrorMessage}
                  onChange={onPasswordInputChange}
                />
                <PasswordField
                  name="confirm-password"
                  placeholder="Confirm Password"
                  isRequired
                  hasError={hasPasswordError}
                  onChange={onConfirmPasswordInputChange}
                />
              </div>
              <Button
                loadingText=""
                onClick={handleSignUp}
                ariaLabel=""
              >
                {t('signUp')}
              </Button>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
