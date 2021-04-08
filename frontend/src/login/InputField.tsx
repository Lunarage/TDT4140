import { Input } from "semantic-ui-react";
import styled from 'styled-components';
import { redHexColor } from "../consts";

const LineWrapper = styled.div`
  margin: 15px;
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
  type?: string;
  text?: string;
  onChangeFunc: (val: string) => void
}

// Used for login / register input fields
const InputField = ({ name, type, text, onChangeFunc }: InputFieldProps) => {
  return (
    <LineWrapper>
      <BoldText>{name}</BoldText>
      <Input
        type={type}
        placeholder={text}
        onChange={(event) => onChangeFunc(event.target.value)}
      />
    </LineWrapper>
  )
}
export default InputField;
