import React, { useState } from "react";
import styled from "styled-components";
import {
  ActivityWrapper,
  ContentWrapper,
  PageHeader,
  RightWrapper,
  SideBar,
  FilterWrapper as ListNameWrapper,
  ExpandWrapper,
} from "../browse/Browse";
import ActivityExpand from "../components/ActivityExpand";
import ActivityPreview from "../components/ActivityPreview";
import Header from "../components/Header";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MyPage = () => {
  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  return (
    <>
      <PageWrapper>
        <Header />
        <ContentWrapper>
          <SideBar></SideBar>
          <RightWrapper>
            <PageHeader>Mine favoritter</PageHeader>
            <ListNameWrapper>

            </ListNameWrapper>
            <ActivityWrapper>
            </ActivityWrapper>
          </RightWrapper>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
};

export default MyPage;
