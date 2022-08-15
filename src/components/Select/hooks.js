import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import useActions from 'hooks/useActions';
import { selectAppLanguage } from 'containers/App/selectors';
import { actions } from 'containers/App/slice';
import i18n from 'i18n';

/**
 * Đầu tiên lấy actions từ slice, destructuring cụ thể action cần xài
 * Bỏ vào useActions chung (bên trong gọi useDispatch)
 *
 * useSelector(selector) dùng để lấy thông tin cần lấy từ store
 * nên dùng useCallback để thực hiện mấy cái setAction
 **/

const useHooks = () => {
  const { setLocale } = actions;
  const { setLocaleAction } = useActions({
    setLocaleAction: setLocale,
  }, [setLocale]);
  const appLanguage = useSelector(selectAppLanguage);

  const handleLanguageOnChange = useCallback( (event) => {
    setLocaleAction(event.target.value);
    i18n.changeLanguage(event.target.value);
    // i18n.on('languageChanged', () => {
    //   setLocaleAction(i18n.language);
    // });
  }, [setLocaleAction]);

  return {
    handlers: {
      handleLanguageOnChange
    },
    states: {
      appLanguage
    },
  };
};

export default useHooks;
