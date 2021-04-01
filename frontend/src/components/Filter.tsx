import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  margin-left: 20px;
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



export const Filter = () => {
  return (
    <FilterWrapper>
      <FilterHeader> Søk etter aktiviteter: </FilterHeader>
      <FilterSearchInput> Skriv inn søkeørd ... </FilterSearchInput>
      <CheckBoxes tittel="Innendørs" />
      <CheckBoxes tittel="Utendørs" />
    </FilterWrapper>
  )
}

export default Filter;
