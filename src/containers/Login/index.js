import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Tabs, TabItem, TextField, PasswordField, Loader } from '@aws-amplify/ui-react';
import '@fontsource/inter/variable.css';

import useHooks from './hooks';

import './styles/styles.css';

const Login = () => {
  const { t } = useTranslation();
  const { states: { isBackdropOpen }, handlers: { handleLogIn } } = useHooks();

  return (
    <>
      {
        isBackdropOpen && (
          <div className='Backdrop'>
            <Loader width="3rem" height="3rem" />
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
              <TextField
                placeholder="Username"
              />
              <PasswordField
                placeholder="Password"
                autoComplete="new-password"
                name="password"
              />
              <Button
                loadingText=""
                onClick={handleLogIn}
                ariaLabel=""
              >
                {t('signIn')}
              </Button>
              Forget password
            </TabItem>
            <TabItem title="Create account">
              Tab content #2
            </TabItem>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Login;
