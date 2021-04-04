import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logoColor, pageName, redHexColor } from "../consts";
import { getAdminStatistics } from '../store/actionCreators';
import { State } from '../store/types';
import { ExpandWrapper } from './ActivityDashboard';
import Button from './Button';
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

export enum Type {
  aktiviteter = "Aktiviteter",
  arrangementer = "Arrangementer"
}

interface HeaderProps {
  line?: boolean,
}

const Header = ({ line }: HeaderProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showCreateNew, setShowCreateNew] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [underline, setUnderline] = useState<any>(undefined);

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

  useEffect(() => {
    if (line) {
      setUnderline({ borderBottom: `5px solid rgba(236, 47, 22, 1)` })
    }
  }, [line]);

  const setUrl = (tab: string) => {
    history.push(tab);
  };

  const handleTypeClick = (tab: string, type: string) => {
    history.push(tab + "?type=" + type); // adds aktiviteter or arrangementer to url
  };

  const handleNewActivityExit = (submit: boolean) => {
    setShowCreateNew(false);
    if (submit) {
      history.push("/mypage")
    }
  }

  const handleLogOut = () => {
    localStorage.clear()
    setUrl("/")
    window.location.reload()
    return false
  }

  return (
    <>
      {/* displays successs or failure of creating new activity */}
      {showCreateNew && <ExpandWrapper > <NewActivity onExitFunc={handleNewActivityExit} /></ExpandWrapper>}
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
