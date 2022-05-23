import styled from "styled-components";

//Base styling
export const Card = styled.div`
  border-radius: 10px;
  background-image: url("https://fredwin.s3.eu-west-2.amazonaws.com/pokeball-background.svg");
  background-repeat: no-repeat;
  background-position: top right;
  box-shadow: ${({ type, theme }) =>
    `0px 5px 10px ${theme.colours[type].shadow}`};
  background-color: ${({ type, theme }) => theme.colours[type].background};
  display: flex;
  flex-direction: row;
  transition: 0.3s;
  background-size: ${({ backgroundSize }) => `${backgroundSize}px`};
`;

export const CardPreview = styled(Card)`
  margin: auto;
  max-width: 320px;
  height: 115px;
  &:hover {
    box-shadow: ${({ type, theme }) =>
      `${theme.colours[type].shadow} 5px 5px;`};
    transform: translate(-3px, -10px);
  }
`;

export const CardContent = styled.div`
  width: 50%;
  min-height: 50%;
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  margin-bottom: 10px;
  margin-top: 5px;
  background-image: ${({ position }) =>
    position === "left" &&
    `url('https://fredwin.s3.eu-west-2.amazonaws.com/pattern.svg')`};
  background-repeat: ${({ position }) => position === "left" && "no-repeat"};
  background-position: ${({ position }) => position === "left" && "top right"};
`;

export const ResponsiveCard = styled(Card)`
  max-width: 1200px;
  margin: auto;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    background-position: top center;
  }
`;
