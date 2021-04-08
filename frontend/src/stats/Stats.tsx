import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import {
  PageHeader as BasePageHeader,
  RightWrapper as ContentWrapper,
  PageWrapper,
} from "../browse/Browse";
import ActivityDashboard from '../components/ActivityDashboard';
import Header from "../components/Header";
import { State } from '../store/types';
import { useHistory } from 'react-router-dom';
import { getAdminStatistics, getEvents } from '../store/actionCreators';

const PageHeader = styled(BasePageHeader)`
  text-align: center;
`;

const Stats = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    stats,
    isLoading: statsIsLoading,
    errorMessage: statsError,
  } = useSelector((state: State) => state.statsReducer);

  const {
    events,
    isLoading: eventsLoading,
    errorMessage: eventsError,
  } = useSelector((state: State) => state.eventsReducer);

  useEffect(() => {
    if (!statsIsLoading && !stats) {
      history.push("/")
    } else if (!statsIsLoading) {
      dispatch(getAdminStatistics())
    }
    if (!eventsLoading) {
      dispatch(getEvents())
    }

  }, [])

  if (!statsIsLoading && !stats) return <div> Ingen tilgang </div>

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <PageHeader>Statistikkside</PageHeader>
        <ActivityDashboard events={events} isLoading={statsIsLoading && eventsLoading} error={statsError || eventsError} stats={stats} />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Stats;
