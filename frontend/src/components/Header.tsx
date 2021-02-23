import React from "react";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logoColor, pageName, redHexColor } from "../consts";
import { State } from '../store/types';
import Loading from './Loading';

interface HeaderProps {
  loggedIn: boolean;
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
  color: ${logoColor};

  &:hover {
    cursor: pointer;
  }
`;

export enum Type {
  aktiviteter = "Aktiviteter",
  arrangementer = "Arrangementer"
}

const Header = () => {
  const history = useHistory();

  const {
    user,
    isLoading: userLoading,
    errorMessage: userError,
  } = useSelector((state: State) => state.userReducer);

  const setUrl = (tab: string) => {
    history.push(tab);
  };

  const handleTypeClick = (tab: string, type: string) => {
    history.push(tab + "?type=" + type);
  };

  if (userError) throw userError;

  if (userLoading) return <Loading />

  return (
    <Wrapper>
      <Logo onClick={() => setUrl("/")}>{pageName}</Logo>
      <TabsWrapper>
        <Tab onClick={() => handleTypeClick("/browse", "aktiviteter")}>
          {Type.aktiviteter}
        </Tab>
        <Tab
          onClick={() => handleTypeClick("/browse", "arrangementer")}
        >
          {Type.arrangementer}
        </Tab>
      </TabsWrapper>
      {user ? (
        <UserButton onClick={() => setUrl("/mypage")}>
          Min side
        </UserButton>
      ) : (
          <UserButton onClick={() => setUrl("/login")}>
            Logg inn
          </UserButton>
        )}
    </Wrapper>
  );
};

export default Header;
