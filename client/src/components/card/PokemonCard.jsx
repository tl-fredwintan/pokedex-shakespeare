import styled from "styled-components";
import { Link } from "react-router-dom";
import { CardPreview, CardContent, Text, Heading } from "../../styles";

const Spacer = styled.div`
  margin: 10px 0 0 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;

export const PokemonCard = ({ data }) => {
  const { id, name, type, image } = data;
  const pokemonType = type[0].type.name;

  const tags = type?.map(({ type }, index) => {
    const { name } = type;
    return (
      <img
        key={index}
        style={{ marginRight: "3px" }}
        alt={name}
        src={`https://fredwin.s3.eu-west-2.amazonaws.com/${name}.svg`}
      />
    );
  });

  return (
    <NavLink to={`/pokemon/${name}`}>
      <CardPreview id="pokemon-card" type={pokemonType}>
        <CardContent direction="column" position="left">
          <Text type="info" margin="10px 0 0 20px">
            #{id}
          </Text>
          <Heading type="heading" margin="0 0 0 20px">
            {name}
          </Heading>
          <Spacer>{tags}</Spacer>
        </CardContent>
        <CardContent justify="center" align="center">
          <img src={image} alt={`${name}`} height="110px" width="110px" />
        </CardContent>
      </CardPreview>
    </NavLink>
  );
};
