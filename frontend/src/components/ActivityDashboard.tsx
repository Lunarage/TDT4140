import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ActivityExpand from '../components/ActivityExpand';
import ActivityPreview from '../components/ActivityPreview';
import Loading from '../components/Loading';
import { Event } from '../store/types';
import { ErrorMessage } from './NewActivity';


const ActivityWrapper = styled.div`
  padding: 15px 15px 0 15px;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

export const ExpandWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

interface ActivityDashboardProps {
  events: Event[] | undefined;
  isLoading: boolean;
  error: any
}


const ActivityDashboard = ({ events, isLoading, error }: ActivityDashboardProps) => {
  const dispatch = useDispatch();

  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [curEvent, setCurEvent] = useState<Event>()
  const [eventComponents, setEventComponents] = useState<JSX.Element[]>()

  useEffect(() => {
    let tempEventComponents: JSX.Element[] = [];
    if (events) {
      events.forEach((event, i) => tempEventComponents.push(<ActivityPreview key={i} data={event} onClickFunc={() => handleActivityClick(event)} />))
    }
    setEventComponents(tempEventComponents)
  }, [dispatch, events]);

  const handleActivityClick = (event: Event) => {
    setShowExpanded(true)
    setCurEvent(event)
  }

  if (error) return <ErrorMessage>Noe gikk galt</ErrorMessage>

  return (
    <>
      {showExpanded && curEvent && <ExpandWrapper > <ActivityExpand data={curEvent} onExitFunc={() => setShowExpanded(false)} /></ExpandWrapper>}
      {isLoading || !events ? <Loading /> :
        <ActivityWrapper>
          {eventComponents}
        </ActivityWrapper>}
    </>
  );
}

export default ActivityDashboard
