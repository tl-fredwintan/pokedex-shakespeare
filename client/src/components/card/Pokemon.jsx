import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  ResponsiveCard,
  Text,
  FlexBox,
  ResponsiveFlex,
  devices,
  theme,
  ResponsiveHeading,
  ResponsiveText,
} from "../../styles";
import { Loader } from "../shared/Loader";
import { NotFound } from "../shared/NotFound";

const Image = styled.img`
  @media ${devices.xxxlarge} {
    width: 380px;
    height: 380px;
  }
  @media ${devices.large} {
    width: 340px;
    height: 340px;
  }
  @media ${devices.medium} {
    width: 240px;
    height: 240px;
  }
`;

const WarningText = styled(Text)`
  margin-top: 12px;
  color: red;
  font-size: 14px;
`;

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [type, setType] = useState(null);
  const [error, setError] = useState(null);
  const [loading, isLoading] = useState(false);
  const { name } = useParams();

  const tags = pokemon?.type?.map(({ type }, index) => {
    const { name } = type;
    return (
      <img
        key={index}
        style={{ marginRight: "12px" }}
        alt={name}
        src={`https://fredwin.s3.eu-west-2.amazonaws.com/${name}.svg`}
      />
    );
  });

  const getPokemonTranslation = useCallback(async () => {
    isLoading(true);
    await axios
      .get(`http://localhost:8080/pokemon/${name}`)
      .then((response) => {
        if ("code" in response.data) {
          setError(response.data);
        } else {
          setType(response.data.type[0].type.name);
          setPokemon(response.data);
        }
      })
      .catch((e) =>
        setError({ code: e?.status, message: e?.response.data.message })
      )
      .finally(() => isLoading(false));
  });

  useEffect(() => {
    getPokemonTranslation();
  }, []);

  return (
    <>
      {loading && !error && !pokemon && <Loader />}
      {error && <NotFound message={error?.message} code={error?.code} />}
      {pokemon && (
        <motion.div
          animate={{
            boxShadow: `${theme.colours[type].shadow} 10px 50px`,
            borderRadius: 10,
            translateX: -3,
            translateY: -20,
          }}
          transition={{
            delay: 1.3,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              translateY: 40,
            }}
            exit={{ scale: 0 }}
            transition={{
              duration: 0.5,
            }}
          >
            <ResponsiveCard
              id="pokemon-overview"
              type={type}
              backgroundSize={420}
            >
              <ResponsiveFlex
                width="50%"
                justify="center"
                align="center"
                direction="column"
              >
                <FlexBox direction="column" margin="30px">
                  <motion.div
                    initial={{ opacity: 0, translateX: -200 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateX: -200 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4,
                    }}
                  >
                    <ResponsiveHeading id="title">
                      {pokemon?.name}
                    </ResponsiveHeading>
                    <FlexBox>{tags}</FlexBox>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -20 }}
                    transition={{
                      duration: 0.5,
                      delay: 1,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    {!pokemon?.translated && (
                      <WarningText>
                        Looks like Shakespeare is too busy to translate. Please
                        try again later.
                      </WarningText>
                    )}
                    <ResponsiveText id="description">
                      "{pokemon?.description}"
                    </ResponsiveText>
                  </motion.div>
                </FlexBox>
              </ResponsiveFlex>
              <ResponsiveFlex
                width="50%"
                justify="center"
                align="center"
                direction="row"
              >
                <motion.div
                  initial={{ opacity: 0, translateX: 200 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ opacity: 0, translateX: 200 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5,
                  }}
                >
                  <Image src={pokemon?.image} alt={`${pokemon?.name}`} />
                </motion.div>
              </ResponsiveFlex>
            </ResponsiveCard>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
