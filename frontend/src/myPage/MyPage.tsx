import React, { useState } from "react";
import styled from "styled-components";
import {
  ContentWrapper,
  PageHeader,
  RightWrapper,
  SideBar,
  FilterWrapper as ListNameWrapper,
} from "../browse/Browse";
import Header from "../components/Header";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MyPage = () => {
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
          </RightWrapper>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
};

export default MyPage;
