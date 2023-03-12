import "./styles.css";
import Select from "react-select";

const Search = ({ searchVal, setSearchVal, initiateSearch }) => {

  const options = [
    { value: "author", label: "Author" },
    { value: "keywords", label: "Similar Keywords" },
    { value: "subject_matter", label: "Subject Matter" },
    { value: "ratings", label: "Similar Ratings" },
  ];

  return (
    <div className="search-container">
      <div>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button className="search-btn" onClick={initiateSearch}>
          Search
        </button>
        <button className="search-btn" onClick={() => setSearchVal("")}>
          Clear Search
        </button>
      </div>
      <Select
        isMulti
        name="colors"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Advanced Search"
      />
    </div>
  );
};

export default Search;
