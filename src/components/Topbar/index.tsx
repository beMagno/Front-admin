import React from 'react';
import { TopbarContainer, NotificationButton, AvatarButton } from './style';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Avatar from '@mui/material/Avatar';

const Topbar: React.FC = () => {
  return (
    <TopbarContainer>
      <NotificationButton>
        <NotificationsActiveOutlinedIcon sx={{ color: '#697790'} }/>
      </NotificationButton>
      <AvatarButton>
        <Avatar alt="Avatar" src="/path-to-avatar.jpg" />
      </AvatarButton>
    </TopbarContainer>
  );
};

export default Topbar;
