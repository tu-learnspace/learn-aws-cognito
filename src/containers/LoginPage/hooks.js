import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useActions from 'hooks/useActions';
import { actions } from 'containers/App/slice';
import { getUser, onSignUp } from 'utilities/userManager';
import { setItem, deleteAllItems } from 'utilities/storageManager';

const useHooks = () => {
  const history = useHistory();
  const { storeUserAction } = actions;
  const { storeUser } = useActions({
    storeUser: storeUserAction,
  }, [storeUserAction]);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [isConfirmCodePopUpOpen, setIsConfirmCodePopUpOpen] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleSignIn = useCallback( async() => {
    setIsBackdropOpen(!isBackdropOpen);
    const user = await getUser();
    setIsBackdropOpen(false);
    storeUser(user);
    setItem('user', user);
    history.push('/');
  }, [setIsBackdropOpen, storeUser, isBackdropOpen, history]);

  useEffect(() => {
    deleteAllItems();
  }, []);

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

  const handleSignUp = useCallback( async() => {
    setIsBackdropOpen(!isBackdropOpen);

    const result = await onSignUp({ emailValue, passwordValue });

    // if (!result.userConfirmed) {
    //   // toggleModal('confirm', true)
    //   console.log(result);
    // }
    // else {
    //   setIsBackdropOpen(false);
    //   setIsConfirmCodePopUpOpen(true);
    //   // toggleModal('login', true)
    // }
  }, [isBackdropOpen, setIsBackdropOpen, emailValue, passwordValue]);

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
    }
  };
};

export default useHooks;
