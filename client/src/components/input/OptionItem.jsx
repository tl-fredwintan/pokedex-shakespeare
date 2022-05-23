import { motion } from "framer-motion";
import { FlexBox } from "../../styles";

export const OptionItem = ({ id, name, index }) => {
  return (
    <>
      <motion.div
        key={`options-${id}`}
        initial={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -20 }}
        transition={{
          duration: 0.3,
          delay: index * 0.1,
        }}
      >
        <FlexBox width="300px" directin="row" justify="space-between">
          <FlexBox>
            <span>{name}</span>
          </FlexBox>
          <FlexBox>
            <img
              width="32px"
              height="32px"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={name}
            />
          </FlexBox>
        </FlexBox>
      </motion.div>
    </>
  );
};
