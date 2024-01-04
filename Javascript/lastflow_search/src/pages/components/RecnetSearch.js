import styled from "styled-components";

const RecentSearch = ({ showRecentSearches, recentSearch }) => {
  return (
    <Styled.RecentSearchContainer
      $show={showRecentSearches}
      className="recentSearchContainer"
    >
      {showRecentSearches && (
        <div>
          <h5>최근 검색어</h5>
          <ul>
            {recentSearch.map((recent, index) => (
              <Styled.RecentSearchList key={index}>
                {recent}
              </Styled.RecentSearchList>
            ))}
          </ul>
        </div>
      )}
    </Styled.RecentSearchContainer>
  );
};
export default RecentSearch;

const RecentSearchContainer = styled.div`
  width: 300px;
  border: 1px solid #365486;
  border-radius: 10px;
  display: ${({ $show }) =>
    $show
      ? "inline-block"
      : "none"}; // css가 아닌 방법으로, true/false 에 따른 컴포넌트를 뿌려주자.
  position: absolute;
  background-color: white;
  z-index: 1;
`;

const RecentSearchList = styled.li`
  list-style: none;
  padding: 10px;
  margin: 0;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Styled = {
  RecentSearchContainer,
  RecentSearchList,
};
