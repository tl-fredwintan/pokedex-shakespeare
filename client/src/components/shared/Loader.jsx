import { FlexBox } from "../../styles";

export const Loader = () => {
  return (
    <FlexBox
      id="loader"
      height="calc(100vh - 120px)"
      margin="auto"
      justify="center"
      align="center"
    >
      <img
        width="200px"
        height="140px"
        src="https://fredwin.s3.eu-west-2.amazonaws.com/loader.gif"
      />
    </FlexBox>
  );
};
