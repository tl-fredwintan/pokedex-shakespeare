import styled from "styled-components";
import { FlexBox, Text } from "../styles";
import { Pokemon } from "../components/card/Pokemon";
import { useParams, Link } from "react-router-dom";

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text.info};
  &:hover {
    color: #ea5d60;
    text-decoration: underline;
    cursor: pointer;
  }
`;
const PokemonOverview = () => {
  const { name } = useParams();
  return (
    <>
      <FlexBox margin="0 0 20px 0" justify="space-between">
        <Text id="nav" textTransform="capitalize">
          <NavLink to="/pokemon">Pokédex</NavLink> / {`${name}`}
        </Text>
      </FlexBox>
      <FlexBox margin="auto" justify="center" align="center">
        <Pokemon />
      </FlexBox>
    </>
  );
};
export default PokemonOverview;
