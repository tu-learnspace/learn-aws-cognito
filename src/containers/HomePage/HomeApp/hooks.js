import { useState, useEffect } from 'react';
import {
  getUserDetails,
} from 'utilities/userManager';


const useHooks = () => {
  const [userDetails, setUserDetails] = useState({});

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

  return {
    states: {
      userDetails,
    },
    handlers: {
    }
  };
}

export default useHooks;
