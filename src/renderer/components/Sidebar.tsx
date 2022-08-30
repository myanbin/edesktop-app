import { FC } from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';

const Sidebar: FC = () => {
  return (
    <>
      <Menu>
        <MenuItem icon="tick" text="开始检校" />
      </Menu>
    </>
  );
};

export default Sidebar;
