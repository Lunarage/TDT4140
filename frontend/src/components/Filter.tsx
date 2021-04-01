import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { redHexColor, redHexColorHover } from "../consts";

export const Wrapper = styled.div`
  background-color: #c91801;
  width: 326px;
  height: 962px;
  box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
  color: black;
  font-style: normal;
  mix-blend-mode: normal;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const TextWrapper = styled.div`
  padding: 10px;
`;

const Header = styled.h1`
  font-size: 24px;
  font-style: bold;
  color: black;
  margin-top: 0;
`;

interface FilterProps {
  text: string;
  onClickFunc?: () => void;
}

export const Filter = () => {
  return (
    <Wrapper>
      <Header>
        <div>
          <h1>Søk: </h1>
        </div>
      </Header>
    </Wrapper>
  )
}

export default Filter;
