import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

interface GotoButtonProps {
  to: string;
}

const GotoButton: FC<GotoButtonProps> = ({ to }) => {
  const navigate = useNavigate();

  return <Button text={`Goto ${to}`} onClick={() => navigate(to)} />;
};

export default GotoButton;
