import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ActivityPreview from '../components/ActivityPreview';
import Header from '../components/Header';
import { logoColor, redHexColor } from '../consts';
import { toUpperCase } from '../functions';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const SideBar = styled.div`
  height: auto;
  width: 230px;
  background-color: ${redHexColor};
  border-radius: 1px;
`;

const RightWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const FilterWrapper = styled.div`
  height: 80px;
  width: auto;
  margin: 10px;
  border: hidden;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.45) 1px 5px 15px;
  display: flex;
  padding-left: 20px;
`;

const ActivityWrapper = styled.div`
  margin: 15px;
  padding: 0 10px;
  display: flex;
  justify-content: space-around;
`;

const PageHeader = styled.h1`
  margin-left: 30px;
  color: ${logoColor};
`;


const Browse = () => {
  const url = new URL(window.location.href)
  const [type, setType] = useState<string | null>(url.searchParams.get("type"))

  useEffect(() => {
    setType(url.searchParams.get("type"));
    console.log(url);
  }, [url]);

  return (
    <PageWrapper>
      <Header loggedIn={true} />
      <ContentWrapper>
        <SideBar>
        </SideBar>
        <RightWrapper>
          <PageHeader>{toUpperCase(type)}</PageHeader>
          <FilterWrapper>
          </FilterWrapper>
          <ActivityWrapper>
            <ActivityPreview />
            <ActivityPreview />
            <ActivityPreview />
            <ActivityPreview />
          </ActivityWrapper>
        </RightWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default Browse;
