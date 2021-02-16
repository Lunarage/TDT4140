import React from 'react'
import styled from 'styled-components';
import Button from '../components/Button';
import Header from '../components/Header';
import WelcomeLogo from './WelcomeLogo';

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-image: url(/Everest.png);
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

const Welcome = () => (
  <PageWrapper>
    <Header loggedIn={false} />
    <ContentWrapper>
      <WelcomeLogoWrapper>
        <WelcomeLogo />
      </WelcomeLogoWrapper>
      <Button text="Utforsk" />
      <Button text="Logg inn" />
    </ContentWrapper>
  </PageWrapper>
);

export default Welcome
