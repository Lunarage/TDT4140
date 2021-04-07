import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ActivityDashboard from '../components/ActivityDashboard';
import Header from '../components/Header';
import { logoColor, redHexColor } from '../consts';
import { toUpperCase } from '../functions';
import { getEvents } from '../store/actionCreators';
import { State } from '../store/types';
import Filter from '../components/Filter';
//import FilterSearch from '../components/FilterSearch';

export const PageWrapper = styled.div`
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

// Wrapper for page header, filter and dashboard
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

export const PageHeader = styled.h1`
  margin-left: 30px;
  margin-right: 30px;
  color: ${logoColor};
`;


const Browse = () => {
  const dispatch = useDispatch();

  const url = new URL(window.location.href)
  const type = url.searchParams.get("type") //aktiviteter or arrangementer

  const {
    events,
    isLoading: eventsLoading,
    errorMessage: eventsError,
  } = useSelector((state: State) => state.eventsReducer);

  useEffect(() => {
    if (type == "aktiviteter") {
      dispatch(getEvents("user")); //get all activities
    } else { dispatch(getEvents("organization")) } // get all events
  }, [dispatch, type]);

  return (
    <>
      <PageWrapper >
        <Header line={true}/>
        <ContentWrapper>
          <SideBar>
            <Filter />
          </SideBar>
          <RightWrapper>
            <PageHeader>{toUpperCase(type)}</PageHeader>
            <FilterWrapper>
            </FilterWrapper>
            <ActivityDashboard events={events} isLoading={eventsLoading} error={eventsError} />
          </RightWrapper>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}

export default Browse
