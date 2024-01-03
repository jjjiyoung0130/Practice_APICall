import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

const MainPage = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const [recentSearch, setRecentSearch] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  const wrapperRef = useRef(null);

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

  const handleInputClick = () => {
    setShowRecentSearches(true);
    console.log(showRecentSearches);
  };

  /* const handleOutsideClick = (e) => {
    // 현재 요소를 포함한 가장 가까운 조상 요소 중 클래스가 "recentSearchContainer"인 요소를 찾고 없으면 false
    if (e.target.closest(".recentSearchContainer") === null) {
      setShowRecentSearches(false);
    }
  }; */
  /* const handleOutsideClick = (e) => {
    if (e.target.closest(".recentSearchContainer") === null) {
      setShowRecentSearches((prev) => {
        // 현재 상태 값에 따라 업데이트
        return prev ? false : prev;
      });
    }
  }; */
  const handleOutsideClick = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setShowRecentSearches((prev) => !prev);
      console.log(showRecentSearches);
    }
  };

  useEffect(() => {
    if (showRecentSearches) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showRecentSearches]);

  return (
    <Styled.Wrapper>
      <div>
        <Styled.SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={handleInputClick}
          placeholder="검색어를 입력해주세요."
        />
        <Styled.SerachButton onClick={handleSearch}>검색</Styled.SerachButton>
      </div>

      <Styled.RecentSearchContainer
        $show={showRecentSearches}
        className="recentSearchContainer"
      >
        {showRecentSearches && (
          <div>
            <h5>최근 검색어</h5>
            <ul>
              {recentSearch.map((recent, index) => (
                <Styled.RecentSearch key={index}>{recent}</Styled.RecentSearch>
              ))}
            </ul>
          </div>
        )}
      </Styled.RecentSearchContainer>

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

const RecentSearchContainer = styled.div`
  width: 300px;
  border: 1px solid #365486;
  border-radius: 10px;
  display: ${(props) => (props.$show ? "inline-block" : "none")};
  position: absolute;
  background-color: white;
  z-index: 1;
`;

const RecentSearch = styled.li`
  list-style: none;
  padding: 10px;
  margin: 0;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Styled = {
  Wrapper,
  SearchInput,
  SerachButton,
  ResultContents,
  SearchResult,
  RecentSearchContainer,
  RecentSearch,
};
