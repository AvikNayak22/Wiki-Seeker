import "./index.css";
import { useState } from "react";

function App() {
  // Initialize state variables for the search query, results, and search info
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  // Function to handle a search submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (search === "") return; // Don't do anything if the search query is empty

    // Construct the Wikipedia API endpoint with the search query
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    // Make the API request and handle any errors
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }

    // Parse the response as JSON and update the state variables with the results and search info
    const json = await response.json();
    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  };

  return (
    <div className="App">
      <header>
        <h1>Wiki Seeker</h1>
        {/* Search box form */}
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="what are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {/* Display search result count if available */}
        {searchInfo.totalhits ? (
          <p>Search Results: {searchInfo.totalhits}</p>
        ) : (
          ""
        )}
      </header>
      {/* Display search results */}
      <div className="results">
        {results.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          return (
            <div className="result" key={i}>
              <h3>{result.title}</h3>
              {/* Use dangerouslySetInnerHTML to render the snippet as HTML */}
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target="_blank" rel="noreferrer">
                Read more
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

    
