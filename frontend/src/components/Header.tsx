import React from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

interface HeaderProps {
  loggedIn: boolean
}

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const RightWrapper = styled.div`
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
  color: #ff4e37;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.div`
  margin: 10px 20px;
  font-size: 35px;
  font-weight: bold;

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
      <LeftWrapper>
        <Logo onClick={() => handleLogoClick("/")}>GJØR' NO</Logo>
        <Tab onClick={() => handleLogoClick("/browse")} >
          Aktiviteter
        </Tab >
        <Tab onClick={() => handleLogoClick("/browse")}>
          Arrangementer
        </Tab>
      </LeftWrapper>
      { loggedIn ? <RightWrapper onClick={() => handleLogoClick("/mypage")}>Min side</RightWrapper> : <RightWrapper onClick={() => handleLogoClick("/login")}>logg inn</RightWrapper>}
    </Wrapper >
  );
};

export default Header
