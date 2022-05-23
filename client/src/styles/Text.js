import styled from "styled-components";
import { devices } from "./devices";

const baseText = styled.h1`
  color: ${({ type, theme }) => theme.text[type]};
  margin: 0;
`;

export const Heading = styled(baseText)`
  font-size: 24px;
  line-height: 32px;
  text-transform: capitalize;
  margin: ${({ margin }) => margin};
`;

export const Text = styled(baseText)`
  font-size: 16px;
  line-height: 24px;
  margin: ${({ margin }) => margin};
  opacity: 0.7;
  font-weight: 500;
  text-transform: ${({ textTransform }) => textTransform};
`;

export const ResponsiveHeading = styled(Heading)`
  text-transform: uppercase;
  color: white;
  @media ${devices.xxxlarge} {
    margin-bottom: 8px;
    font-size: 38px;
    line-height: 46px;
  }
  @media ${devices.medium} {
    margin-bottom: 4px;
    font-size: 34px;
    line-height: 38px;
  }
  @media ${devices.small} {
    margin-bottom: 4px;
    font-size: 30px;
    line-height: 28px;
  }
`;

export const ResponsiveText = styled(Text)`
  color: #17171b;
  @media ${devices.xxxlarge} {
    margin-top: 32px;
    font-size: 30px;
    line-height: 38px;
  }
  @media ${devices.medium} {
    margin-top: 28px;
    font-size: 20px;
    line-height: 28px;
  }
  @media ${devices.small} {
    margin-top: 16px;
    font-size: 16px;
    line-height: 24px;
  }
`;
