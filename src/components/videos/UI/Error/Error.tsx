import React, { memo } from 'react';

import { ReactComponent as ReloadIcon } from '../../../icons/videoPlayer/reload.svg';
import './Error.css';

interface ErrorProps {
  error: MediaError | null;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  const refreshHandler = () => {
    window.location.reload();
  };

  return error ? (
    <div className="vp-error">
      <p>
        {error.code ? `${error.code}: ` : ''}
        {error.message || 'Error occurred! Please try again'}
      </p>
      <ReloadIcon onClick={refreshHandler} />
    </div>
  ) : null;
};

export default memo(Error);
