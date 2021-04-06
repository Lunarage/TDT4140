import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ExpandWrapper } from '../browse/Browse';
import { logoColor, pageName, redHexColor } from "../consts";
import { State } from '../store/types';
import Button from './Button';
import Loading from './Loading';
import NewActivity from './NewActivity';

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

const NewActivityResponse = styled.div`
  background-color: ${redHexColor};
  border: solid;
  border-radius: 10px;
  border-color: white;
  width: auto;
  min-width: 150px;
  height: auto;
  min-height: 100px;
  box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.45);
  color: white;
  font-size: 30px;
  position: absolute;
  padding: 1em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export enum Type {
  aktiviteter = "Aktiviteter",
  arrangementer = "Arrangementer"
}

interface HeaderProps {
  line?: boolean,
}

const Header = ({line}: HeaderProps) => {
  const history = useHistory();
  const [showCreateNew, setShowCreateNew] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [underline, setUnderline] = useState<any>(undefined);

  const {
    user,
  } = useSelector((state: State) => state.getUserReducer);

  const {
    event,
    isLoading: eventLoading,
    errorMessage: eventError,
  } = useSelector((state: State) => state.postEventReducer);

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", user.token)
      localStorage.setItem("id", user.id.toString())
    }
  }, [user]);

  useEffect(() => {
    if (line) {
      setUnderline({borderBottom: `10px solid rgba(236, 47, 22, 1)`})
    }
  }, [line]);

  const setUrl = (tab: string) => {
    history.push(tab);
  };

  const handleTypeClick = (tab: string, type: string) => {
    history.push(tab + "?type=" + type);
  };

  const handleNewActivityExit = (submit: boolean) => {
    setShowCreateNew(false);
    if (submit) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 4000)
    }
  }

  const handleLogOut = () => {
    setUrl("/")
    localStorage.clear()
  }

  if (eventLoading) return <Loading />

  return (
    <>
      {showCreateNew && <ExpandWrapper > <NewActivity onExitFunc={handleNewActivityExit} /></ExpandWrapper>}
      {!showCreateNew && showSuccess && (eventError ?
        <NewActivityResponse>Klarte ikke å poste aktiviteten.</NewActivityResponse> :
        event && <NewActivityResponse>{event?.title} er postet!</NewActivityResponse>)}
      <Wrapper style={underline}>
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
          {localStorage.getItem("token") && <Button
            text="Lag ny"
            onClickFunc={() => setShowCreateNew(true)}
          />}
        </TabsWrapper>
        {localStorage.getItem("token") ? (
          <TabsWrapper>
            <UserButton onClick={() => setUrl("/mypage")}>
              Min side
          </UserButton>
            <UserButton onClick={handleLogOut}>
              Logg ut
            </UserButton>
          </TabsWrapper>
        ) : (
          <UserButton onClick={() => setUrl("/login")}>
            Logg inn
          </UserButton>
        )}
      </Wrapper>
    </>
  );
};

export default Header;
