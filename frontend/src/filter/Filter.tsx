import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCategories, getEquipment, getEvents, getOrgs } from '../store/actionCreators';
import { State } from '../store/types';
import { CustomButton, TextWrapper } from '../components/Button';
import Button from '../components/Button';
import DropDown from './DropDown';
import SearchField from './SearchField';

// styling for tha main filter component
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

// styling for the header of 
const FilterHeader = styled.h2`
  font-weight: bold;
  font-size: 21px;
  color: white;
  text-shadow: 4px 4px 4px darkred;
  padding: 5% 2% 0% 4%;
`;

// size wrapping
const DropDownWrapAll = styled.div`
  height: fit-content;
  margin-top: 10%;
`;

// styling for container that displays buttons with information about selected filters
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

// styling for button displaying a selected filter
const FilterButton = styled(CustomButton)`
  background-color: white;
  width: fit-content;
  min-width: 5em;
`

// styling of text of FilterButton
const ButtonTextWrapper = styled(TextWrapper)`
  color: darkred;
`

interface SelectedFiltersProps {
  tittel: string;
  filters: string[];
}

// component that shows/displays filters that have been selected and that is currently being searched on.
const SelectedFilters = (props: SelectedFiltersProps) => {
  const renderButtons = (filter: string) => {
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

const availableIntensity = ["Intensitet = 1", "Intensitet = 2", "Intensitet = 3", "Intensitet = 4", "Intensitet = 5"];

// Main function for the filter component
const Filter = () => {
  const dispatch = useDispatch();

  // States of data from database
  const [availableOrganizations, setAvailableOrganizations] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableEquipment, setAvailableEquipment] = useState<string[]>([]);

  //States of the filter component
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);  // Collects all selected filters// Collects filters chosen by checkboxes
  const [selectedEquipment, setSelectedEquipment] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedOrganization, setSelectedOrganization] = useState<string>("");
  const [selectedIntensity, setSelectedIntensity] = useState<string>("");
  const [selectedKeyWord, setSelectedKeyWord] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");


  const {
    categories: categoriesData
  } = useSelector((state: State) => state.categoriesReducer);


  const {
    equipment: equipmentData
  } = useSelector((state: State) => state.equipmentReducer);

  const {
    organizations
  } = useSelector((state: State) => state.orgsReducer);


  useEffect(() => {
    if (!organizations) {
      dispatch(getOrgs());
    } else {
      let orgs: string[] = [];
      organizations.forEach((org) => { orgs.push(org.name) })
      setAvailableOrganizations(orgs);
    }
  }, [dispatch, organizations]);


  useEffect(() => {
    if (!categoriesData) {
      dispatch(getCategories());
    } else {
      let cats: string[] = [];
      categoriesData.forEach((cat) => { cats.push(cat.name) })
      setAvailableCategories(cats);
    }
  }, [dispatch, categoriesData]);


  useEffect(() => {
    if (!equipmentData) {
      dispatch(getEquipment());
    } else {
      let equipments: string[] = [];
      equipmentData.forEach((equipment) => { equipments.push(equipment.name) })
      setAvailableEquipment(equipments);
    }
  }, [dispatch, equipmentData]);


  const handleSelectedCategoryItem = (filter: string) => {
    let newSelectedCategory = selectedCategory;
    if (!filter.startsWith("--")) {
      newSelectedCategory = filter;
    }
    setSelectedCategory(newSelectedCategory);
  }

  const handleSelectedEquipmentFilters = (filter: string) => {
    let newSelectedEquipment = selectedEquipment;
    if (newSelectedEquipment != filter && !filter.startsWith("--")) {
      newSelectedEquipment = filter;
    }
    setSelectedEquipment(newSelectedEquipment);
  }

  const handleSelectedOrganizations = (filter: string) => {
    let newSelectedOrganization = selectedOrganization;
    if (newSelectedOrganization != filter && !filter.startsWith("--")) {
      newSelectedOrganization = filter;
    }
    setSelectedOrganization(newSelectedOrganization);
  }

  const handleSelectIntensity = (filter: string) => {
    let newSelectedIntensityFilter = selectedIntensity;
    if (newSelectedIntensityFilter != filter && !filter.startsWith("--")) {
      newSelectedIntensityFilter = filter;
    }
    setSelectedIntensity(newSelectedIntensityFilter);
  }

  const handleSubmitKeyword = (keyword: string) => {
    let newSelectedKeyword = selectedKeyWord;
    if (newSelectedKeyword != keyword && !keyword.startsWith("--")) {
      newSelectedKeyword = keyword;
    }
    setSelectedKeyWord(newSelectedKeyword);
  }

  const handleSubmitLocation = (location: string) => {
    let newSelectedLocation = selectedIntensity;
    if (newSelectedLocation != location && !location.startsWith("--")) {
      newSelectedLocation = location;
    }
    setSelectedLocation(newSelectedLocation);
  }

  const updateSelectedFilters = () => {
    let updatedSelectedFilters: string[] = [];
    let allFilters = [selectedKeyWord, selectedLocation, selectedCategory, selectedEquipment, selectedOrganization, selectedIntensity];
    allFilters.forEach((filterCategory) => {
      if (filterCategory != "") {
        updatedSelectedFilters = updatedSelectedFilters.concat(filterCategory);
      }
    });
    setSelectedFilters(updatedSelectedFilters);
  }

  useEffect(() => {
    updateSelectedFilters();
  }, [selectedCategory, selectedEquipment, selectedIntensity, selectedKeyWord, selectedLocation, selectedOrganization])

  const handleClear = () => {
    setSelectedFilters([]);
    setSelectedCategory("");
    setSelectedEquipment("");
    setSelectedIntensity("");
    setSelectedKeyWord("");
    setSelectedOrganization("");
    setSelectedLocation("");
  }

  useEffect(() => {
    let string = "";
    // Steg1
    if (selectedKeyWord != "") {
      string += "title__icontains=" + selectedKeyWord + "&";
    }
    if (selectedOrganization != "") {
      string += "organization_owner__name__icontains=" + selectedOrganization + "&";
    }
    if (selectedLocation != "") {
      string += "location__icontains=" + selectedLocation + "&";
    }
    if (selectedCategory != "") {
      string += "categories__name__icontains=" + selectedCategory + "&";
    }
    if (selectedIntensity != "") {
      let intensity = selectedIntensity
      string += "activity_level__icontains=" + intensity.charAt(intensity.length - 1) + "&";
    }
    if (selectedEquipment != "") {
      string += "equipment_used__name__icontains=" + selectedEquipment + "&";
    }

    const url = new URL(window.location.href)
    const type = url.searchParams.get("type") //aktiviteter or arrangementer
    if (type == "aktiviteter") {
      dispatch(getEvents("user", string)); //get all activities
    } else { dispatch(getEvents("organization", string)) } // get all events
  }, [selectedFilters])

  return (
    <FilterWrapper>
      <FilterHeader> Søk etter aktiviteter: </FilterHeader>
      <SearchField tittel="søkeord" submitFunction={(keyword: string) => handleSubmitKeyword(keyword)} />
      <SearchField tittel="sted" submitFunction={(location: string) => handleSubmitLocation(location)} />
      <DropDownWrapAll>
        <DropDown
          tittel="Kategori"
          items={availableCategories}
          addFunction={(filter: string) => handleSelectedCategoryItem(filter)} />
        <DropDown
          tittel="Utstyr"
          items={availableEquipment}
          addFunction={(filter: string) => handleSelectedEquipmentFilters(filter)} />
        <DropDown
          tittel="Organisasjon"
          items={availableOrganizations}
          addFunction={(filter: string) => handleSelectedOrganizations(filter)} />
        <DropDown
          tittel="Intensistet"
          items={availableIntensity}
          addFunction={(filter: string) => handleSelectIntensity(filter)} />
      </DropDownWrapAll>
      <SelectedFilters tittel="Utvalgte filtre: " filters={selectedFilters} />
      <Button text={"Klikk for å nulstille filtre"} onClickFunc={handleClear} />
    </FilterWrapper>
  );
}

export default Filter;
