import Card from "@/components/Card";
import { NextPage } from "next";
import styled from "styled-components";

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 70px);
`;
const Board = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &.user1 {
    background-color: red;
    grid-column: 1;
  }
  &.user2 {
    background-color: orange;
    grid-column: 5;
  }
  &.user3 {
    background-color: yellow;
    grid-row: 5;
  }
  &.user4 {
    grid-row: 5;
    grid-column: 5;
    background-color: green;
  }
  &.card1 {
    grid-column: 2;
    transform: rotate(135deg);
    height: 100px;
    top: -15px;
  }
  &.card2 {
    grid-column: 4;
    transform: rotate(-135deg);
    height: 100px;
    top: -15px;
  }
  &.card3 {
    grid-row: 4;
    grid-column: 2;
    transform: rotate(45deg);
    height: 100px;
    top: -15px;
  }
  &.card4 {
    grid-row: 4;
    grid-column: 4;
    transform: rotate(-45deg);
    height: 100px;
    top: -15px;
  }
  &.center {
    background-color: silver;
    grid-row: 3;
    grid-column: 3;
  }
`;

const GamePage: NextPage = () => {
  return (
    <Container>
      <Board className="user1"></Board>
      <Board className="user2"></Board>
      <Board className="card1">
        <Card />
      </Board>
      <Board className="card2">
        <Card />
      </Board>
      <Board className="center"></Board>
      <Board className="card3">
        <Card />
      </Board>
      <Board className="card4">
        <Card />
      </Board>
      <Board className="user3"></Board>
      <Board className="user4"></Board>
    </Container>
  );
};

export default GamePage;
