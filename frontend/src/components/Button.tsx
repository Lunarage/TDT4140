import React from 'react'
import styled from 'styled-components';

interface ButtonProps {
  text: string;
  onClickFunc?: () => void;
}

const CustomButton = styled.div`
  width: 50px;
  height: 50px;
  border-style: solid;
  border-color: red;
`;

const Button = ({ text, onClickFunc }: ButtonProps) => (
  <CustomButton onClick={onClickFunc}>
    {text}
  </CustomButton>
);

export default Button
