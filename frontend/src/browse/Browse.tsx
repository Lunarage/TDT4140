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

const Browse = () => (
    <PageWrapper>
        <Header loggedIn={true} />
        <div> Browse </div>
        <div> \._./</div>
    </PageWrapper>
);

export default Browse;
