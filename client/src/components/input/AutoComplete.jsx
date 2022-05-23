import axios from "axios";
import styled from "styled-components";
import { useState, useEffect, memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Dropdown, Options, FlexBox } from "../../styles";
import { OptionItem } from "./OptionItem";

const Container = styled(FlexBox)`
  position: relative;
  min-width: 350px;
`;

//src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
export const AutoComplete = memo(() => {
  const navigate = useNavigate();
  const [display, showDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const getPokemonOptions = async () => {
    const { data } = await axios.get("http://localhost:8080/pokemon");
    setOptions(data);
  };

  useEffect(() => {
    getPokemonOptions();
  }, []);

  const exitClickHandler = (event) => {
    const { current } = ref;
    if (current && !current.contains(event.target)) {
      showDisplay(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", exitClickHandler);

    return () => {
      document.removeEventListener("mousedown", exitClickHandler);
    };
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 2) {
      showDisplay(true);
    } else {
      showDisplay(false);
    }
  };

  return (
    <Container direction="column" ref={ref}>
      <Input
        id="search"
        onClick={handleInput}
        value={search}
        onChange={handleInput}
        placeholder="What Pokémon are you looking for?"
      />
      {display && (
        <Dropdown id="dropdown">
          {options
            .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
            .map(({ name, id }, i) => {
              return (
                <Options
                  to={`/pokemon/${name}`}
                  onClick={() => navigate(`/pokemon/${name}`)}
                  key={i}
                  tabIndex={0}
                >
                  <OptionItem index={i} name={name} id={id} />
                </Options>
              );
            })}
        </Dropdown>
      )}
    </Container>
  );
});
