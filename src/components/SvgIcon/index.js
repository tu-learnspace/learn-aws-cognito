import React from 'react';
import PropTypes from 'prop-types';

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

SvgIcon.propTypes = {
  name: PropTypes.string,
  rest: PropTypes.any,
  className: PropTypes.string
};

export default SvgIcon;
