import React, { memo } from 'react';

import Btn from './Btn';
import { ReactComponent as FullscreenIcon } from '../../icons/videoPlayer/fullscreen.svg';
import { ReactComponent as FullscreenExitIcon } from '../../icons/videoPlayer/fullscreen-exit.svg';

interface FullscreenProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

const Fullscreen: React.FC<FullscreenProps> = ({ isFullscreen, onToggle }) => (
  <Btn
    label={isFullscreen ? 'Fullscreen Off' : 'Fullscreen'}
    onClick={onToggle}
  >
    {!isFullscreen && <FullscreenIcon />}
    {isFullscreen && <FullscreenExitIcon />}
  </Btn>
);

export default memo(Fullscreen);
