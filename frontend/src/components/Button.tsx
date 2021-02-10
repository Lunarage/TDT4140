import React from 'react'
import styled from 'styled-components';

interface ButtonProps {
  text: string
}

const CustomButton = styled.div`
  width: 50px;
  height: 50px;
  border-style: solid;
  border-color: red;
`;

const Button = ({ text }: ButtonProps) => (
  <CustomButton>
    text
  </CustomButton>
);

export default Button
