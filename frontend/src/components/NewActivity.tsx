import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ActivityExpandHeader, CloseButton, Wrapper as BaseWrapper } from './ActivityExpand';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store/types';
import { getCategories, getCurrentUser, getEquipment, postEvent, getOrgs } from '../store/actionCreators';
import { Dropdown, Input, TextArea } from 'semantic-ui-react';
import { allDigits, isIsoDate, parseIntWithUndefined, isFutureDate } from '../functions';
import Loading from './Loading';
import Button from './Button';

// dropdown must recieve this type
type Dropdown = { key: number, value: string, text: string }[]

const ButtonWrapper = styled.div`
  position: absolute;
  right: 1em;
  bottom: 0.5em;
`;

// Wrapper for widget without header and close button
const Wrapper = styled.div`
  display: flex;
  padding-top: 1em;
  padding-bottom: 1em;
  font-size: 17px;
  justify-content: center;
  min-height: 300px;
`;

const WidgetWrapper = styled(BaseWrapper)`
  min-height: 300px;
  height: auto;
  padding-bottom: 1.9em;
`;

const LineWrapper = styled.div`
  margin: 4px;
  display: flex;
  width: auto;
  height: auto;
  justify-content: space-between;
`;

const BoldText = styled.div`
  font-size: 0.8em;
  font-weight: bold;
  color: white;
  margin-right: 1em;
`;

export const TextContentWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  padding: 23px;
`;

export const ErrorMessage = styled.div`
  padding-left: 0.8em;
  display: flex;
  justify-content: center;
`;

const Header = styled(ActivityExpandHeader)`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const HeaderItem = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const HeaderItemUnderlined = styled(HeaderItem)`
    text-decoration: underline;
`;

interface NewActivityProps {
  onExitFunc: (submit: boolean) => void;
}

// finds ids from names in equipment and categories lists. 
const findDictValueInList = (allDicts: { id: number, name: string }[], values: string[]) => {
  let list: number[] = []
  allDicts.forEach(dict => { if (values.includes(dict.name)) { list.push(dict.id) } })
  return list
}

const NewActivity = ({ onExitFunc }: NewActivityProps) => {
  const dispatch = useDispatch();

  // false => create activity. true => create event
  const [createEvent, setCreateEvent] = useState<boolean>(true)

  // states for invalid input
  const [emptyFields, setEmptyFields] = useState<boolean>(false)
  const [invalidFields, setInvalidFields] = useState<string | null>(null)
  const [futureDate, setFutureDate] = useState<boolean>(true)

  // states for all fields
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [location, setLocation] = useState<string>()
  const [date, setDate] = useState<string>()
  const [time, setTime] = useState<string>()
  const [maxParticipants, setMaxParticipants] = useState<string>()
  const [activityLevel, setActivityLevel] = useState<string>()

  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("");
  const [selectedOrgName, setSelectedOrgName] = useState<string>("");

  const {
    categories: categoriesData,
    isLoading: categoriesLoading,
  } = useSelector((state: State) => state.categoriesReducer);

  const {
    equipment: equipmentData,
    isLoading: equipmentLoading,
  } = useSelector((state: State) => state.equipmentReducer);

  const {
    currentUser,
    isLoading: currUserLoading,
  } = useSelector((state: State) => state.getCurrentUserReducer);

  const {
    organizations,
    isLoading: orgsLoading,
  } = useSelector((state: State) => state.orgsReducer);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      !currentUser && dispatch(getCurrentUser(token));
    }
    !organizations && dispatch(getOrgs());
  }, [dispatch]);

  const categoriesDropdown =
    categoriesData &&
    categoriesData.map((category) => ({
      key: category.id,
      value: category.name,
      text: category.name,
    }));

  const equipmentDropdown =
    equipmentData &&
    equipmentData.map((equipment) => ({
      key: equipment.id,
      value: equipment.name,
      text: equipment.name,
    }));

  const [orgsDropdown, setOrgsDropdown] = useState<Dropdown>([])

  useEffect(() => {
    !categoriesData && dispatch(getCategories());
  }, [categoriesData, dispatch]);

  useEffect(() => {
    !equipmentData && dispatch(getEquipment());
  }, [equipmentData, dispatch]);

  useEffect(() => {
    // find all organizations where user is a member
    if (organizations && currentUser) {
      organizations.forEach(org => {
        let nameList: string[] = []
        let orgs: Dropdown = []
        if (org.user_member.includes(currentUser[0].username)) {
          nameList.push(org.name)
          orgs.push({ key: org.id, value: org.name, text: org.name })
        }
        setOrgsDropdown(orgs)
      })
    }
  }, [organizations, currentUser]);

  // checks if input is valid, and potentially posts the activity
  const handleSubmit = () => {
    setEmptyFields(false)
    setInvalidFields(null)
    let categoriesIdList
    let equipmentIdList
    if (categoriesData && equipmentData) {
      categoriesIdList = findDictValueInList(categoriesData, selectedCategories.split(","))
      equipmentIdList = findDictValueInList(equipmentData, selectedEquipment.split(","))
    }
    // these are requiered fields. Some depending on if the user creates an activity or event
    if (!title || !location || !description || (createEvent && (!time || !selectedOrgName || !date))) {
      setEmptyFields(true)
    } else {
      const userToken = localStorage.getItem("token")
      let userId = parseIntWithUndefined(localStorage.getItem("id"))
      // some checks for valid input
      if (!allDigits(maxParticipants)) {
        setInvalidFields("maks deltakere")
      } else if (activityLevel && (!allDigits(activityLevel) || (0 >= parseInt(activityLevel)) || (5 < parseInt(activityLevel)))) {
        setInvalidFields("aktivitetsnivå")
      }
      // create event
      else if (createEvent) {
        const fullDate = date + "T" + time + ":00Z"
        let orgId
        // finds org id from name
        orgsDropdown.forEach(org => {
          if (org.value === selectedOrgName) {
            orgId = org.key
          }
        })
        // checks for date
        if (!isIsoDate(fullDate)) {
          setInvalidFields("dato eller starttid")
        } else if (!isFutureDate(fullDate)) {
          setFutureDate(false)
        } else {
          if (userToken && userId) {
            dispatch(postEvent(title,
              fullDate,
              description,
              location,
              categoriesIdList,
              equipmentIdList,
              parseIntWithUndefined(maxParticipants),
              parseIntWithUndefined(activityLevel),
              orgId,
              userId,
              undefined,
              userToken))
            onExitFunc(true)
          }
        }
      }
      // create activity
      else if (!createEvent && userId && userToken) {
        dispatch(postEvent(title,
          undefined,
          description,
          location,
          categoriesIdList,
          equipmentIdList,
          parseIntWithUndefined(maxParticipants),
          parseIntWithUndefined(activityLevel),
          undefined,
          userId,
          undefined,
          userToken))
        onExitFunc(true)
      }
    }
  }

  const handleCloseButton = () => {
    onExitFunc(false)
  }

  if (currUserLoading) return <Loading />

  return (
    <WidgetWrapper>
      <CloseButton onClick={handleCloseButton} > X </CloseButton>
      <Header>
        {createEvent ? // underline selected tab
          <HeaderItem onClick={() => setCreateEvent(false)}> Aktivitet </HeaderItem> :
          <HeaderItemUnderlined> Aktivitet </HeaderItemUnderlined>
        }
        {createEvent ?
          <HeaderItemUnderlined> Arrangement </HeaderItemUnderlined> :
          <HeaderItem onClick={() => setCreateEvent(true)}> Arrangement </HeaderItem>
        }
      </Header>
      <Wrapper>
        <TextContentWrapper>
          <LineWrapper>
            <BoldText>Tittel*: </BoldText>
            <Input
              size="mini"
              onChange={(event) => setTitle(event.target.value)}
            />
          </LineWrapper>
          <LineWrapper>
            <BoldText>Lokasjon*: </BoldText>
            <Input
              size="mini"
              onChange={(event) => setLocation(event.target.value)}
            />
          </LineWrapper>
          {createEvent && <LineWrapper>
            <BoldText>Dato*: </BoldText>
            <Input
              size="mini"
              placeholder="YYYY-MM-DD"
              onChange={(event) => setDate(event.target.value)}
            />
          </LineWrapper>}
          {createEvent && <LineWrapper>
            <BoldText>Starttid*: </BoldText>
            <Input
              size="mini"
              placeholder="hh:mm"
              onChange={(event) => setTime(event.target.value)}
            />
          </LineWrapper>}
          <LineWrapper>
            <BoldText>Maks deltakere: </BoldText>
            <Input
              size="mini"
              onChange={(event) => setMaxParticipants(event.target.value)}
            />
          </LineWrapper>
          <LineWrapper>
            <BoldText>Aktivitetsnivå: </BoldText>
            <Input
              size="mini"
              placeholder="1-5"
              onChange={(event) => setActivityLevel(event.target.value)}
            />
          </LineWrapper>
        </TextContentWrapper>
        <TextContentWrapper>
          {createEvent && <LineWrapper>
            <BoldText>Organisasjon*: </BoldText>
            {!orgsLoading ? (
              <Dropdown
                placeholder="Velg organisasjon"
                search
                options={orgsDropdown}
                selection
                onChange={(e, data) =>
                  data.value && setSelectedOrgName(data.value.toString())
                }
              />
            ) : (
              "loading..."
            )}
          </LineWrapper>}
          <LineWrapper>
            <BoldText>Kategorier: </BoldText>
            {!categoriesLoading ? (
              <Dropdown
                placeholder="Velg kategorier"
                multiple
                search
                options={categoriesDropdown}
                selection
                onChange={(e, data) =>
                  data.value && setSelectedCategories(data.value.toString())
                }
              />
            ) : (
              "loading..."
            )}
          </LineWrapper>
          <LineWrapper>
            <BoldText>Utstyr: </BoldText>
            {!equipmentLoading ? (
              <Dropdown
                placeholder="Velg utstyr"
                multiple
                search
                options={equipmentDropdown}
                selection
                onChange={(e, data) =>
                  data.value && setSelectedEquipment(data.value.toString())
                }
              />
            ) : (
              "loading..."
            )}
          </LineWrapper>
          <BoldText>Beskrivelse*: </BoldText>
          <TextArea
            style={{ minHeight: 100 }}
            onChange={(event) => setDescription(event.target.value)}
          />
        </TextContentWrapper>
        <ButtonWrapper>
          <Button text="Publiser" onClickFunc={() => handleSubmit()} colorInvert={true} />
        </ButtonWrapper>
      </Wrapper >
      {emptyFields && <ErrorMessage>Fyll ut alle feltene merket med *</ErrorMessage>}
      {invalidFields && <ErrorMessage>Feltet {invalidFields} er ikke gyldig</ErrorMessage>}
      {!futureDate && <ErrorMessage> Tidspunkt må være i fremtiden </ErrorMessage>}
    </WidgetWrapper>
  );
}

export default NewActivity
