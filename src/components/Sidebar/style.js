import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 200px;
  height: 90vh;
  background-color: #f4f4f4;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;

  .logo{
    width: 150px;
    margin-bottom: 20px;
    
  }
`;

export const SidebarLink = styled.div`
  display: flex;
  margin: 20px 0;
  color: #333;
  text-decoration: none;
  font-size: 20px;
  gap: 10px;

  align-items: center;

  &:hover {
    text-decoration: underline;
    font-weight: 500;
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
  transition: .3s;
  margin-top: 20px;

  &:hover{
    background: #00022F;
    color: #fff;
  }
`



