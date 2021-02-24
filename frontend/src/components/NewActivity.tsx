import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CloseButton, TextContentWrapper, Wrapper } from './ActivityExpand';
import { redHexColor } from '../consts';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store/types';
import { getCategories, getEquipment } from '../store/actionCreators';

const WhiteCloseButton = styled(CloseButton)`
  background-color: white;
  color: ${redHexColor};
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
  const [maxparticipants, setMaxparticipants] = useState<string>()
  const [activityLevel, setActivityLevel] = useState<string>()
  const [categories, setCategories] = useState<string>()
  const [equipment, setEquipment] = useState<string>()

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

  useEffect(() => {
    !categoriesData && dispatch(getCategories());
  }, [categoriesData, dispatch]);

  // setting and getting backend data
  useEffect(() => {
    !equipmentData && dispatch(getEquipment());
  }, [equipmentData, dispatch]);

  return (
    <Wrapper>
      <WhiteCloseButton onClick={onExitFunc} >X </WhiteCloseButton>
      <TextContentWrapper>
      </TextContentWrapper>
    </Wrapper >
  );
}

export default NewActivity
