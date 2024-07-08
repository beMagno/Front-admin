import styled from 'styled-components';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

export const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  position: fixed;
  left: 0;
  top: 0;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;

  .logo {
    width: 150px;
    margin-bottom: 20px;
  }
`;

export const SidebarLink = styled.div`
  display: flex;
  margin: 20px 0;
  color: #697790;
  text-decoration: none;
  font-size: 20px;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  border-radius: 8px;

  &:hover {
    font-weight: 500;
    color: #00e37c;
    background-color: #e8f5e9;
    cursor: pointer;
  }

  &.active {
    background-color: #04e47c;
    color: #fff;
    font-weight: bold;

    svg {
      color: #fff; 
    }
  }
`;
