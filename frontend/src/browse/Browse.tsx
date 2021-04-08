import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ActivityDashboard from '../components/ActivityDashboard';
import Header from '../components/Header';
import { logoColor, redHexColor } from '../consts';
import { toUpperCase } from '../functions';
import { getEvents } from '../store/actionCreators';
import { State, Event } from '../store/types';

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

export const SortWrapper = styled.div`
  height: 80px;
  width: auto;
  margin: 10px;
  border: hidden;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.45) 1px 5px 15px;
  display: flex;
  padding-left: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const PageHeader = styled.h1`
  margin-left: 30px;
  margin-right: 30px;
  color: ${logoColor};
`;

const SortTypesWrapper = styled.div`
  display: flex;
  margin: 0.7em;
  align-items: center;
`;

const SortType = styled.div`
  color: ${redHexColor};
  font-size: 1.5em;
  margin: 0.5em;

  &:hover {
    cursor: pointer;
  }
`;

const SortTypeUnderlined = styled(SortType)`
  text-decoration: underline;
`;

const ImageWrapper = styled.div`
  width: auto;
  height: 100%;
  margin: 0.2em;

  &:hover {
    cursor: pointer;
  }
`;

enum SortTypes {
  date = "Dato",
  act = "Aktivitetsnivå"
}

const Browse = () => {
  const dispatch = useDispatch();

  const url = new URL(window.location.href)
  const type = url.searchParams.get("type") //aktiviteter or arrangementer

  // sorting types
  const [lowToHigh, setLowToHigh] = useState<boolean>(false)
  const [sortType, setSortType] = useState<string>(SortTypes.act)
  const [sortComponents, setSortComponents] = useState<JSX.Element[]>()

  const [sortedEvents, setSortedEvents] = useState<Event[]>()

  useEffect(() => {
    let comp: JSX.Element[] = [];
    let sortList = ["Dato", "Aktivitetsnivå"]
    if (type == "aktiviteter") {
      sortList = ["Aktivitetsnivå"] // activities have no dates
    }
    sortList.forEach((type: string) => {
      if (type == sortType) {
        comp.push(<SortTypeUnderlined key={type}>{type}</SortTypeUnderlined>) // the chosen one is underlined
      } else {
        comp.push(<SortType key={type} onClick={() => setSortType(type)}> {type}</SortType >)
      }
      setSortComponents(comp)
    })
  }, [sortType, type])


  const {
    events,
    isLoading: eventsLoading,
    errorMessage: eventsError,
  } = useSelector((state: State) => state.eventsReducer);

  useEffect(() => {
    if (type == "aktiviteter") {
      dispatch(getEvents("user")); //get all activities
    } else {
      setSortType(SortTypes.date)
      dispatch(getEvents("organization")) // get all events
    }
  }, [dispatch, type]);

  // Sort events by type and high to low / low to high
  useEffect(() => {
    if (events) {
      let sorted: Event[] = [...events]
      if (sortType == SortTypes.act) {
        sorted.sort(function (a, b) {
          return b.activity_level - a.activity_level
        })
      } else
        sorted.sort(function (a, b) {
          // @ts-ignore
          return new Date(b.date) - new Date(a.date);
        }); { }
      if (lowToHigh) {
        sorted.reverse();
      }
      setSortedEvents(sorted);
    }
  }, [events, sortType, lowToHigh]);

  return (
    <PageWrapper >
      <Header />
      <ContentWrapper>
        <SideBar>
        </SideBar>
        <RightWrapper>
          <PageHeader>{toUpperCase(type)}</PageHeader>
          <SortWrapper>
            <SortTypesWrapper>
              <h2 style={{ margin: "0.15em" }}>Sorter på: </h2>
              {sortComponents}
            </SortTypesWrapper>
            <SortTypesWrapper>
              <h2 style={{ margin: "0.15em" }}>Retning: </h2>
              <ImageWrapper onClick={() => setLowToHigh(!lowToHigh)}>
                {!lowToHigh ? <img src="static/upArrow.png" /> : <img src="static/downArrow.png" />}
              </ImageWrapper>
            </SortTypesWrapper>
          </SortWrapper>
          <ActivityDashboard events={sortedEvents} isLoading={eventsLoading} error={eventsError} />
        </RightWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default Browse
