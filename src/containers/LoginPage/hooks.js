import { useState, useCallback, useEffect } from 'react';
import {
  onLogin,
  onResendConfirmationCode,
  onSignUp,
  onUserConfirmation,
  onForgotPassword,
  onGoogleSignIn,
  onFacebookSignIn,
  onHostedUISignIn,
} from 'utilities/userManager';
import { deleteAllItems } from 'utilities/storageManager';

const useHooks = () => {
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [isConfirmCodePopUpOpen, setIsConfirmCodePopUpOpen] = useState(false);

  const [emailValue, setEmailValue] = useState('');
  const [userNameValue, setUserNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [confirmCodeValue, setConfirmCodeValue] = useState('');

  const [hasUsernameError, setHasUsernameError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');


  // delete local storage everytime enter /login
  useEffect(() => {
    deleteAllItems();
  }, []);

  /**
   * onChange
   */
  const onEmailInputChange = useCallback((event) => {
    event.persist();
    const { target: { value } } = event;

    if (!event.target.value) {
      setHasEmailError(true);
      setEmailErrorMessage('Email cannot be empty.');
    } else {
      setHasEmailError(false);
      setEmailErrorMessage('');
      setEmailValue(value);
    }
  }, [setEmailValue, setHasEmailError, setEmailErrorMessage]);

  const onUsernameInputChange = useCallback((event) => {
    event.persist();
    const { target: { value } } = event;

    if (!event.target.value) {
      setHasUsernameError(true);
      setUsernameErrorMessage('Username cannot be empty.');
    } else {
      setHasUsernameError(false);
      setUsernameErrorMessage('');
      setUserNameValue(value);
    }
  }, [setUserNameValue, setUsernameErrorMessage, setHasUsernameError]);

  const onPasswordInputChange = useCallback((event) => {
    event.persist();
    setPasswordValue(event.target.value);
    if (event.target.value !== confirmPasswordValue) {     // TODO: why I cant use passwordValue after setPasswordValue (instead of event.target.value)
      setHasPasswordError(true);
      setPasswordErrorMessage('Confirm password is unmatched.');
    } else {
      setHasPasswordError(false);
      setPasswordErrorMessage('');
    }
  }, [setPasswordValue, setHasPasswordError, confirmPasswordValue]);

  const onConfirmPasswordInputChange = useCallback((event) => {
    event.persist();
    setConfirmPasswordValue(event.target.value);
    if (event.target.value !== passwordValue) {
      setHasPasswordError(true);
      setPasswordErrorMessage('Confirm password is unmatched.');
    } else {
      setHasPasswordError(false);
      setPasswordErrorMessage('');
    }
  }, [setConfirmPasswordValue, setHasPasswordError, passwordValue]);

  const onConfirmCodeInputChange = useCallback((event) => {
    event.persist();
    setConfirmCodeValue(event.target.value);
  }, [setConfirmCodeValue]);

  /**
   * handle
   */
  const handleSignIn = useCallback( async() => {
    setIsBackdropOpen(true);
    try {
      const result = await onLogin({ username: userNameValue, password: passwordValue });
      console.log('[LoginPage][handleSignIn] result: ', result);
      setIsBackdropOpen(false);
      if (result) {
        const newUrl = new URL(window.location.href); // TODO: why I cant history.push here?
        window.location.assign(newUrl.origin);
      }
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        setIsConfirmCodePopUpOpen(true);
      } else {
        console.log('[LoginPage][handleSignIn] err: ', err);
        setIsBackdropOpen(false);
        setHasUsernameError(true);
        setUsernameErrorMessage(err.code + ': ' + err.message);
      }
    }
  }, [userNameValue, passwordValue, setIsBackdropOpen, setHasUsernameError, setUsernameErrorMessage]);

  const handleSignUp = useCallback( async() => {
    try {
      setIsBackdropOpen(!isBackdropOpen);
      const result = await onSignUp({ userNameValue, emailValue, passwordValue });
      console.log('[LoginPage][handleSignUp] result: ', result);
      setIsBackdropOpen(false);
      if (!result.userConfirmed) {
        setIsConfirmCodePopUpOpen(true);
      }
    } catch (err) {
      setIsBackdropOpen(false);
      console.log('[LoginPage][handleSignUp] err: ', err);
      setHasUsernameError(true);
      setUsernameErrorMessage(err.code + ': ' + err.message);
    }
  }, [isBackdropOpen, setIsBackdropOpen, userNameValue, emailValue, passwordValue, setIsConfirmCodePopUpOpen, setHasUsernameError, setUsernameErrorMessage]);

  const handleCloseButtonClick = useCallback(() => {
    setIsConfirmCodePopUpOpen(false);
  }, [setIsConfirmCodePopUpOpen]);

  const handleConfirmButtonClick = useCallback(async () => {
    setIsBackdropOpen(true);
    try {
      const result = await onUserConfirmation({ userNameValue, confirmationCode: confirmCodeValue });
      console.log('[LoginPage][handleConfirmButtonClick] result: ', result);
    } catch (err) {
      console.log('[LoginPage][handleConfirmButtonClick] err: ', err);
      setHasUsernameError(true);
      setUsernameErrorMessage(err.code + ': ' + err.message);
    }
    setIsBackdropOpen(false);
    setIsConfirmCodePopUpOpen(false);
  }, [confirmCodeValue, userNameValue, setIsBackdropOpen, setIsConfirmCodePopUpOpen, setUsernameErrorMessage]);

  const handleResendButtonClick = useCallback(async () => {
    try {
      const result = await onResendConfirmationCode(userNameValue);
      console.log('[LoginPage][handleResendButtonClick] result: ', result);
    } catch (err) {
      console.log('[LoginPage][handleResendButtonClick] err: ', err);
    }
    setIsConfirmCodePopUpOpen(false);
  }, [userNameValue, setIsConfirmCodePopUpOpen]);

  const handleForgotPassword = useCallback(async() => {
    try {
      const res = await onForgotPassword();
      console.log('[LoginPage][handleForgotPassword] res: ', res);
    } catch (err) {
      console.log('[LoginPage][handleForgotPassword] err: ', err);
    }
  }, []);

  const handleGoogleSignIn = useCallback(async () => {
    await onGoogleSignIn();
  }, []);

  const handleFacebookSignIn = useCallback(async () => {
    await onFacebookSignIn();
  }, []);


  const handleHostedUISignIn = useCallback(async () => {
    await onHostedUISignIn();
  }, []);

  return {
    states: {
      isBackdropOpen,
      isConfirmCodePopUpOpen,

      hasEmailError,
      hasUsernameError,
      hasPasswordError,

      emailErrorMessage,
      usernameErrorMessage,
      passwordErrorMessage,
    },
    handlers: {
      handleSignIn,
      handleSignUp,

      onEmailInputChange,
      onPasswordInputChange,
      onConfirmPasswordInputChange,
      onConfirmCodeInputChange,
      onUsernameInputChange,

      handleCloseButtonClick,
      handleConfirmButtonClick,
      handleResendButtonClick,
      handleForgotPassword,
      handleGoogleSignIn,
      handleFacebookSignIn,
      handleHostedUISignIn,
    }
  };
};

export default useHooks;
