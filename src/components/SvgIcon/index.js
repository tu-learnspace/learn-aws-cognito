import React from 'react';

import useHooks from './hooks';

const SvgIcon = ({ name, rest, className }) => {
  const { refs, states } = useHooks({ name });
  const { loading } = states;
  const { importedIconRef } = refs;

  if (!loading && importedIconRef.current) {
    const { current: ImportedIcon } = importedIconRef;
    return (
      <ImportedIcon
        className={className}
        {...rest}
      />
    );
  }
  return null;
};

export default SvgIcon;
