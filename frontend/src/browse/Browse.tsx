import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ActivityExpand from '../components/ActivityExpand';
import ActivityPreview from '../components/ActivityPreview';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { logoColor, redHexColor } from '../consts';
import { toUpperCase } from '../functions';
import { getEvents } from '../store/actionCreators';
import { Event, State } from '../store/types';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const SideBar = styled.div`
  min-height: 100vh;
  height: auto;
  width: 220px;
  background-color: ${redHexColor};
`;

export const RightWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const FilterWrapper = styled.div`
  height: 80px;
  width: auto;
  margin: 10px;
  border: hidden;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.45) 1px 5px 15px;
  display: flex;
  padding-left: 20px;
`;

export const ActivityWrapper = styled.div`
  padding: 15px 15px 0 15px;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

export const PageHeader = styled.h1`
  margin-left: 30px;
  color: ${logoColor};
`;

export const ExpandWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;


const Browse = () => {
  const dispatch = useDispatch();

  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [curEvent, setCurEvent] = useState<Event>()
  const [eventComponents, setEventComponents] = useState<JSX.Element[]>()

  const url = new URL(window.location.href)
  const type = url.searchParams.get("type")

  const {
    events,
    isLoading: eventsLoading,
    errorMessage: eventsError,
  } = useSelector((state: State) => state.eventsReducer);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch, type]);

  useEffect(() => {
    let tempEventComponents: JSX.Element[] = [];
    if (events) {
      events.forEach(event => tempEventComponents.push(<ActivityPreview data={event} onClickFunc={() => handleActivityClick(event)} />))
    }
    setEventComponents(tempEventComponents)
  }, [dispatch, events]);

  const handleActivityClick = (event: Event) => {
    setShowExpanded(true)
    setCurEvent(event)
  }

  return (
    <>
      {showExpanded && curEvent && <ExpandWrapper > <ActivityExpand data={curEvent} onExitFunc={() => setShowExpanded(false)} /></ExpandWrapper>}
      <PageWrapper >
        <Header />
        <ContentWrapper>
          <SideBar>
          </SideBar>
          <RightWrapper>
            <PageHeader>{toUpperCase(type)}</PageHeader>
            <FilterWrapper>
            </FilterWrapper>
            {eventsLoading || !events ? <Loading /> :
              <ActivityWrapper>
                {eventComponents}
              </ActivityWrapper>}
          </RightWrapper>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}

export default Browse
