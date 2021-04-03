import React from 'react';
import ReactDOM from 'react-dom';
import './filterSearch.css';


interface FilterHeaderProps {
  tittel: string;
}

function FilterHeader(tittel: FilterHeaderProps) {
  return (
    <div className="filter-header">
      <h3>{tittel}</h3>
    </div>
  )
}



class FilterSearchInput extends React.Component {
  render () {
    return (
      <div className="filter-search-input">
        <div className="filter-search-input-text"> Skriv inn søkeord ...</div>
      </div>
    );
  }
}


interface CheckBoxProps {
  tittel: string;
}

function CheckBox (props: CheckBoxProps) {
  return (
    <div className="filter-checkbox-wrapper">
      <div className="filter-checkbox" ></div>
      <div className="filter-checkbox-text">{props.tittel}</div>
    </div>
  );
}


interface DropDownProps {
  tittel: string;
}

function DropDown (tittel: DropDownProps){
  return (
    <div className="filter-dropdown">
      <div>{tittel}</div>
      <div>{"v"}</div>
    </div>
  );
}


interface FilterButtonProps {
  filter: string;
}

function FilterButton (filter: FilterButtonProps) {
  return (
    <div className="selected-filter-button">
      <div className="selected-filter-button-text">
        {filter}
      </div>
      <div className="selected-filter-button-x">
        {"x"}
      </div>
    </div>
  );
}


function SelectedFilters () {
    return (
      <div className="selected-filters-wrapper">
        <div> Utvalgte filtre: </div>
      </div>
    );
  }

interface FilterSearchProps {
  selectedFilters: Array<string>;
}


class FilterSearch extends React.Component {
  constructor(props: FilterSearchProps) {
    super(props);
    this.state = {
      selectedFilters: ["Sykkel", "Utendørs", "Båt"],
    }
  }

  handleClickOnBox(filter: string) {
    //const selectedFilters = this.state.selectedFilters;
    <FilterButton filter={filter}></FilterButton>
  }

  render() {
    return (
      <div className="filter-wrapper">
        <FilterHeader tittel={"Søk etter aktiviteter: "} />
        <FilterSearchInput />
        <CheckBox tittel="I" />
        <CheckBox tittel="U" />
        <DropDown tittel="Kategorier"/>
        <DropDown tittel="Utstyr"/>
        <DropDown tittel="Organisasjon"/>
        <DropDown tittel="Intensitet"/>
        <DropDown tittel="Pris"/>
        <SelectedFilters />
      </div>
    );
  }

}

ReactDOM.render(
  <FilterSearch />,
  document.getElementById('root')
);

export default FilterSearch;