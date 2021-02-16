import React from "react";
import styled from "styled-components";
import Header from "../components/Header";

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-image: url(/static/Everest.png);
    background-repeat: no-repeat;
    height: 100vh;
`;

const MyPage = () => (
    <PageWrapper>
        <Header loggedIn={false} />
        <div> My Page </div>
        <div> \._./</div>
    </PageWrapper>
);

export default MyPage;
