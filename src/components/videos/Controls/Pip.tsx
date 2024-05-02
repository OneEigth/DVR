import Btn from './Btn';
import { ReactComponent as PipInIcon } from '../../icons/videoPlayer/pip-in.svg';
import { ReactComponent as PipOutIcon } from '../../icons/videoPlayer/pip-out.svg';
import React from "react";

interface PipProps {
  isPipMode: boolean;
  onToggle: () => void;
}

const Pip: React.FC<PipProps> = ({ isPipMode, onToggle }) => {
  return (
    <Btn label="Picture in Picture" onClick={onToggle}>
      {isPipMode ? <PipOutIcon /> : <PipInIcon />}
    </Btn>
  );
};

export default Pip;
