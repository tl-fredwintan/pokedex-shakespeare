import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { PokemonCard } from "../components/card/PokemonCard";
import { AutoComplete } from "../components/input/AutoComplete";
import { GridBox, Text, Heading, FlexBox } from "../styles";

const PokemonList = () => {
  const [collection, setCollection] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const getPokemonCollection = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const { data } = await axios.post("http://localhost:8080/pokemon", {
      offset,
    });
    setCollection((collection) => [...new Set([...collection, ...data])]);
    setOffset((offset) => offset + 20);
    setLoading(false);
  }, [offset, loading]);

  useEffect(() => {
    getPokemonCollection();
  }, []);

  useEffect(() => {
    if (offset <= 140 && !loading) {
      const handleScrolling = (e) => {
        if (
          window.innerHeight + e.target.documentElement.scrollTop + 1 >=
          e.target.documentElement.scrollHeight
        ) {
          getPokemonCollection();
        }
      };

      window.addEventListener(`scroll`, handleScrolling);
      return () => window.removeEventListener("scroll", handleScrolling);
    }
  }, [getPokemonCollection]);

  return (
    <>
      <FlexBox
        id="search-container"
        direction="column"
        justify="center"
        align="center"
      >
        <FlexBox margin="10px">
          <Text type="info">
            Pokémon meets Shakespeare.Search for <b> Generation 1 </b> Pokémon
            by name or using the Pokédex number.
          </Text>
        </FlexBox>
        <FlexBox>
          <AutoComplete />
        </FlexBox>
      </FlexBox>
      <FlexBox justify="space-between" align="center" margin="10px">
        <Heading type="info"> Pokédex </Heading>
        <Text type="info">
          {collection?.length}
          /151
        </Text>
      </FlexBox>
      <GridBox id="collection">
        {collection?.map((pokemonData, i) => {
          return (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                translateY: -40,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.03,
                type: "spring",
                stiffness: 100,
              }}
            >
              <PokemonCard data={pokemonData} />
            </motion.div>
          );
        })}
      </GridBox>
    </>
  );
};

export default PokemonList;
