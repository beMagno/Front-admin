import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarContainer, SidebarLink, LogoContainer } from './style';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Logo from "../../assets/Logo.png";




const Sidebar: React.FC = () => {
  const iconStyle = { color: '#697790' };
  const [currentPage, setCurrentPage] = useState<string>(''); // Estado para controlar a página atual
  const location = useLocation();

  // Atualiza o estado da página atual sempre que a localização mudar
  React.useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]); 

  return (
    <SidebarContainer>
      <LogoContainer>
        <img src={Logo} alt="Logo" className="logo" />
      </LogoContainer>
      <SidebarLink as={Link} to="/" className={currentPage === '/' ? 'active' : ''}>
        <DashboardOutlinedIcon className='icons' />
        Dashboard
      </SidebarLink>
      <SidebarLink as={Link} to="/comunicados" className={currentPage === '/comunicados' ? 'active' : ''}>
        <CampaignOutlinedIcon sx={iconStyle} />
        Comunicados
      </SidebarLink>
      <SidebarLink as={Link} to="/faq" className={currentPage === '/faq' ? 'active' : ''}>
        <HelpCenterOutlinedIcon sx={iconStyle} />
        FAQ
      </SidebarLink>
      <SidebarLink as={Link} to="/meurh" className={currentPage === '/meurh' ? 'active' : ''}>
        <DescriptionOutlinedIcon sx={iconStyle} />
        Meu RH
      </SidebarLink>
      <SidebarLink as={Link} to="/login" className={currentPage === '/login' ? 'active' : ''}>
        <LoginOutlinedIcon sx={iconStyle} />
        Login
      </SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
