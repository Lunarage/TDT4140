import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { redHexColorHover } from '../consts';
import { getEvents, getOrgs } from '../store/actionCreators';
import { State } from '../store/types';
import { CustomButton, TextWrapper } from './Button';
import Button from './Button';
import './DropDown.css';

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

const DropDownWrapAll = styled.div`
  height: fit-content;
  margin-top: 10%;
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

const FilterButton = styled(CustomButton) `
  background-color: white;
  width: fit-content;
  min-width: 5em;
`

const ButtonTextWrapper = styled(TextWrapper) `
  color: darkred;
`


const SearchField = () => {
  return (
    <FilterSearchInput>
      Skriv inn nøkkelord ...
    </FilterSearchInput>
  )
}

interface CheckBoxProps {
  tittel: string;
  onClick: () => void;
}

const CheckBoxes = (props: CheckBoxProps) => {
  return (
    <CheckBoxWrap>
      <CheckBox onClick= {props.onClick}/>
      <CheckBoxTittel>{props.tittel}</CheckBoxTittel>
    </CheckBoxWrap>
  );
}


interface DropDownProps {
  tittel: string;
}

const DropDown = (props: DropDownProps) => {
  
  return (
    <form>
      <label className="dropDownLabel">Kategorier</label>
      <select className="dropDownWrapper">
          <option className="dropDownText">Alt test 1</option>
          <option className="dropDownText">Alt test 2</option>
        </select>
    </form>
    
  )
}


interface SelectedFiltersProps {
  tittel: string;
  filters: Array<string>;
}

const SelectedFilters = ( props: SelectedFiltersProps) => {
  //const test = ["Innendørs", "Sykkel", "Skistøvler", "Helikopter"];
  const renderButtons =  (filter: string) => {
    return (
      <FilterButton>
        <ButtonTextWrapper>{filter}</ButtonTextWrapper>
      </FilterButton>
    );
  }

  return (
    <SelectedFiltersWrap>
      <p>{props.tittel}</p>
      {props.filters.map(renderButtons)}
    </SelectedFiltersWrap>
  );
}


const Filter = () => {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["Det funker, yay!"]);
  const [urlFilters, setUrlFilters] = useState<string>("");  

  const {
    categories: categoriesData,
    isLoading: categoriesLoading,
  } = useSelector((state: State) => state.categoriesReducer);
  console.log(categoriesData);

  const {
    equipment: equipmentData,
    isLoading: equipmentLoading,
  } = useSelector((state: State) => state.equipmentReducer);

  const {
    organizations,
    isLoading: orgsLoading,
  } = useSelector((state: State) => state.orgsReducer);
  console.log(organizations);

  useEffect(() => {
    if (!organizations) {
      dispatch(getOrgs());
    }
  }, [dispatch, organizations]);

  useEffect(() => {
    dispatch(getEvents(urlFilters));
  }, [dispatch, urlFilters]);


  const handleOnClickSelect = (filter: string) => {
    setSelectedFilters(selectedFilters.concat(filter));
  }

  const handleClear = () => {
    setSelectedFilters([]);
  }


  return (
    <FilterWrapper>
      <FilterHeader> Søk etter aktiviteter: </FilterHeader>
      <SearchField />
      <CheckBoxes tittel="Innendørs" onClick={() => handleOnClickSelect("Innendørs")}/>
      <CheckBoxes tittel="Utendørs" onClick={() => handleOnClickSelect("Utendørs")}/>
      <CheckBoxes tittel="Gratis (Pris: 0kr)" onClick={() => handleOnClickSelect("Gratis (Pris: 0kr)")}/>
      <DropDownWrapAll>
        <DropDown tittel="Kategori" />
        <DropDown tittel="Utstyr" />
        <DropDown tittel="Organisasjon" />
        <DropDown tittel="Intensistet" />
      </DropDownWrapAll>
      <SelectedFilters tittel="Utvalgte filtre: " filters={selectedFilters} />
      <Button text={"Klikk for å nulstille filtre"} onClickFunc={handleClear}/>
    </FilterWrapper>
  );
  }


export default Filter;
