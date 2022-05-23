import styled from "styled-components";
import { Link } from "react-router-dom";
import { devices } from "./devices";

export const Input = styled.input`
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #e2e2e2;
  margin: 10px;
  font-size: 14px;
  &:focus {
    border: 1px solid #ea5d60;
    outline: 0;
  }
  &:hover {
    border: 1px solid #ea5d60;
  }
  @media ${devices.small} {
    width: 300px;
  }
`;

export const Dropdown = styled.div`
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  position: absolute;
  background-color: white;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  left: 10px;
  top: 60px;
  padding: 10px;
  z-index: 1;
  width: 310px;
  max-height: 310px;
  overflow-y: auto;
`;

export const Options = styled(Link)`
  display: flex;
  opacity: 0.8;
  padding: 10px 0;
  color: ${({ theme }) => theme.text.info};
  text-transform: capitalize;
  text-decoration: none;
  &:hover {
    opacity: 1;
    color: #ea5d60;
    cursor: pointer;
  }
  width: 310px;
`;
