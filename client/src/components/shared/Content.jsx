import { ContentContainer } from "../../styles";
import { Outlet } from "react-router-dom";
export const Content = ({ children }) => {
  return (
    <ContentContainer>
      {children}
      <Outlet />
    </ContentContainer>
  );
};
