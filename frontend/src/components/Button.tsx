import React from "react";
import styled from "styled-components";
import { redHexColor, redHexColorHover } from "../consts";

interface ButtonProps {
  text: string;
  onClickFunc?: () => void;
  colorInvert?: boolean;
}

export const CustomButton = styled.div`
  min-width: 8em;
  height: 2.5em;
  margin: 10px;
  padding: 3px 15px;
  outline: 0;
  transition: ease backgroundcolor 250ms;
  border-radius: 40px;
  font-weight: bold;
  font-style: normal;
  text-align: center;
  display: table;

  &:hover {
    cursor: pointer;
    background-color: ${redHexColorHover};
    color: white;
  }
`;

export const TextWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Button = ({ text, onClickFunc, colorInvert }: ButtonProps) => { 
  let backgroundcolor = redHexColor;
  let textcolor = "white";
  if (colorInvert) {
    backgroundcolor = "white";
    textcolor = redHexColor;
  }
  return (
  <CustomButton onClick={onClickFunc} style={{color: textcolor, backgroundColor: backgroundcolor}}>
    <TextWrapper>{text}</TextWrapper>
  </CustomButton>
)}

export default Button;
