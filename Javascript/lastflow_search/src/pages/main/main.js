import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import RecentSearch from "../components/RecnetSearch";

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
    <Styled.Wrapper>
      <div>
        <Styled.SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // onClick={handleInputClick}
          placeholder="검색어를 입력해주세요."
        />
        <Styled.SerachButton onClick={handleSearch}>검색</Styled.SerachButton>
      </div>
      <div>
        {error ? (
          <p>{error}</p>
        ) : (
          <Styled.ResultContents>
            <h4>검색결과</h4>
            {searchResult.map((search, index) => (
              <Styled.SearchResult key={index}>{search}</Styled.SearchResult>
            ))}
          </Styled.ResultContents>
        )}
      </div>
      {/* 임시로 되살림 */}
      <p>최근 검색어</p>
      <ul>
        {recentSearch.map((recent, index) => (
          <li key={index}>{recent}</li>
        ))}
      </ul>
    </Styled.Wrapper>
  );
};
export default MainPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 330px;
  padding: 10px;
  border: 2px solid #365486;
  border-radius: 10px;
`;

const SerachButton = styled.button`
  padding: 10px;
  margin-left: 10px;
  background-color: #86b6f6;
  border: 1px solid #86b6f6;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const ResultContents = styled.ul`
  width: 400px;
  border: 1px solid #365486;
  border-radius: 20px;
  padding: 10px;
`;

const SearchResult = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
  color: ${(props) =>
    props.search && props.children.includes(props.search)
      ? "#ffff99"
      : "black"};
`;

const Styled = {
  Wrapper,
  SearchInput,
  SerachButton,
  ResultContents,
  SearchResult,
};
