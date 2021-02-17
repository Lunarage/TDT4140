import React from 'react'
import styled from 'styled-components';
import { redHexColor, redHexColorHover } from '../consts';

const Wrapper = styled.div`
  background-color: ${redHexColor};
  width: 317px;
  height: 724px;
  box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
  top: 354px;
  left: 400px;
  color: white;
  mix-blend-mode: normal;
  font-style: bold;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;

  &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.5);
    background-color: ${redHexColorHover};
  }
`;

const TextWrapper = styled.div`
  padding: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 352px;
  box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
`;

const ActivityPreview = () => (
  <Wrapper>
    <Image src="Red-Rocks_horizontal.jpg" /> 
    <TextWrapper>
    <h2> KLATRING </h2> 
    <div><b>Inne/Ute: </b> Utendørs</div><br></br>
    <div><b>Sted: </b>Lade </div>
    <div><b>Dato: </b> 12. Februar 2021 </div>
    <div><b>Klokkeslett: </b> 14.00 - 16.00 </div>
    <div><b>Aktivitetsnivå: </b> 3 </div>
    <div><b>Kategori: </b> Sport og friluftsliv </div>
    </TextWrapper>

  </Wrapper>
);

export default ActivityPreview
