import { FC } from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom';

const Sidebar: FC = () => {
  const navigate = useNavigate();

  return (
    <aside>
      <Menu>
        <MenuItem
          icon="tick"
          text="开始检校"
          active
          onClick={() => navigate('/')}
        />
        <MenuItem icon="time" text="历史文稿" />
      </Menu>
      <Menu>
        <MenuItem
          icon="cog"
          text="设置"
          onClick={() => navigate('/settings')}
        />
      </Menu>
    </aside>
  );
};

export default Sidebar;
