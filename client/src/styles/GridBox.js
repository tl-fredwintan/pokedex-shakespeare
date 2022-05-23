import styled from "styled-components";

export const GridBox = styled.div`
  margin: 0 auto;
  max-width: 1360px;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;
