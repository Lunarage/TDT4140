import React from 'react'
import styled from 'styled-components';
import { Logo } from '../components/Header';
import { pageName } from '../consts';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const BigLogo = styled(Logo)`
  font-size: 65px;
  margin: -20px 1px 30px 10px;

  &:hover {
    cursor: default;
  }
`;

const LogoText = styled(Logo)`
  color: #717171;
  margin-bottom: 2px;
  margin-right: 60px;

  &:hover {
    cursor: default;
  }
`;

const WelcomeLogo = () => (
  <Wrapper>
    <LogoText>Gå ut</LogoText>
    <BigLogo>{pageName}</BigLogo>
  </Wrapper>
);

export default WelcomeLogo
