import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { redHexColorHover } from '../consts';
import { getEvents } from '../store/actionCreators';
import { State } from '../store/types';
import { CustomButton, TextWrapper } from './Button';

const FilterWrapper = styled.div`
  background-color: #c91801;
  height: 962px;
  width: inherit;
  border-style: none;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  align-content: space-between;
  `;

const FilterHeader = styled.h2`
  font-weight: bold;
  font-size: 21px;
  color: white;
  text-shadow: 4px 4px 4px darkred;
  padding: 5% 2% 0% 4%;
  `;

const FilterSearchInput = styled.div`
  width: 100% inherit;
  height: 30px inherit;
  background-color: #ffc6c6;
  margin: 0 4% 4% 4%;
  padding: 2% 2% 2% 3%;
  vertical-align: middle;
  color: #313131;
`;

const CheckBoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 4%;
  margin: 4% 4% 4% 0;
`;

const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  border-style: solid;
  border-color: white;
  opacity: 1;
  box-shadow: 4px 4px 4px #8b0000;

  &:hover {
    background-color: white;
  }
`;

const CheckBoxTittel = styled.div`
  font-weight: 600;
  font-size: 17px;
  color: white;
  padding-left: 4%;
  text-shadow: 4px 4px 4px #8b0000;
`;

const DropDown = styled.div`
  background-color: rgba(255,78,55,0.31);
  background-blend-mode: saturation;
  width: 187px;
  height: 35px;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.75;
  color: white;
  padding-left: 4%;
  margin: 4% 4% 0% 0%;
  text-shadow: 4px 4px 4px #8b0000;
  box-shadow: 4px 4px 4px #8b0000;

  &:hover{
    background-color: rgba(255,78,55);
  }
`;

const SelectedFiltersWrap = styled.div`
  background-color: rgba(255,78,55,0.31);
  width = 100% inherit;
  height: inherit;
  margin: 40px 4% 4% 4%;
  padding = 2%;
  flex-wrap: wrap;
  justify-content: flex-start;
  color: white;
`;

const Button = styled(CustomButton) `
  background-color: white;
  width: fit-content;
  min-width: 5em;
`

const ButtonTextWrapper = styled(TextWrapper) `
  color: darkred;
`


interface CheckBoxProps {
  tittel: string;
}

const CheckBoxes = ({tittel}: CheckBoxProps) => {
  return (
    <CheckBoxWrap>
      <CheckBox />
      <CheckBoxTittel>{tittel}</CheckBoxTittel>
    </CheckBoxWrap>
  );
}

interface SelectedFiltersProps {
  tittel: string;
  filters: Array<string>;
}

const SelectedFilters = ( props: SelectedFiltersProps) => {
  const test = ["Innendørs", "Sykkel", "Skistøvler", "Helikopter"];
  const renderButtons =  (filter: string) => {
    return (
      <Button>
        <ButtonTextWrapper>{filter}</ButtonTextWrapper>
      </Button>
    );
  }

  return (
    <SelectedFiltersWrap>
      <p>{props.tittel}</p>
      {test.map(renderButtons)}
    </SelectedFiltersWrap>
  );
}


const Filter = () => {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);  

  const {
    categories: categoriesData,
    isLoading: categoriesLoading,
  } = useSelector((state: State) => state.categoriesReducer);

  const {
    equipment: equipmentData,
    isLoading: equipmentLoading,
  } = useSelector((state: State) => state.equipmentReducer);

  const {
    organizations,
    isLoading: orgsLoading,
  } = useSelector((state: State) => state.orgsReducer);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <FilterWrapper>
      <FilterHeader> Søk etter aktiviteter: </FilterHeader>
      <FilterSearchInput> Skriv inn søkeørd ... </FilterSearchInput>
      <CheckBoxes tittel="Innendørs" />
      <CheckBoxes tittel="Utendørs" />
      <DropDown> Kategori </DropDown>
      <DropDown> Utstyr </DropDown>
      <DropDown> Organisasjon </DropDown>
      <DropDown> Intensistet </DropDown>
      <DropDown> Pris </DropDown>
      <SelectedFilters tittel="Utvalgte filtre: " filters={selectedFilters} />
    </FilterWrapper>
  );
  }


export default Filter;
