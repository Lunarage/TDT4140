import React from 'react'
import styled from 'styled-components';
import Button from '../components/Button';
import WelcomeLogo from './WelcomeLogo';

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ContentWrapper = styled.div`
  margin: 130px 100px 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Welcome = () => (
  <PageWrapper>
    <ContentWrapper>
      <WelcomeLogo />
      <Button text="Utforsk" />
      <Button text="Logg inn" />
    </ContentWrapper>
  </PageWrapper>
);

export default Welcome
