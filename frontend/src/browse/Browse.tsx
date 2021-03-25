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
import { State } from '../store/types';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const SideBar = styled.div`
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
  justify-content: space-around;
  width: auto;
`;

export const PageHeader = styled.h1`
  margin-left: 30px;
  color: ${logoColor};
`;

export const ExpandWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;


const Browse = () => {
  const dispatch = useDispatch();

  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [activityNum, setActivityNum] = useState<number>(0)

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

  const handleActivityClick = (num: number) => {
    setShowExpanded(true)
    setActivityNum(num)
  }

  return (
    <>
      {showExpanded && events && <ExpandWrapper > <ActivityExpand data={events[activityNum]} onExitFunc={() => setShowExpanded(false)} /></ExpandWrapper>}
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
                {events[0] && <ActivityPreview data={events[0]} onClickFunc={() => handleActivityClick(0)} />}
                {events[1] && <ActivityPreview data={events[1]} onClickFunc={() => handleActivityClick(1)} />}
                {events[2] && <ActivityPreview data={events[2]} onClickFunc={() => handleActivityClick(2)} />}
                {events[3] && <ActivityPreview data={events[3]} onClickFunc={() => handleActivityClick(3)} />}
              </ActivityWrapper>}
          </RightWrapper>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}

export default Browse
