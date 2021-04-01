import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const FilterWrapper = styled.div`
  background-color: #c91801;
  height: 962px;
  width: 326px;
  border-style: none;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  align-content: space-between;
  `;

const FilterHeader = styled.h2`
  font-weight: bold;
  font-size: 30px;
  color: white;
  text-shadow: 4px 4px 4px darkred;
  padding: 2% 2% 0% 3%;
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
  padding-top: 4%;
  padding-left: 4%;
`;

const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  border-style: solid;
  border-color: white;
  opacity: 1;
  box-shadow: 4px 4px 4px #8b0000;
`;

const CheckBoxTittel = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: white;
  padding-left: 4%;
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
`;

const SelectedFiltersWrap = styled.div`
  background-color: rgba(255,78,55,0.31);
  width = 100% inherit;
  height: 390px;
  margin: 40px 4% 0 4%;
  padding = 2%;
  flex-wrap: wrap;
  justify-content: flex-start;
  color: white;
`;

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
  filters: Array<String>;
}

const SelectedFilters = ({tittel}: SelectedFiltersProps) => {
  return (
    <SelectedFiltersWrap>
      <p>{tittel}</p>
      <Button text="test1" onClickFunc={() => null} ></Button> 
      <Button text="test2" onClickFunc={() => null} ></Button>
      <Button text="Laaaaaaaaaang Test" onClickFunc={() => null} ></Button>
    </SelectedFiltersWrap>
  );
}





export const Filter = () => {
  const filters = ["Sykkel", "Utendørs"];

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
      <SelectedFilters tittel="Utvalgte filtre: " filters={filters} />
    </FilterWrapper>
  )
}

export default Filter;
