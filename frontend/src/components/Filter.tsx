import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { redHexColorHover } from '../consts';
import { getCategories, getEquipment, getEvents, getOrgs } from '../store/actionCreators';
import { State } from '../store/types';
import { CustomButton, TextWrapper } from './Button';
import Button from './Button';
import './DropDown.css';
import './FilterSearchField.css';


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



interface SearchFieldProps {
  tittel: string;
  submitFunction: any;
}

const SearchField = (props: SearchFieldProps) => {
  const [ord, setOrd] = useState<string>("");

  const handleTyping = (event: any) => {
    setOrd(event.target.value);
  }

  const updateWord =  (event: any) => {
    props.submitFunction(ord)  
    setOrd("");  
  }

  return (
    <div>
      <form >
        <label className="filterSearchInputLabel">{"Skriv inn "+props.tittel+" ..."}
          <input 
          className="filterSearchInput" 
          type="text" 
          value={ord}
          onChange={handleTyping}
          />
        </label>
      </form>
      <button 
        className="inputButton" 
        type="submit" 
        onClick={updateWord}
        >
          {"Legg til "+props.tittel}
        </button>
    </div>
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
  items: string[];
  addFunction: any;
}

const DropDown = (props: DropDownProps) => {
  const [selected, setSelected] = useState<string>("");
  
  const handleGetItems = (item: string) => {
    return (
      <option key={item} className="dropDownItem" value={item}> {item} </option>
    );
  }
  const handleSelectDropDownItem = (event: any) => {
    let newValue = event.target.value;
    setSelected(newValue);
    props.addFunction(newValue);    
  }
  
  return (
    <form >
      <label className="dropDownLabel">{props.tittel+" :"}</label>
      <select className="dropDownWrapper" onChange={handleSelectDropDownItem} >
          <option className="dropDownItemTitle">{"-- Velg "+props.tittel+": --"}</option>
          {props.items.map(handleGetItems)}
        </select>
    </form>
  )
}




interface SelectedFiltersProps {
  tittel: string;
  filters: string [];
}

const SelectedFilters = ( props: SelectedFiltersProps) => {
  const renderButtons =  (filter: string) => {
    return (
      <FilterButton key={filter}>
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




// Main function for the filter component
const Filter = () => {
  const dispatch = useDispatch();

  // States of data from database
  const [availableOrganizations, setAvailableOrganizations] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableEquipment, setAvailableEquipment] = useState<string[]>([]);
  const [availableIntensity, setAvailableIntensity] = useState<string[]>(["Intensitet = 1", "Intensitet = 2", "Intensitet = 3", "Intensitet = 4", "Intensitet = 5"]);
 
  //States of the filter component
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);  // Collects all selected filters
  const [urlFilters, setUrlFilters] = useState<string>("");  
  const [selectedBoxFilters, setSelectedBoxFilters] = useState<string[]>([]);  // Collects filters chosen by checkboxes
  const [selectedEquipment, setSelectedEquipment] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [selectedIntensity, setSelectedIntensity] = useState<string>("");
  const [selectedKeyWord, setSelectedKeyWord] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  

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
    if (!organizations) {
      dispatch(getOrgs());
    } else {
      let orgs: string[] = [];
      organizations.forEach((org) => {orgs.push(org.name)})
      setAvailableOrganizations(orgs);
    }
  }, [dispatch, organizations]);


  useEffect(() => {
    if (!categoriesData) {
      dispatch(getCategories());
    } else {
      let cats: string[] = [];
      categoriesData.forEach((cat) => {cats.push(cat.name)})
      setAvailableCategories(cats);
    }
  }, [dispatch, categoriesData]);


  useEffect(() => {
    if (!equipmentData) {
      dispatch(getEquipment());
    } else {
      let equipments: string[] = [];
      equipmentData.forEach((equipment) => {equipments.push(equipment.name)})
      setAvailableEquipment(equipments);
    }
  }, [dispatch, equipmentData]);


  // Snakk med databasen
  useEffect(() => {
    dispatch(getEvents(urlFilters));
  }, [dispatch, urlFilters]);



  const handleSelectedCategoryItem = (filter: string) => {
    let currentSelectedCategory = selectedCategory;
    let newSelectedCategory = selectedCategory;
    let oldSelectedCategory = "";
    if (currentSelectedCategory!=filter && !filter.startsWith("--")) {
      newSelectedCategory = filter;
      oldSelectedCategory = currentSelectedCategory;
    }
    setSelectedCategory(newSelectedCategory);
    updateSelectedFilters(newSelectedCategory, oldSelectedCategory);
  }


  const handleSelectedEquipmentFilters = (filter: string) => {
    let currentSelectedEquipment = selectedEquipment;
    let newSelectedEquipment = selectedEquipment;
    let oldSelectedEquipment = "";
    if (currentSelectedEquipment!=filter && !filter.startsWith("--")) {
      newSelectedEquipment = filter;
      oldSelectedEquipment = currentSelectedEquipment;
    }
    setSelectedEquipment(newSelectedEquipment);
    updateSelectedFilters(newSelectedEquipment, oldSelectedEquipment);
  }


  const handleSelectedOrganizations = (filter: string) => {
    let currentSelectedOrganization = selectedOrganization;
    let newSelectedOrganization = selectedOrganization;
    let oldSelectedOrganization = "";
    if (currentSelectedOrganization!=filter && !filter.startsWith("--")) {
      newSelectedOrganization = filter;
      oldSelectedOrganization = currentSelectedOrganization;
    }
    setSelectedOrganization(newSelectedOrganization);
    updateSelectedFilters(newSelectedOrganization, oldSelectedOrganization);
  }


  const handleSelectIntensity = (filter: string) => {
    let currentSelectedIntensityFilter = selectedIntensity;
    let newSelectedIntensityFilter = selectedIntensity;
    let oldSelectedIntensityFilter = "";
    if (currentSelectedIntensityFilter!=filter && !filter.startsWith("--")) {
      newSelectedIntensityFilter = filter;
      oldSelectedIntensityFilter = currentSelectedIntensityFilter;
    }
    setSelectedIntensity(newSelectedIntensityFilter);
    updateSelectedFilters(newSelectedIntensityFilter, oldSelectedIntensityFilter);
  }


  const handleSubmitKeyword = (keyword: string) => {
    let currentSelectedKeyword = selectedIntensity;
    let newSelectedKeyword = selectedIntensity;
    let oldSelectedKeyword = "";
    if (currentSelectedKeyword!=keyword && !keyword.startsWith("--")) {
      newSelectedKeyword = keyword;
      oldSelectedKeyword = currentSelectedKeyword;
    }
    setSelectedKeyWord(newSelectedKeyword);
    updateSelectedFilters(newSelectedKeyword, oldSelectedKeyword);
  }


  const handleSubmitLocation = (location: string) => {
    let currentSelectedLocation = selectedIntensity;
    let newSelectedLocation = selectedIntensity;
    let oldSelectedLocation = "";
    if (currentSelectedLocation!=location && !location.startsWith("--")) {
      newSelectedLocation = location;
      oldSelectedLocation = currentSelectedLocation;
    }
    setSelectedLocation(newSelectedLocation);
    updateSelectedFilters(newSelectedLocation, oldSelectedLocation);
  }


  const updateSelectedFilters = (newFilter: string, oldFilter: string) => {
    let currentSelectedFilters = selectedFilters;
    let updatedSelectedFilters = selectedFilters;
      if (!currentSelectedFilters.includes(oldFilter) && oldFilter=="") {
        updatedSelectedFilters = currentSelectedFilters.concat(oldFilter);
        setSelectedFilters(updatedSelectedFilters);
      }
      if ( currentSelectedFilters.includes(oldFilter) && oldFilter!="") {
        let newSelectedFilters: string[] = [];
        currentSelectedFilters.forEach((filter) => {
          if (filter!=oldFilter) {
            newSelectedFilters.push(filter);
          }
        });
        newSelectedFilters.push(newFilter);
        updatedSelectedFilters = newSelectedFilters;
      }
    setSelectedFilters(updatedSelectedFilters);    
  }


  const refreshFilterSearch = (url: string) => {
    console.log(url);
    dispatch(getEvents(url));
  }


  const handleClear = () => {
    setSelectedFilters([]);
    setSelectedBoxFilters([]);
    setSelectedCategory("");
    setSelectedEquipment("");
    setSelectedIntensity("");
    setSelectedKeyWord("");
    setSelectedOrganization("");
  }

  useEffect (() => {
    console.log(selectedFilters);
    let string = "";
    // Steg1
    if (selectedKeyWord!="") {
      string += "title__icontains="+selectedKeyWord+"&";
      string += "description__icontains="+selectedKeyWord+"&";
    }
    if (selectedLocation!="") {
      string += "location_icontains="+selectedLocation+"&";
    }    
    if (selectedCategory!="") {
      string += "categories__name__icontains="+selectedCategory+"&";
    }
    if (selectedIntensity!="") {
      let intensity = selectedIntensity[0]
      string += "activity_level__icontains="+intensity.charAt(intensity.length-1)+"&";
    }
    if (selectedEquipment!="") {
      string += "equipment_used__name__icontains="+selectedEquipment+"&";
    }
    console.log(string)
    dispatch(getEvents(string));
  }, [selectedFilters])


  // This method generates the string that will be passed to collect activities or events based on selected filter.
  // This method is currently based on current possible filter functionalities, but can be expanded.
  


  return (
    <FilterWrapper>
      <FilterHeader> Søk etter aktiviteter: </FilterHeader>
      <SearchField tittel="søkeord" submitFunction={(keyword: string) => handleSubmitKeyword(keyword)}/>
      <SearchField tittel="sted" submitFunction={(location:string) => handleSubmitLocation(location)}/>
      <DropDownWrapAll>
        <DropDown 
          tittel="Kategori" 
          items={availableCategories}
          addFunction={(filter: string) => handleSelectedCategoryItem(filter)}/>
        <DropDown 
          tittel="Utstyr" 
          items={availableEquipment}
          addFunction={(filter: string) => handleSelectedEquipmentFilters(filter)}/>
        <DropDown 
          tittel="Organisasjon" 
          items={availableOrganizations}
          addFunction={(filter: string) => handleSelectedOrganizations(filter)}/>
        <DropDown 
          tittel="Intensistet" 
          items={availableIntensity}
          addFunction={(filter: string) => handleSelectIntensity(filter)}/>
      </DropDownWrapAll>
      <SelectedFilters tittel="Utvalgte filtre: " filters={selectedFilters} />
      <Button text={"Klikk for å nulstille filtre"} onClickFunc={handleClear}/>
    </FilterWrapper>
  );
  }


export default Filter;
