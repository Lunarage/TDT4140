import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ActivityExpandHeader, CloseButton, Wrapper as BaseWrapper } from './ActivityExpand';
import { redHexColor } from '../consts';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store/types';
import { getCategories, getCurrentUser, getEquipment, postEvent, getOrgs } from '../store/actionCreators';
import { Dropdown, Input, StrictDropdownDividerProps, TextArea } from 'semantic-ui-react';
import { CustomButton, TextWrapper } from './Button';
import { allDigits, isIsoDate, parseIntWithUndefined } from '../functions';


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

interface NewActivityProps {
  onExitFunc: () => void;
}

const findDictValueInList = (allDicts: { id: number, name: string }[], values: string[]) => {
  let list: number[] = []
  allDicts.forEach(dict => { if (values.includes(dict.name)) { list.push(dict.id) } })
  return list
}

const NewActivity = ({ onExitFunc }: NewActivityProps) => {
  const dispatch = useDispatch();

  const [emptyFields, setEmptyFields] = useState<boolean>(false)
  const [invalidFields, setInvalidFields] = useState<string | null>(null)

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

  const [connectedOrgsName, setConnectedOrgsName] = useState<string>("")

  const {
    categories: categoriesData,
    isLoading: categoriesLoading,
    errorMessage: categoriesError,
  } = useSelector((state: State) => state.categoriesReducer);

  const {
    equipment: equipmentData,
    isLoading: equipmentLoading,
    errorMessage: equipmentError,
  } = useSelector((state: State) => state.equipmentReducer);

  const {
    user,
  } = useSelector((state: State) => state.getUserReducer);

  const {
    currentUser,
  } = useSelector((state: State) => state.getCurrentUserReducer);

  const {
    organizations,
    isLoading: orgsLoading,
    errorMessage: orgsError,
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
        setConnectedOrgsName(nameList.toString())
      })
    }
  }, [organizations, currentUser]);

  if (categoriesError) throw categoriesError;
  if (equipmentError) throw equipmentError;
  if (orgsError) throw orgsError;

  const handleSubmit = () => {
    setEmptyFields(false)
    setInvalidFields(null)
    if (!title || !location || !date || !description || !time || !selectedOrgName) {
      setEmptyFields(true)
    } else {
      const fullDate = date + "T" + time + ":00Z"
      let orgId
      orgsDropdown.forEach(org => {
        if (org.value === selectedOrgName) {
          orgId = org.key
        }
      })
      if (orgId) {
        if (!isIsoDate(fullDate)) {
          setInvalidFields("dato")
        } else if (!allDigits(maxParticipants)) {
          setInvalidFields("maks deltakere")
        } else if (activityLevel && (!allDigits(activityLevel) || (0 >= parseInt(activityLevel)) || (5 <= parseInt(activityLevel)))) {
          setInvalidFields("aktivitetsnivå")
        } else {
          if (categoriesData && equipmentData && user) {
            const categoriesIdList = findDictValueInList(categoriesData, selectedCategories.split(","))
            const equipmentIdList = findDictValueInList(equipmentData, selectedEquipment.split(","))
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
            onExitFunc()
          }
        }
      }
    }
  }

  return (
    <WidgetWrapper>
      <CloseButton onClick={onExitFunc} >X </CloseButton>
      <ActivityExpandHeader>
        &nbsp; &nbsp; Legg til et arrangement
      </ActivityExpandHeader>
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
          <LineWrapper>
            <BoldText>Dato*: </BoldText>
            <Input
              size="mini"
              placeholder="YYYY-MM-DD"
              onChange={(event) => setDate(event.target.value)}
            />
          </LineWrapper>
          <LineWrapper>
            <BoldText>Starttid*: </BoldText>
            <Input
              size="mini"
              placeholder="hh:mm"
              onChange={(event) => setTime(event.target.value)}
            />
          </LineWrapper>
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
          <LineWrapper>
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
          </LineWrapper>
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
    </WidgetWrapper>
  );
}

export default NewActivity
