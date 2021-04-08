import { useState } from 'react';
import './DropDown.css';

interface DropDownProps {
  tittel: string;
  items: string[];
  addFunction: any;
}

// dropdown component for the filter component
const DropDown = (props: DropDownProps) => {
  const [selected, setSelected] = useState<string>("");

  // retrieves and renders the available values based on existing data
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
      <label className="dropDownLabel">{props.tittel + " :"}</label>
      <select className="dropDownWrapper" onChange={handleSelectDropDownItem} >
        <option className="dropDownItemTitle">{"-- Velg " + props.tittel + ": --"}</option>
        {props.items.map(handleGetItems)}
      </select>
    </form>
  )
}


export default DropDown;
