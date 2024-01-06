import { useState } from "react";
import styled from "styled-components";

const RecentSearch = ({ recentSearch }) => {
  return (
    <Styled.RecentSearchContainer>
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
    </Styled.RecentSearchContainer>
  );
};
export default RecentSearch;

const RecentSearchContainer = styled.div`
  width: 300px;
  border: 1px solid #365486;
  border-radius: 10px;
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
