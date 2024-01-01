import axios from "axios";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [recentSearch, setRecentSearch] = useState([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearch(JSON.parse(storedSearches));
    }
  }, []);

  const savedRecentSearch = async (searches) => {
    localStorage.setItem("recentSearches", JSON.stringify(searches));
  };

  const updateSearches = [
    search,
    ...recentSearch.filter((item) => item !== search),
  ];
  const limitedRecentSearches = updateSearches.slice(0, 5);
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/search?key=${search}`
      );
      console.log(response.data);
      const newSearchResult = response.data;

      setSearchResult(newSearchResult);
      setRecentSearch(limitedRecentSearches);
      savedRecentSearch(limitedRecentSearches);
      setError(null);
    } catch (error) {
      console.log("serching error", error);
      if (error.response) {
        setError(error.response.data);
        setRecentSearch(limitedRecentSearches);
        savedRecentSearch(limitedRecentSearches);
      }
      setSearchResult([]);
    }
  };
  return (
    <>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="검색어를 입력해주세요."
      />
      <button onClick={handleSearch}>검색</button>

      <div>
        {error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {searchResult.map((search, index) => (
              <li key={index}>{search}</li>
            ))}
          </ul>
        )}
      </div>
      <p>최근 검색어</p>
      <ul>
        {recentSearch.map((recent, index) => (
          <li key={index}>{recent}</li>
        ))}
      </ul>
    </>
  );
};
export default MainPage;
