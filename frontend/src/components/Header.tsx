import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logoColor, pageName, redHexColor } from "../consts";
import { getAdminStatistics } from '../store/actionCreators';
import { State } from '../store/types';
import { ExpandWrapper } from './ActivityDashboard';
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

// General page header used on every page
const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showCreateNew, setShowCreateNew] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const {
    stats,
    isLoading: statsIsLoading,
    errorMessage: statsError,
  } = useSelector((state: State) => state.statsReducer);

  useEffect(() => {
    if (!stats && !statsIsLoading && !statsError) {
      dispatch(getAdminStatistics())
    }
  }, [stats])

  const {
    event,
    isLoading: eventLoading,
    errorMessage: eventError,
  } = useSelector((state: State) => state.postEventReducer);

  const setUrl = (tab: string) => {
    history.push(tab);
  };

  const handleTypeClick = (tab: string, type: string) => {
    history.push(tab + "?type=" + type); // adds aktiviteter or arrangementer to url
  };

  const handleNewActivityExit = (submit: boolean) => {
    setShowCreateNew(false);
    if (submit) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 4000)
    }
  }

  const handleLogOut = () => {
    localStorage.clear()
    setUrl("/")
    window.location.reload()
    return false
  }

  if (eventLoading) return <Loading />

  return (
    <>
      {/* displays successs or failure of creating new activity */}
      {showCreateNew && <ExpandWrapper > <NewActivity onExitFunc={handleNewActivityExit} /></ExpandWrapper>}
      {!showCreateNew && showSuccess && (eventError ?
        <NewActivityResponse>Klarte ikke å poste aktiviteten.</NewActivityResponse> :
        event && <NewActivityResponse>{event?.title} er postet!</NewActivityResponse>)}
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
          {localStorage.getItem("token") && <Button
            text="Lag ny"
            onClickFunc={() => setShowCreateNew(true)}
          />}
        </TabsWrapper>
        {localStorage.getItem("token") ? (
          <TabsWrapper>
            {stats &&
              <UserButton onClick={() => setUrl("/admin")}>
                Statistikk
          </UserButton>}
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
