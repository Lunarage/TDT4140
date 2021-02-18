import React from 'react'
import styled from 'styled-components';
import { redHexColor, redHexColorHover } from '../consts';

const Wrapper = styled.div`
  background-color: ${redHexColor};
  width: 250px;
  height: 500px;
  box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
  top: 354px;
  left: 400px;
  color: white;
  mix-blend-mode: normal;
  font-style: bold;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  margin: 20px;

  &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.5);
    background-color: ${redHexColorHover};
  }
`;

const TextWrapper = styled.div`
  padding: 14px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
`;

const Header = styled.h2`
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 3px;
`;

const TextElement = styled.div`
  font-size: 15px;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 50%;
    overflow: hidden;
    box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
`;

interface ActivityPreviewProps {
  onClickFunc: () => void;
}

const ActivityPreview = ({ onClickFunc }: ActivityPreviewProps) => (
  <Wrapper onClick={onClickFunc}>
    <ImageWrapper>
      <Image src="static/Red-Rocks_horizontal.jpg" />
    </ImageWrapper>
    <TextWrapper>
      <Header> KLATRING </Header>
      <TextElement><b>Inne/Ute: </b> Utendørs</TextElement>
      <TextElement><b>Sted: </b>Lade </TextElement>
      <TextElement><b>Dato: </b> 12. Februar 2021 </TextElement>
      <TextElement><b>Klokkeslett: </b> 14.00 - 16.00 </TextElement>
      <TextElement><b>Aktivitetsnivå: </b> 3 </TextElement>
      <TextElement><b>Kategori: </b> Sport og friluftsliv </TextElement>
    </TextWrapper>
  </Wrapper>
);

export default ActivityPreview
