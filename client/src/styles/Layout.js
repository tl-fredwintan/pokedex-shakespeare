import styled from "styled-components";

export const HeaderContainer = styled.header`
  min-width: 100%;
  height: 64px;
  background-image: linear-gradient(
    to bottom,
    #fb1b1b,
    #f7261c,
    #f22f1d,
    #ee351f,
    #ea3b20,
    #e63b1f,
    #e33b1f,
    #df3b1e,
    #db351b,
    #d72f18,
    #d22914,
    #ce2211
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #222224;
  box-shadow: 0 2px 4px 0 rgba(34, 34, 36, 0.2);
`;

export const ContentContainer = styled.div`
  padding: 12px;
`;

export const Layout = styled.div`
  width: 100%;
  height: 100%;
`;
