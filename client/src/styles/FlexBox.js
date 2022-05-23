import styled from "styled-components";

export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export const ResponsiveFlex = styled(FlexBox)`
  @media (max-width: 768px) {
    height: 50%;
    width: 100%;
  }
`;
