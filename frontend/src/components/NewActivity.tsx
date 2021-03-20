import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ActivityExpandHeader, CloseButton, Wrapper as BaseWrapper } from './ActivityExpand';
import { redHexColor } from '../consts';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store/types';
import { getCategories, getCurrentUser, getEquipment, postEvent, getOrgs } from '../store/actionCreators';
import { Dropdown, Input, TextArea } from 'semantic-ui-react';
import { CustomButton, TextWrapper } from './Button';
import { allDigits, isIsoDate, parseIntWithUndefined, isFutureDate } from '../functions';
import Loading from './Loading';


type Dropdown = { key: number, value: string, text: string }[]

const Button = styled(CustomButton)`
  background-color: white;
  max-width: 5em;
  position: absolute;
  right: 1em;
  bottom: 0.5em;

  &:hover {
    cursor: pointer;
    background-color: #ddd;
  }
`;

const ButtonTextWrapper = styled(TextWrapper)`
  color: ${redHexColor};
`;

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

const ErrorMessage = styled.div`
  padding-left: 0.8em;
  display: flex;
  justify-content: center;
`;

const Header = styled(ActivityExpandHeader)`
  flex-direction: row;
  justify-content: space-evenly;
`;

const HeaderItem = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const HeaderItemUnderlined = styled(HeaderItem)`
    text-decoration: underline;
`;

interface NewActivityProps {
  onExitFunc: (submit: boolean) => void;
}

const findDictValueInList = (allDicts: { id: number, name: string }[], values: string[]) => {
  let list: number[] = []
  allDicts.forEach(dict => { if (values.includes(dict.name)) { list.push(dict.id) } })
  return list
}

const NewActivity = ({ onExitFunc }: NewActivityProps) => {
  const dispatch = useDispatch();

  const [createEvent, setCreateEvent] = useState<boolean>(true)

  const [emptyFields, setEmptyFields] = useState<boolean>(false)
  const [invalidFields, setInvalidFields] = useState<string | null>(null)
  const [futureDate, setFutureDate] = useState<boolean>(true)

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
    user,
  } = useSelector((state: State) => state.getUserReducer);

  const {
    currentUser,
    isLoading: currUserLoading,
  } = useSelector((state: State) => state.getCurrentUserReducer);

  const {
    organizations,
    isLoading: orgsLoading,
  } = useSelector((state: State) => state.orgsReducer);

  useEffect(() => {
    if (user) {
      !currentUser && dispatch(getCurrentUser(user.token));
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

  const handleSubmit = () => {
    setEmptyFields(false)
    setInvalidFields(null)
    let categoriesIdList
    let equipmentIdList
    if (categoriesData && equipmentData) {
      categoriesIdList = findDictValueInList(categoriesData, selectedCategories.split(","))
      equipmentIdList = findDictValueInList(equipmentData, selectedEquipment.split(","))
    }
    if (!title || !location || !description || (createEvent && (!time || !selectedOrgName || !date))) {
      setEmptyFields(true)
    } else {
      if (!allDigits(maxParticipants)) {
        setInvalidFields("maks deltakere")
      } else if (activityLevel && (!allDigits(activityLevel) || (0 >= parseInt(activityLevel)) || (5 < parseInt(activityLevel)))) {
        setInvalidFields("aktivitetsnivå")
      }
      else if (createEvent) {
        const fullDate = date + "T" + time + ":00Z"
        let orgId
        orgsDropdown.forEach(org => {
          if (org.value === selectedOrgName) {
            orgId = org.key
          }
        })
        if (!isIsoDate(fullDate)) {
          setInvalidFields("dato eller starttid")
        } else if (!isFutureDate(fullDate)) {
          setFutureDate(false)
        } else {
          if (user) {
            dispatch(postEvent(title,
              fullDate,
              description,
              location,
              categoriesIdList,
              equipmentIdList,
              parseIntWithUndefined(maxParticipants),
              parseIntWithUndefined(activityLevel),
              orgId,
              user.id,
              user.token))
            onExitFunc(true)
          }
        }
      }
      else if (!createEvent && user) {
        dispatch(postEvent(title,
          undefined,
          description,
          location,
          categoriesIdList,
          equipmentIdList,
          parseIntWithUndefined(maxParticipants),
          parseIntWithUndefined(activityLevel),
          undefined,
          user.id,
          user.token))
        onExitFunc()
      }
    }
  }

  const handleCloseButton = () => {
    onExitFunc(false)
  }

  if (currUserLoading) return <Loading />

  return (
    <WidgetWrapper>
      <CloseButton onClick={onExitFunc} > X </CloseButton>
      <Header>
        {createEvent ?
          <HeaderItemUnderlined> Arrangement </HeaderItemUnderlined> :
          <HeaderItem onClick={() => setCreateEvent(true)}> Arrangement </HeaderItem>
        }
        {createEvent ?
          <HeaderItem onClick={() => setCreateEvent(false)}> Aktivitet </HeaderItem> :
          <HeaderItemUnderlined> Aktivitet </HeaderItemUnderlined>
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
        <Button onClick={() => handleSubmit()}>
          <ButtonTextWrapper>Publiser</ButtonTextWrapper>
        </Button>
      </Wrapper >
      {emptyFields && <ErrorMessage>Fyll ut alle feltene merket med *</ErrorMessage>}
      {invalidFields && <ErrorMessage>Feltet {invalidFields} er ikke gyldig</ErrorMessage>}
      {!futureDate && <ErrorMessage> Tidspunkt må være i fremtiden </ErrorMessage>}
    </WidgetWrapper>
  );
}

export default NewActivity
