import styled from "styled-components";

const Header = () => {
  return (
    <Styled.Wrapper>
      <h1>Search</h1>
    </Styled.Wrapper>
  );
};
export default Header;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Styled = { Wrapper };
