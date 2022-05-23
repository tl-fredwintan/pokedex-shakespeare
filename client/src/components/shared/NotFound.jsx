import { FlexBox, Heading, Text } from "../../styles";

export const NotFound = ({ message }) => {
  return (
    <FlexBox
      id="not-found"
      height="calc(100vh - 280px)"
      margin="auto"
      justify="center"
      align="center"
      direction="column"
    >
      <FlexBox>
        <img
          width="200px"
          height="140px"
          src="https://fredwin.s3.eu-west-2.amazonaws.com/404.svg"
        />
      </FlexBox>
      <Heading>Uh-Oh!</Heading>
      <Text>{message}</Text>
    </FlexBox>
  );
};
