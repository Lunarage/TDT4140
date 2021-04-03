import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import {
  PageHeader as BasePageHeader,
  RightWrapper,
  FilterWrapper,
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

const TabsWrapper = styled(FilterWrapper)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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

  useEffect(() => {
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    if (id && token) {
      if (!starred && !starredIsLoading) {
        dispatch(getStarred(id, token))
      }
      if (!signUps && !signUpsIsLoading) {
        dispatch(getSignUps(id, token))
      }
      if (!myActivities && !myActivitiesIsLoading) {
        dispatch(getMyActivities(id, token))
      }
    }
    changeTab(currentTab)
  }, [starred, myActivities, signUps, currentTab]);

  const changeTab = (newTab: tab) => {
    setCurrentTab(newTab);
    if (newTab == tab.starred) {
      setEvents(starred)
      setIsLoading(starredIsLoading)
      setError(starredError)
    }
    else if (newTab == tab.signUp) {
      setEvents(signUps)
      setIsLoading(signUpsIsLoading)
      setError(signUpsError)
    }
    else if (newTab == tab.myAct) {
      setEvents(myActivities)
      setIsLoading(myActivitiesIsLoading)
      setError(myActivitiesError)
    }
  }

  useEffect(() => {
    const tabList = [tab.myAct, tab.signUp, tab.starred]
    let tempTabComponents: JSX.Element[] = []
    tabList.forEach(t => {
      if (t == currentTab) {
        tempTabComponents.push(<TabUnderlined onClick={() => changeTab(t)}>{t}</TabUnderlined>)
      } else {
        tempTabComponents.push(<Tab onClick={() => changeTab(t)}>{t}</Tab>)
      }
    })
    setTabComponents(tempTabComponents)
  }, [currentTab])

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
