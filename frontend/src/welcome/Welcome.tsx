import React from "react";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Header from "../components/Header";
import { State } from '../store/types';
import WelcomeLogo from "./WelcomeLogo";
import Filter from "../components/Filter";

const PageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-image: url(/static/Everest.png);
    background-repeat: no-repeat;
    height: 100vh;
    background-size: auto 100%;
`;

const ContentWrapper = styled.div`
    margin: 130px 100px 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const WelcomeLogoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Welcome = () => {
  const history = useHistory();
  const setUrl = (url: string) => {
    history.push(url);
  };

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <WelcomeLogoWrapper>
          <WelcomeLogo />
        </WelcomeLogoWrapper>
        <Button
          text="Utforsk"
          onClickFunc={() => setUrl("/browse?type=arrangementer")}
        />
        {!localStorage.getItem("token") &&
          <Button text="Logg inn" onClickFunc={() => setUrl("/login")} />}
          <Filter />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Welcome;
