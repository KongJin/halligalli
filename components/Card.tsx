import { deck } from "@/libs/const";
import styled from "styled-components";

const Container = styled.div``;
const CardImg = styled.img`
  width: 90%;
`;

export default function Card({ index }: { index: number }) {
  console.log(deck.length);
  return (
    <Container>
      <CardImg src={deck[index]}></CardImg>
    </Container>
  );
}
