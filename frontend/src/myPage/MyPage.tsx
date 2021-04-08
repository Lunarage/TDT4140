import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import {
  PageHeader as BasePageHeader,
  RightWrapper,
  SortWrapper,
  PageWrapper,
} from "../browse/Browse";
import ActivityDashboard from '../components/ActivityDashboard';
import Header from "../components/Header";
import { HeaderItem, HeaderItemUnderlined } from '../components/NewActivity';
import { getMyActivities, getStarred, getSignUps } from '../store/actionCreators';
import { State } from '../store/types';
import { Event } from '../store/types';
import { redHexColor } from '../consts';

const PageHeader = styled(BasePageHeader)`
  text-align: center;
`;

const TabsWrapper = styled(SortWrapper)`
  display: flex;
  justify-content: space-evenly;
`;

const Tab = styled(HeaderItem)`
  color: ${redHexColor};
  font-size: 1.5em;
`;

const TabUnderlined = styled(HeaderItemUnderlined)`
  color: ${redHexColor};
  font-size: 1.5em;
`;

enum tab {
  starred = "Favoritter",
  signUp = "Oppmeldte aktiviteter",
  myAct = "Mine aktiviteter",
}

const MyPage = () => {
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState<tab>(tab.myAct)
  const [tabComponents, setTabComponents] = useState<JSX.Element[]>()

  // states for response from selected type of event
  const [events, setEvents] = useState<Event[] | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>()

  const {
    starred,
    isLoading: starredIsLoading,
    errorMessage: starredError,
  } = useSelector((state: State) => state.starredReducer);

  const {
    signUps,
    isLoading: signUpsIsLoading,
    errorMessage: signUpsError,
  } = useSelector((state: State) => state.signUpsReducer);

  const {
    myActivities,
    isLoading: myActivitiesIsLoading,
    errorMessage: myActivitiesError,
  } = useSelector((state: State) => state.myActivitiesReducer);

  // underlines selected tab
  useEffect(() => {
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    if (id && token) {
      dispatch(getMyActivities(id, token))
    }
    const tabList = [tab.myAct, tab.signUp, tab.starred]
    let tempTabComponents: JSX.Element[] = []
    tabList.forEach(t => {
      if (t == currentTab) {
        tempTabComponents.push(<TabUnderlined key={t} onClick={() => changeTab(t)}>{t}</TabUnderlined>)
      } else {
        tempTabComponents.push(<Tab key={t} onClick={() => changeTab(t)}>{t}</Tab>)
      }
    })
    setTabComponents(tempTabComponents)
  }, [currentTab])

  // gets starred, sign ups and my activities
  useEffect(() => {
    if (currentTab == tab.starred) {
      setEvents(starred)
      setIsLoading(starredIsLoading)
      setError(starredError)
    }
    else if (currentTab == tab.signUp) {
      setEvents(signUps)
      setIsLoading(signUpsIsLoading)
      setError(signUpsError)
    }
    else if (currentTab == tab.myAct) {
      setEvents(myActivities)
      setIsLoading(myActivitiesIsLoading)
      setError(myActivitiesError)
    }
  }, [starred, myActivities, signUps]);

  // change between showing my activities, starred and sign ups
  const changeTab = (newTab: tab) => {
    setCurrentTab(newTab)
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    if (id && token) {
      if (newTab == tab.starred) {
        dispatch(getStarred(id, token))
      }
      else if (newTab == tab.signUp) {
        dispatch(getSignUps(id, token))
      }
      else if (newTab == tab.myAct) {
        dispatch(getMyActivities(id, token))
      }
    }
  }

  return (
    <PageWrapper>
      <Header />
      <RightWrapper>
        <PageHeader>Min side</PageHeader>
        <TabsWrapper>
          {tabComponents}
        </TabsWrapper>
        <ActivityDashboard events={events} isLoading={isLoading} error={error} />
      </RightWrapper>
    </PageWrapper>
  );
};

export default MyPage;
