import styled from 'styled-components';

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
    background-color: #04E47C; 
    color: #fff; 
    font-weight: bold; 
  }
`;

export const ButtonLink = styled.button`
  width: 100%;
  height: 50px;
  background: #fff;
  padding: 26px;
  border-radius: 50px;
  border: none;
  color: #000;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 16px;
  gap: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin-top: 20px;

  &:hover {
    background: #4caf50; /* Cor de fundo ao passar o mouse */
    color: #fff; /* Cor do texto ao passar o mouse */
    cursor: pointer;
  }
`;
