import React, { memo } from 'react';

import Btn from './Btn';

import {ForwardOutlined} from "@ant-design/icons";

interface SkipProps {
  onSkip: () => void;
}

const Skip: React.FC<SkipProps> = ({ onSkip }) => {
  return (
    <Btn /*label="+ 10 сек"*/ onClick={onSkip}>
      <ForwardOutlined />
    </Btn>
  );
};

export default memo(Skip);
