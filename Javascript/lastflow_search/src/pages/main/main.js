import axios from "axios";
import { useState } from "react";

const MainPage = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/search?key=${search}`
      );

      console.log(response.data);
      setSearchResult(response.data);
      setError(null);
    } catch (error) {
      console.log("serching error", error);
      if (error.response) {
        setError(error.response.data);
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
        <div></div>
      </div>
    </>
  );
};
export default MainPage;
