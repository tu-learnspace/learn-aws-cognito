import { useState, useEffect, useCallback } from 'react'
import { getUserDetails } from 'utilities/userManager';


const useHooks = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isSettingsPopUpOpen, setIsSettingsPopUpOpen] = useState(false);

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

  const handleCloseButtonClick = useCallback(() => {
    setIsSettingsPopUpOpen(false);
  }, [setIsSettingsPopUpOpen]);

  return {
    states: {
      userDetails,
      isSettingsPopUpOpen,
    },
    handlers: {
      handleSettingsButtonClick,
      handleCloseButtonClick,
    }
  };
}

export default useHooks;
