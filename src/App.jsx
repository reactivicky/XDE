import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import BookList from "./components/BookList";
import { Circles } from "react-loader-spinner";

function App() {
  const [searchVal, setSearchVal] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState("");

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const initiateSearch = async () => {
    if (searchVal !== "") {
      try {
        setIsLoading(true);
        const responseJson = await fetch(
          `http://openlibrary.org/search.json?q=${searchVal}`
        );
        const response = await responseJson.json();
        setSearchData(response.docs);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setErrorData("Oops! Something went wrong. Please try again");
      }
    }
  };

  const searchBook = debounce(() => initiateSearch());

  useEffect(() => {
    if (errorData !== "") {
      alert(errorData);
    }
  }, [errorData]);

  return (
    <div className="container">
      <h1>Book Search App</h1>
      <Search
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        initiateSearch={searchBook}
      />
      {isLoading ? (
        <div className="loader">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <BookList searchData={searchData} />
      )}
    </div>
  );
}

export default App;
