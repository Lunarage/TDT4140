import React from "react";
import { Input } from "semantic-ui-react";
import styled from 'styled-components';
import { redHexColor } from "../consts";

const LineWrapper = styled.div`
  margin: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 25px;
`;

const BoldText = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: ${redHexColor};
`;
interface InputFieldProps {
  name: string;
  password?: boolean;
  text?: string;
  onChangeFunc: (val: string) => void
}

const InputField = ({ name, password, text, onChangeFunc }: InputFieldProps) => {
  return (
    <LineWrapper>
      <BoldText>{name}</BoldText>
      <Input
        size='massive'
        placeholder={text}
        onChange={(event) => onChangeFunc(event.target.value)}
      />
    </LineWrapper>
  )
}
export default InputField;
