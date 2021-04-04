import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { redHexColor } from '../consts';
import { isoToDateList } from '../functions';
import { Event, State } from '../store/types';
import Button from "../components/Button";
import { getAdminStatistics, getSignUps, getStarred, revokeSignUpUser, revokeStarUser, signUpUser, starUser } from '../store/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';

export const Wrapper = styled.div`
  background-color: ${redHexColor};
  width: auto;
  min-width: 800px;
  height: auto;
  min-height: 500px;
  box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
  color: white;
  font-style: normal;
  mix-blend-mode: normal;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const ActivityExpandHeader = styled.h1`
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

export const TextContentWrapper = styled.div`
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
  width: 100%;
  object-fit: cover;
`;

const ImageWrapper = styled.div`
  width: 298px;
  height: 100%;
  overflow: hidden;
  box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    transition: box-shadow 0.2s;
    box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;

export const CloseButton = styled.button`
  padding: none;
  border: navajowhite;
  font-size: 2;
  position: absolute;
  right: 1em;
  top: 0.5em;
  margin-bottom: 1em;
  background: ${redHexColor};
  border-radius: 5px;
  height: 30px;
  width: 30px;
  font-weight: bold;
  color: white;

  :hover {
    transition: box-shadow 0.2s;
    box-shadow: 1px 1px 20px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  padding-left: 0.8em;
  display: flex;
  justify-content: center;
`;

interface ActivityExpandProps {
  data: Event
  onExitFunc: () => void;
}

const ActivityExpand = ({ data, onExitFunc }: ActivityExpandProps) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token")
  const id = localStorage.getItem("id")

  const [year, month, day, hour, minute] = isoToDateList(data.date)

  const [signUpResponse, setSignUpResponse] = useState<any>()
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false)

  const [starResponse, setStarResponse] = useState<any>()
  const [isStarred, setIsStarred] = useState<boolean>(false)

  const [image, setImage] = useState<string>("static/22858269.jpg") // default image

  // sets image if there is one
  useEffect(() => {
    if (data.activity_image) {
      setImage("http://127.0.0.1:8000" + data.activity_image)
    }
  }, [data])

  const {
    signUps,
    isLoading: signUpsIsLoading,
  } = useSelector((state: State) => state.signUpsReducer);

  const {
    starred,
    isLoading: starredIsLoading,
  } = useSelector((state: State) => state.starredReducer);

  const fetchSignUps = () => {
    if (id && token) {
      dispatch(getSignUps(id, token))
    }
  }

  const fetchStarred = () => {
    if (id && token) {
      dispatch(getStarred(id, token))
    }
  }

  useEffect(() => {
    if (!signUps && signUps != []) {
      fetchSignUps()
    } else {
      setIsSignedUp(signUps.some(e => e.id == data.id))
    }
  }, [signUps]);

  useEffect(() => {
    if (!starred && starred != []) {
      fetchStarred()
    } else {
      setIsStarred(starred.some(e => e.id == data.id))
    }
  }, [starred]);

  const handleSignUp = (signUp: boolean) => {
    if (token) {
      if (signUp) {
        let promise = signUpUser(data.id.toString(), token).then(r => { return r }) // sign up for activity
        promise.then(r => { setSignUpResponse(r); fetchSignUps() })
      } else {
        let promise = revokeSignUpUser(data.id.toString(), token).then(r => { return r }) // revoke sign up
        promise.then(r => { setSignUpResponse(r); fetchSignUps() })
      }
    }
  }

  const handleStar = (starred: boolean) => {
    if (token) {
      if (starred) {
        let promise = starUser(data.id.toString(), token).then(r => { return r }) // star activity
        promise.then(r => { setStarResponse(r); fetchStarred() })
      } else {
        let promise = revokeStarUser(data.id.toString(), token).then(r => { return r }) // remove star activity
        promise.then(r => { setSignUpResponse(r); fetchStarred() })
      }
      dispatch(getAdminStatistics())
    }
  }

  // open image in a new tab to view whole image
  const openImageTab = () => {
    const newWindow = window.open(image, '_blank')
    if (newWindow) {
      newWindow.focus()
    }
  }

  if (signUpsIsLoading || starredIsLoading) return <Loading />

  return (
    <Wrapper>
      <CloseButton onClick={onExitFunc} > X </CloseButton>
      {data.title && <ActivityExpandHeader>
        &nbsp; &nbsp; {data.title}
      </ActivityExpandHeader>}
      <Content>
        <ImageWrapper onClick={() => openImageTab()}> <Image src={image} />
        </ImageWrapper>
        <TextContentWrapper>
          <TextContent>
            {data.description && <b>{data.description}</b>}
          </TextContent>
          <TextContent>
            <br />
            {data.location && <h2>Sted: {data.location}</h2>}
            {year && month && day && hour && minute && <h2>Dato: {day}/{month} {year} - {hour}:{minute}</h2>}
          </TextContent>
          <TextContent>
            <br />
            {data.activity_level > 0 && <div>Intensitet: {data.activity_level}</div>}
            {data.equipment_used_names.length > 0 && <div>Required equipment: {data.equipment_used_names.toString()}</div>}
            {data.categories_names.length > 0 && <div>Kategori: {data.categories_names.toString()}</div>}
            {data.max_participants > 0 && <div>Antall plasser: {data.max_participants}</div>}
            {data.activity_price > 0 && <div>Pris: {data.activity_price}</div>}
          </TextContent>
          <TextContent>
            <br />
            {data.organization_owner_name ?
              <div>Organisasjon: {data.organization_owner_name}</div> :
              data.user_owner_username && <div>User: {data.user_owner_username}</div>}
          </TextContent>
          < br />
          <ButtonsWrapper>
            {token && data.organization_owner_name && (isSignedUp ?
              <Button
                text='Meld deg av'
                colorInvert={true}
                onClickFunc={() => handleSignUp(false)}
              /> : <Button
                text='Meld deg på'
                colorInvert={true}
                onClickFunc={() => handleSignUp(true)}
              />)}
            {token && (isStarred ?
              <Button
                image='/static/star-24px.svg'
                colorInvert={true}
                onClickFunc={() => handleStar(false)}
                autoWidth={true}
              /> : <Button
                image="/static/star_border-24px.svg"
                colorInvert={true}
                onClickFunc={() => handleStar(true)}
                autoWidth={true}
              />)}
          </ButtonsWrapper>
          {signUpResponse && signUpResponse.error && (signUpResponse.error.statusCode == 400 ?
            <ErrorMessage>Ikke ledig plass</ErrorMessage> :
            <ErrorMessage>Noe gikk feil med oppmelding</ErrorMessage>)}
          {starResponse && starResponse.error && <ErrorMessage>Noe gikk feil med lagring av aktiviteten</ErrorMessage>}
        </TextContentWrapper>
      </Content >
    </Wrapper >
  );
}

export default ActivityExpand
