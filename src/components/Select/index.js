import React from 'react';
import { SelectField } from '@aws-amplify/ui-react';

import useHooks from './hooks';

export default function SelectLanguage() {
  const { states: { appLanguage }, handlers: { handleLanguageOnChange } } = useHooks();

  return (
    <SelectField
      descriptiveText="What's your prefer language?"
      size="large"
      value={appLanguage}
      onChange={handleLanguageOnChange}
    >
      <option value={'en'}>English</option>
      <option value={'vi'}>Vietnamese</option>
      <option value={'ko'}>Korean</option>
    </SelectField>
  );
}
