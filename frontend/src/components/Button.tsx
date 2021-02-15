import React from 'react'
import styled from 'styled-components';
import { redHexColor } from '../consts';

interface ButtonProps {
  text: string;
  onClickFunc?: () => void;
}

const CustomButton = styled.div`
  width: 75px;
  height: 25px;
  color: white;
  margin: 10px;
  background-color: ${redHexColor};
  padding: 3px 20px;
  outline: 0;
  transition: ease backgroundcolor 250ms;
  border-radius: 40px;
  font-weight: bold;
  font-style: normal;
  text-align: center;
  display: table;

  &:hover {
    cursor: pointer;
    background-color: #dc3f2a;
  }
`;

const TextWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Button = ({ text }: ButtonProps) => (
  <CustomButton>
    <TextWrapper>
      {text}
    </TextWrapper>
  </CustomButton>
);

export default Button
