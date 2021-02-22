import React from 'react'
import styled from 'styled-components';
import { redHexColor } from '../consts';
import { isoToDateList } from '../functions';
import { Event } from '../store/types';

const Wrapper = styled.div`
  background-color: ${redHexColor};
  width: auto;
  min-width: 800px;
  height: auto;
  min-height: 500px;
  box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
  color: white;
  font-style: normal;
  font-size: 24px;
  line-height: 36px;
  mix-blend-mode: normal;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ActivityExpandHeader = styled.h1`
  margin: 0;
  width: 100%;
  height: 110px;
  box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
  color: ${redHexColor};
  background-color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  height: 550px;
  width: 100%;
  color: white;
  display: flex;
  justify-content: space-start;
  font-size: 14px;
  line-height: 20px;
  padding: 20px;
`;

const TextContentWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const TextContent = styled.div`
  width: 100%;
  max-width: 600px;
`;


const Image = styled.img`
    height: 100%;
    top: 27px;
    margin-left: -50%;
`;

const ImageWrapper = styled.div`
    width: 298px;
    height: 100%;
    overflow: hidden;
    box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
`;

const Logo = styled.img`
    width: 110px;
    height: 110px;
`;

const CloseButton = styled.button`
  padding: none;
  border: navajowhite;
  font-size: 2;
  position: absolute;
  left: 1em;
  top: 0.5em;
  margin-bottom: 1em;
  background: ${redHexColor};
  border-radius: 5px;
  height: 30px;
  width: 30px;
  font-weight: bold;
  color: white;

  :hover {
    box-shadow: none;
    cursor: pointer;
  }
`;

interface ActivityExpandProps {
  data: Event
  onExitFunc: () => void;
}

const ActivityExpand = ({ data, onExitFunc }: ActivityExpandProps) => {
  const [year, month, day, hour, minute] = isoToDateList(data.date)
  console.log(data);

  return (
    <Wrapper>
      <CloseButton onClick={onExitFunc} >X </CloseButton>
      {data.title ? <ActivityExpandHeader>
        &nbsp; &nbsp; {data.title}
      </ActivityExpandHeader> : <ActivityExpandHeader>
          &nbsp; &nbsp; EVENT
    </ActivityExpandHeader>}

      <Content>
        <ImageWrapper> <Image src="static/22858269.jpg" />
        </ImageWrapper>

        <TextContentWrapper>

          <TextContent>
            <br />{data.description && <b>{data.description}</b>}
          </TextContent>

          <TextContent>
            <br />
            {/* <h2>Utendørs</h2> */}
            {data.location && <h2>Sted: {data.location}</h2>}
            {year && month && day && hour && minute && <h2>Dato: {day}/{month} {year} - {hour}:{minute}</h2>}
            {/* <h2>Klokkeslett: 14.00</h2> */}
          </TextContent>

          <TextContent>
            <br />
            {data.activity_level && <div>Intensitet: {data.activity_level}</div>}
            {data.equipment_used && <div>Required equipment: {data.equipment_used.toString()}</div>}
            {data.categories && <div>Kategori: {data.categories.toString()}</div>}
            {data.max_participants && <div>Antall plasser: {data.max_participants}</div>}
          </TextContent>

          <TextContent>
            <br />
            {data.organization_owner ? <div>Organisasjon: {data.organization_owner}</div> : data.user_owner && <div>User: {data.user_owner}</div>}
          </TextContent>

          {/* <TextContent>
            <br></br>
            {<h2>Om organisasjonen</h2>
            <div>National Aeronautics and Space Administration (NASA) er en amerikansk føderal etat med oppgaver knyttet til romfart og luftfart. Etaten ble opprettet i 1958 som en direkte følge av Sovjetunionens oppskytning av Sputnik 1. NASA har omkring 18 000 ansatte og hovedkontor i Washington, DC. NASA står bak store bragder, for eksempel Apollo-programmet som sendte mennesker til månen for første gang. NASA sto også bak Mercury-programmet og Gemini-programmet.</div> 
          </TextContent>*/}
        </TextContentWrapper>
      </Content>
    </Wrapper>
  );
}

export default ActivityExpand
