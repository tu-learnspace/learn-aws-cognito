import { useState, useEffect, useCallback } from 'react'
import { getUserDetails, checkMFAStatus, setUpOTP, verifyToken } from 'utilities/userManager';


const useHooks = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isSettingsPopUpOpen, setIsSettingsPopUpOpen] = useState(false);
  const [isMFAPopUpOpen, setIsMFAPopUpOpen] = useState(false);
  const [shouldShowUserInfo, setShouldShowUserInfo] = useState(false);
  const [isCompleteOTPSetUpOpen, setIsCompleteOTPSetUpOpen] = useState(false);
  const [qRCodeInfo, setQRCodeInfo] = useState({});
  const [hasMFA, setHasMFA] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await getUserDetails();
        console.log('[HomeApp][getUserInfo] res: ', res);
        let userInfo = {};
        res.forEach((item) => {
          userInfo[item.getName()] = item.getValue();
        })
        setUserDetails(userInfo);
      } catch (err) {
       console.log('[HomeApp][getUserInfo] err: ', err);
      }
    }

    getUserInfo();
  }, [setUserDetails]);

  const handleSettingsButtonClick = useCallback(() => {
    setIsSettingsPopUpOpen(true);
  }, [setIsSettingsPopUpOpen]);

  const handledAttributesButtonClick = useCallback(() => {
    setShouldShowUserInfo(!shouldShowUserInfo);
  }, [setShouldShowUserInfo, shouldShowUserInfo]);

  const handleCloseButtonClick = useCallback((type) => {
    switch (type) {
      case 'Settings':
        setIsSettingsPopUpOpen(false);
        break;
      case 'MFA':
        setIsMFAPopUpOpen(false);
        break;
      case 'OTP':
        setIsCompleteOTPSetUpOpen(false);
        break;
      default:
    }
  }, [setIsSettingsPopUpOpen, setIsMFAPopUpOpen]);

  const handleMFAClick = useCallback(async () => {
    const result = await checkMFAStatus();
    console.log('[HomePage][handleMFAClick] result: ', result);
    if (result === 'NOMFA') { // no multi-factor auth
      setIsMFAPopUpOpen(true);
    }
    else {
      setHasMFA(true);
    }
  }, [setIsMFAPopUpOpen]);

  const handleSetUpMFA = useCallback(async () => {
    const { code, url } = await setUpOTP();
    setQRCodeInfo({ code, url });
    setIsCompleteOTPSetUpOpen(true);
  }, [setQRCodeInfo, setIsCompleteOTPSetUpOpen]);

  const handleCompleteSetUpMFA = useCallback(async () => {
    try {
      const otpResult = await verifyToken('TOTP');
      console.log('[HomePage][handleCompleteSetUpMFA] otpResult: ', otpResult);
      // setup complete
    } catch (err) {
      console.log('[HomePage][handleCompleteSetUpMFA] err: ', err);
    }
  }, []);

  return {
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
  };
}

export default useHooks;
