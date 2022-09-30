import Card from "@/components/Card";
import { deck as initDeck } from "@/libs/const";
import { NextPage } from "next";
import { useEffect, useState } from "react";
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
    width: 80px;
    top: -15px;
  }
  &.card2 {
    grid-column: 4;
    transform: rotate(-135deg);
    height: 100px;
    width: 80px;
    top: -15px;
  }
  &.card3 {
    grid-row: 4;
    grid-column: 2;
    transform: rotate(45deg);
    height: 100px;
    width: 80px;
    top: -15px;
  }
  &.card4 {
    grid-row: 4;
    grid-column: 4;
    transform: rotate(-45deg);
    height: 100px;
    width: 80px;
    top: -15px;
  }
  &.center {
    background-color: silver;
    grid-row: 3;
    grid-column: 3;
  }
`;
const GamePage: NextPage = () => {
  const [assets, setAssets] = useState<string[][]>([[], [], [], []]);
  const [invest, setInvest] = useState<string[][]>([[], [], [], []]);

  useEffect(() => {
    distribute();
  }, []);
  function distribute() {
    let assets: string[][] = [[], [], [], []];
    if (initDeck.length > 0) {
      for (let i = 0; i < 14; i++) {
        for (let j = 0; j < 4; j++) {
          let random = Math.floor(Math.random() * initDeck.length);
          assets[j].push(initDeck[random]);
          initDeck.splice(random, 1);
        }
      }
      setAssets(assets);
    }
  }

  const play = (user: number) => {
    let newInvest = JSON.parse(JSON.stringify(invest));
    newInvest[user].push(assets[user][assets[user].length - 1]);
    console.log({ assets, invest });
    setAssets((prev) => {
      let a = JSON.parse(JSON.stringify(prev));
      console.log({ a });
      a[user].pop();
      console.log({ a });
      return a;
    });
    setInvest(newInvest);
    console.log({ assets, invest });
  };
  return (
    <Container>
      <Board className="user1"></Board>
      <Board className="user2"></Board>
      <Board className="card1" onClick={() => play(0)}>
        <Card img={invest[0][invest[0].length - 1]} />
      </Board>
      <Board className="card2" onClick={() => play(1)}>
        <Card img={invest[1][invest[1].length - 1]} />
      </Board>
      <Board className="center"></Board>
      <Board className="card3" onClick={() => play(2)}>
        <Card img={invest[2][invest[2].length - 1]} />
      </Board>
      <Board className="card4" onClick={() => play(3)}>
        <Card img={invest[3][invest[3].length - 1]} />
      </Board>
      <Board className="user3"></Board>
      <Board className="user4"></Board>
    </Container>
  );
};

export default GamePage;
