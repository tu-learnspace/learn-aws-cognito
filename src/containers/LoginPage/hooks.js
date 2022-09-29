import { useState, useCallback, useEffect } from 'react';
import {
  onLogin,
  onResendConfirmationCode,
  onSignUp,
  onUserConfirmation,
  onForgotPassword,
} from 'utilities/userManager';
import { getItem, deleteAllItems } from 'utilities/storageManager';

const useHooks = () => {
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [isConfirmCodePopUpOpen, setIsConfirmCodePopUpOpen] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [confirmCodeValue, setConfirmCodeValue] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [userNameValue, setUserNameValue] = useState('');

  const handleSignIn = useCallback( async() => {
    setIsBackdropOpen(true);
    try {
      const result = await onLogin({ username: emailValue, password: passwordValue });
      console.log('[LoginPage][handleSignIn] result: ', result);
      setIsBackdropOpen(false);
      // TODO: why I cant history.push here?
      const newUrl = new URL(window.location.href);
      window.location.assign(newUrl.origin);
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        setIsConfirmCodePopUpOpen(true); //toggleModal('confirm', true)
      } else if (err.code === 'NotAuthorizedException') {
        setIsBackdropOpen(false);
        setHasEmailError(true);
        setEmailErrorMessage('Wrong password or username.');
      } else {
        console.log('[LoginPage][handleSignIn] err: ', err);
      }
    }
  }, [setIsBackdropOpen, emailValue, passwordValue, setHasEmailError, setEmailErrorMessage]);

  // delete local storage everytime enter /login
  useEffect(() => {
    deleteAllItems();
  }, []);

  const handleSignUp = useCallback( async() => {
    setIsBackdropOpen(!isBackdropOpen);
    const result = await onSignUp({ emailValue, passwordValue });
    console.log('[LoginPage][handleSignUp] result: ', result);
    setIsBackdropOpen(false);
    if (!result.userConfirmed) {
      setIsConfirmCodePopUpOpen(true);
    }
  }, [isBackdropOpen, setIsBackdropOpen, emailValue, passwordValue]);

  const handleCloseButtonClick = useCallback(() => {
    setIsConfirmCodePopUpOpen(false);
  }, [setIsConfirmCodePopUpOpen]);

  const handleConfirmButtonClick = useCallback(async () => {
    setIsBackdropOpen(true);
    let currentUserName;
    if (userNameValue) {
      currentUserName = userNameValue;
    } else {
      currentUserName = getItem('currentUserName');
    }
    const result = await onUserConfirmation({ currentUserName, confirmationCode: confirmCodeValue });
    console.log('[LoginPage][handleConfirmButtonClick] result: ', result);
    setIsConfirmCodePopUpOpen(false);
  }, [setIsBackdropOpen, setIsConfirmCodePopUpOpen, confirmCodeValue, userNameValue]);

  const handleResendButtonClick = useCallback(async () => {
    const result = await onResendConfirmationCode();
    console.log('[LoginPage][handleResendButtonClick] result: ', result);
    setIsConfirmCodePopUpOpen(false);
  }, [setIsConfirmCodePopUpOpen]);

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
  }, [setEmailValue]);

  const onPasswordInputChange = useCallback((event) => {
    event.persist();
    setPasswordValue(event.target.value);
    // TODO: why I cant use passwordValue instead of event.target.value
    if (event.target.value !== confirmPasswordValue) {
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

  const onUserNameInputChange = useCallback((event) => {
    event.persist();
    setUserNameValue(event.target.value);
  }, [setUserNameValue]);

  const handleForgotPassword = useCallback(async() => {
    try {
      const res = await onForgotPassword();
      console.log('[LoginPage][handleForgotPassword] res: ', res);
    } catch (err) {
      console.log('[LoginPage][handleForgotPassword] err: ', err);
    }
  }, []);

  return {
    states: {
      isBackdropOpen,
      isConfirmCodePopUpOpen,
      emailValue,
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
      onConfirmCodeInputChange,
      onUserNameInputChange,
      handleCloseButtonClick,
      handleConfirmButtonClick,
      handleResendButtonClick,
      handleForgotPassword
    }
  };
};

export default useHooks;
