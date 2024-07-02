import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SidebarContainer, SidebarLink, LogoContainer } from './style';
import HomeIcon from '@mui/icons-material/Home';
import Logo from '../../assets/Logo.png';
import CampaignIcon from '@mui/icons-material/Campaign';
import HelpIcon from '@mui/icons-material/Help';
import DescriptionIcon from '@mui/icons-material/Description';

const Sidebar = () => {
  const iconStyle = { color: '#00022f' };

  return (
  
    <SidebarContainer>
      <LogoContainer>
        <img src={Logo} alt="Logo" className='logo'/>
      </LogoContainer>
      {/* ------------------------------------------------- */}
      <SidebarLink as={Link} to="/login">
        <HomeIcon  sx={iconStyle}/>
        Login
      </SidebarLink>
      {/* ------------------------------------------------- */}

      <SidebarLink as={Link} to="/">
        <HomeIcon  sx={iconStyle}/>
        Home
      </SidebarLink>
      <SidebarLink as={Link} to="/comunicados">
        <CampaignIcon sx={iconStyle}/>
        Comunicados
      </SidebarLink>
      <SidebarLink as={Link} to="/faq"> 
        <HelpIcon sx={iconStyle}/>
        FAQ
      </SidebarLink>
      <SidebarLink as={Link} to="/meurh">
        <DescriptionIcon sx={iconStyle}/>
        Meu RH
      </SidebarLink>
    </SidebarContainer>

  );
};

export default Sidebar;
