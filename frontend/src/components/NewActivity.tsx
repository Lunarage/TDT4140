import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CloseButton, Wrapper as BaseWrapper } from './ActivityExpand';
import { redHexColor } from '../consts';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store/types';
import { getCategories, getEquipment } from '../store/actionCreators';
import { Dropdown, Input, TextArea } from 'semantic-ui-react';
import { CustomButton, TextWrapper } from './Button';

const WhiteCloseButton = styled(CloseButton)`
  background-color: white;
  color: ${redHexColor};
`;

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

const Wrapper = styled(BaseWrapper)`
  display: flex;
  padding-top: 1em;
  padding-bottom: 1.9em;
`;

const LineWrapper = styled.div`
  margin: 4px;
  display: flex;
  width: auto;
  justify-content: space-between;
`;

const BoldText = styled.div`
  font-size: 0.8em;
  font-weight: bold;
  color: white;
  margin-right: 1em;
`;

export const TextContentWrapper = styled.div`
  width: 22em;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

interface NewActivityProps {
  onExitFunc: () => void;
}

const NewActivity = ({ onExitFunc }: NewActivityProps) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [location, setLocation] = useState<string>()
  const [date, setDate] = useState<string>()
  const [time, setTime] = useState<string>()
  const [maxParticipants, setMaxParticipants] = useState<string>()
  const [activityLevel, setActivityLevel] = useState<string>()
  const [categories, setCategories] = useState<string>()
  const [equipment, setEquipment] = useState<string>()

  const [selectedCategories, setSelectedCategories] = useState<string>();
  const [selectedEquipment, setSelectedEquipment] = useState<string>();

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

  useEffect(() => {
    !categoriesData && dispatch(getCategories());
  }, [categoriesData, dispatch]);

  // setting and getting backend data
  useEffect(() => {
    !equipmentData && dispatch(getEquipment());
  }, [equipmentData, dispatch]);

  if (categoriesError) throw categoriesError;
  if (equipmentError) throw equipmentError;

  const handleSubmit = () => {
    console.log("submit")
  }

  return (
    <Wrapper>
      <WhiteCloseButton onClick={onExitFunc} >X </WhiteCloseButton>
      <TextContentWrapper>
        <LineWrapper>
          <BoldText>Tittel: </BoldText>
          <Input
            size="mini"
            onChange={(event) => setTitle(event.target.value)}
          />
        </LineWrapper>
        <LineWrapper>
          <BoldText>Lokasjon: </BoldText>
          <Input
            size="mini"
            onChange={(event) => setLocation(event.target.value)}
          />
        </LineWrapper>
        <LineWrapper>
          <BoldText>Dato: </BoldText>
          <Input
            size="mini"
            placeholder="YYYY-MM-DD"
            onChange={(event) => setDate(event.target.value)}
          />
        </LineWrapper>
        <LineWrapper>
          <BoldText>Starttid: </BoldText>
          <Input
            size="mini"
            placeholder="hh:mm:ss"
            onChange={(event) => setTime(event.target.value)}
          />
        </LineWrapper>
        <LineWrapper>
          <BoldText>Max deltakere : </BoldText>
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
          <BoldText>Kategorier: </BoldText>
          {!categoriesLoading ? (
            <Dropdown
              placeholder="Select Categories"
              value={selectedCategories ? selectedCategories.split(",") : []}
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
              placeholder="Select Equipment"
              value={selectedEquipment ? selectedEquipment.split(",") : []}
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
        <BoldText>Beskrivelse: </BoldText>
        <TextArea
          style={{ minHeight: 100 }}
          onChange={(event) => setDescription(event.target.value)}
        />
      </TextContentWrapper>
      <Button onClick={() => handleSubmit()}>
        <ButtonTextWrapper>Publiser</ButtonTextWrapper>
      </Button>
    </Wrapper >
  );
}

export default NewActivity
