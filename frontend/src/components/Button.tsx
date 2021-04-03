import styled from "styled-components";
import { redHexColor } from "../consts";

interface ButtonProps {
  text?: string;
  onClickFunc?: () => void;
  colorInvert?: boolean;
  image?: string;
  autoWidth?: boolean;
}

export const CustomButton = styled.div`
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
    transition: box-shadow 0.2s;
    box-shadow: 0 0 15px rgba(33, 33, 33, 0.7);
  }
`;

export const TextWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100%;
`;

export const ImageWrapper = styled.img`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;


const Button = ({ text, onClickFunc, colorInvert, image, autoWidth = false }: ButtonProps) => {

  let backgroundcolor = redHexColor;
  let textcolor = "white";
  if (colorInvert) {
    backgroundcolor = "white";
    textcolor = redHexColor;
  }

  let minwidth = "8em"
  if (autoWidth) {
    minwidth = "0em"
  }

  return (
    <CustomButton onClick={onClickFunc} style={{ color: textcolor, backgroundColor: backgroundcolor, minWidth: minwidth }}>
      {image ? <TextWrapper> <ImageWrapper src={image} /> </TextWrapper> : <TextWrapper>{text}</TextWrapper>}
    </CustomButton>
  )
}

export default Button;
