import React, { useState } from 'react'
import styled from 'styled-components';
import ActivityPreview from '../components/ActivityPreview';
import Header from '../components/Header';
import { logoColor, redHexColor } from '../consts';
import { toUpperCase } from '../functions';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const SideBar = styled.div`
  height: auto;
  width: 220px;
  background-color: ${redHexColor};
`;

export const RightWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const FilterWrapper = styled.div`
  height: 80px;
  width: auto;
  margin: 10px;
  border: hidden;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.45) 1px 5px 15px;
  display: flex;
  padding-left: 20px;
`;

export const ActivityWrapper = styled.div`
  padding: 15px 15px 0 15px;
  display: flex;
  justify-content: space-around;
  width: auto;
`;

export const PageHeader = styled.h1`
  margin-left: 30px;
  color: ${logoColor};
`;

export const ExpandWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;


const Browse = () => {
  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const url = new URL(window.location.href)
  const type = url.searchParams.get("type")

  return (
    <>
      {showExpanded && <ExpandWrapper > <ActivityExpand onExitFunc={() => setShowExpanded(false)} /></ExpandWrapper>}
      <PageWrapper >
        <Header loggedIn={true} />
        <ContentWrapper>
          <SideBar>
          </SideBar>
          <RightWrapper>
            <PageHeader>{toUpperCase(type)}</PageHeader>
            <FilterWrapper>
            </FilterWrapper>
            <ActivityWrapper>
              <ActivityPreview onClickFunc={() => setShowExpanded(true)} />
              <ActivityPreview onClickFunc={() => setShowExpanded(true)} />
              <ActivityPreview onClickFunc={() => setShowExpanded(true)} />
              <ActivityPreview onClickFunc={() => setShowExpanded(true)} />
            </ActivityWrapper>
          </RightWrapper>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}

export default Browse
