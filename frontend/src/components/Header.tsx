import React from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { pageName, redHexColor } from '../consts';

interface HeaderProps {
  loggedIn: boolean
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserButton = styled.div`
  display: flex;
  margin: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Tab = styled.div`
  display: flex;
  font-size: 20px;
  margin: 10px 15px;
  color: ${redHexColor};
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const TabsWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;


export const Logo = styled.div`
  margin: 10px 20px;
  font-size: 30px;
  font-weight: bold;
  color: #424242;

  &:hover {
    cursor: pointer;
  }
`;

const Header = ({ loggedIn }: HeaderProps) => {
  const history = useHistory();

  const handleLogoClick = (tab: string) => {
    history.push(tab);
  }

  return (
    <Wrapper>
      <Logo onClick={() => handleLogoClick("/")}>{pageName}</Logo>
      <TabsWrapper>
        <Tab onClick={() => handleLogoClick("/browse")} >
          Aktiviteter
        </Tab >
        <Tab onClick={() => handleLogoClick("/browse")}>
          Arrangementer
        </Tab>
      </TabsWrapper>
      { loggedIn ? <UserButton onClick={() => handleLogoClick("/mypage")}>Min side</UserButton> : <UserButton onClick={() => handleLogoClick("/login")}>logg inn</UserButton>}
    </Wrapper >
  );
};

export default Header
