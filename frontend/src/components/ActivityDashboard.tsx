import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ActivityExpand from '../components/ActivityExpand';
import ActivityPreview from '../components/ActivityPreview';
import Loading from '../components/Loading';
import { redHexColor } from '../consts';
import { Event } from '../store/types';
import { ErrorMessage } from './NewActivity';


const ActivityWrapper = styled.div`
  margin: 30px;
  display: grid; /* 1 */
  grid-template-columns: repeat(auto-fill, 270px); /* 2 */
  grid-gap: 1rem; /* 3 */
  justify-content: space-between; /* 4 */
`;

// Grey background
export const ExpandWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ActivityWithStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatsText = styled.div`
  color: ${redHexColor};
  width: 100%;
  font-size: 1em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5em;
`;

interface ActivityDashboardProps {
  events: Event[] | undefined;
  isLoading: boolean;
  error: any;
  stats?: { [key: string]: number };
}

const ActivityDashboard = ({ events, isLoading, error, stats }: ActivityDashboardProps) => {

  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [curEvent, setCurEvent] = useState<Event>()
  const [eventComponents, setEventComponents] = useState<JSX.Element[]>()

  useEffect(() => {
    let tempEventComponents: JSX.Element[] = [];
    if (events) {
      if (!stats) { // Add normal preview if no stats
        events.forEach((event, i) => tempEventComponents.push(<ActivityPreview key={i} data={event} onClickFunc={() => handleActivityClick(event)} />))
      } else { // Add preview and number of stars if stats
        events.sort(function (e1: Event, e2: Event) { // sorting events by number of stars
          return stats[e2.id] - stats[e1.id];
        });
        events.forEach((event, i) => {
          tempEventComponents.push(
            <ActivityWithStatsWrapper key={i}>
              <ActivityPreview data={event} onClickFunc={() => handleActivityClick(event)} />
              <StatsText>Antall favoritter: {stats[event.id]}</StatsText>
            </ActivityWithStatsWrapper>)
        })
      }
    }
    setEventComponents(tempEventComponents)
  }, [events, stats]);

  const handleActivityClick = (event: Event) => {
    setShowExpanded(true)
    setCurEvent(event)
  }

  if (error) return <ErrorMessage>Noe gikk galt</ErrorMessage>

  return (
    <>
      {showExpanded && curEvent &&
        <ExpandWrapper > {/* Show expanded activity */}
          <ActivityExpand data={curEvent} onExitFunc={() => setShowExpanded(false)} />
        </ExpandWrapper>}
      {isLoading ? <Loading /> :
        <ActivityWrapper>
          {eventComponents}
        </ActivityWrapper>}
    </>
  );
}

export default ActivityDashboard
