import React, { memo } from 'react';

import Btn from './Btn';

import {BackwardOutlined} from "@ant-design/icons";

interface RewindProps {
  onRewind: () => void;
}

const Rewind: React.FC<RewindProps> = ({ onRewind }) => {
  return (
    <Btn label="- 10 сек" onClick={onRewind}>
      <BackwardOutlined />
    </Btn>
  );
};

export default memo(Rewind);
