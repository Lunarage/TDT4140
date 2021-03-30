import styled from "styled-components";
import { redHexColor, redHexColorHover } from "../consts";
import { isoToDateList } from '../functions';
import { Event } from '../store/types';

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
    transition: box-shadow 0.2s;
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
  data: Event;
  onClickFunc: () => void;
}

const ActivityPreview = ({ data, onClickFunc }: ActivityPreviewProps) => {
  const [year, month, day] = isoToDateList(data.date)

  return (
    <Wrapper onClick={onClickFunc}>
      <ImageWrapper>
        <Image src="static/Red-Rocks_horizontal.jpg" />
      </ImageWrapper>
      <TextWrapper>
        {data.title ? <Header> {data.title} </Header> : <Header> ARRANGEMENT </Header>}
        {data.location && <TextElement>
          <b>Sted: </b>{data.location}
        </TextElement>}
        {day && month && year && <TextElement>
          <b>Dato: </b> {day}/{month} {year}
        </TextElement>}
        {data.activity_level && <TextElement>
          <b>Aktivitetsnivå: </b> {data.activity_level}
        </TextElement>}
        {data.categories_names.length > 0 && <TextElement>
          <b>Kategorier: </b> {data.categories_names.toString()}
        </TextElement>}
        {data.organization_owner_name && <TextElement>
          <b>Organization: </b> {data.organization_owner_name}
        </TextElement>}
      </TextWrapper>
    </Wrapper>
  );
}

export default ActivityPreview;
