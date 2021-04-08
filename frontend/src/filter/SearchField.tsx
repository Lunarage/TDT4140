import { useState } from "react";
import './FilterSearchField.css';


interface SearchFieldProps {
  tittel: string;
  submitFunction: any;
}

// input component of the filter component
// the search field will take in a value and base the filtering on the entered value.
const SearchField = (props: SearchFieldProps) => {
  const [ord, setOrd] = useState<string>("");

  const handleTyping = (event: any) => {
    setOrd(event.target.value);
  }

  const updateWord = (event: any) => {
    props.submitFunction(ord)  // sends the selected word to the main Filter component to handle that the filter value has been selected.
    setOrd("");
  }

  return (
    <div>
      <form onSubmit={e => { e.preventDefault(); }}>
        <label className="filterSearchInputLabel">{"Skriv inn " + props.tittel + " ..."}
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
        {"Legg til " + props.tittel}
      </button>
    </div>
  )
}

export default SearchField;
