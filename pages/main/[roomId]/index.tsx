import Card from "@/components/Card";
import { socket } from "@/libs/function";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
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
    height: 80px;
    width: 60px;
    top: -15px;
  }
  &.card2 {
    grid-column: 4;
    transform: rotate(-135deg);
    height: 80px;
    width: 60px;
    top: -15px;
  }
  &.card3 {
    grid-row: 4;
    grid-column: 2;
    transform: rotate(45deg);
    height: 80px;
    width: 60px;
    top: -15px;
  }
  &.card4 {
    grid-row: 4;
    grid-column: 4;
    transform: rotate(-45deg);
    height: 80px;
    width: 60px;
    top: -15px;
  }
  &.center {
    background-color: silver;
    grid-row: 3;
    grid-column: 3;
  }
`;

const GamePage: NextPage = () => {
  const Router = useRouter();
  const users = useRef<string[]>([]);
  const me = useRef<string>("");
  const roomId = Router.query.roomId;
  const assets = useRef<{ img: string; type: string; cnt: number }[][]>([[], [], [], []]);
  const invest = useRef<{ img: string; type: string; cnt: number }[][]>([[], [], [], []]);
  const startCNT = useRef(7);
  const turn = useRef(99);
  const [st, setSt] = useState(99);
  let sI: NodeJS.Timer;
  let tI: NodeJS.Timer;
  console.log({ users: users.current, turn: turn.current, me: me.current, roomId: roomId });

  useEffect(() => {}, [st]);

  useEffect(() => {
    socket.emit("enter_room", roomId, (socketId: string) => {
      if (socketId !== me.current) {
        me.current = socketId;
      }
    });
    socket.on("update_users", (people: string[]) => {
      console.log({ people });
      users.current = people;
    });
    socket.on("count", (people: string[]) => {
      users.current = people;
      startCNT.current = 7;
      clearInterval(sI);
      if (users.current.length > 1) {
        sI = setInterval(() => {
          startCNT.current -= 1;
          console.log(startCNT);
          if (startCNT.current < 1) {
            clearInterval(sI);
            if (users.current[0] === me.current) {
              socket.emit("start_room", roomId);
            }
          }
        }, 1000);
      }
    });
    socket.on("distribute", (set: any) => {
      console.log("distribute");
      assets.current = set;
      turn.current = -1;

      setSt(turn.current);
    });
    socket.on("turn", () => {
      clearInterval(tI);
      play();
      tI = setInterval(() => {
        play();
      }, 2000);
    });
    socket.on("bellResult", (socketId, result) => {
      if (result === "bringMe") {
        let bringCard = [];
        for (let i in invest.current) {
          if (invest.current[i]) {
            bringCard.push(...invest.current[i]);
            invest.current[i] = [];
          }
        }
        assets.current[users.current.indexOf(socketId)].unshift(...bringCard);
      } else if (result === "giveUs") {
        for (let i in users.current) {
          if (users.current[i] !== "") {
            let pay = assets.current[users.current.indexOf(socketId)].pop();

            pay && assets.current[i].push(pay);
          }
        }
      }
      setSt(99);
    });

    return () => {
      clearInterval(sI);
      clearInterval(tI);
      socket.off("update_users");
      socket.off("count");
      socket.off("distribute");
      socket.off("turn");
      socket.off("bellResult");
      socket.emit("out_room", roomId);
    };
  }, []);

  const play = () => {
    let i = turn.current + 1;
    while (users.current[i % users.current.length] === "") {
      i++;
    }
    turn.current = i % users.current.length;
    let pay = assets.current[turn.current].pop();
    if (!pay) {
      users.current[turn.current] = "";
    }
    let liver = users.current.filter((el) => el !== "");
    if (liver.length === 1) {
      console.log("user" + liver[0] + "가 승리했습니다.");

      invest.current = [[], [], [], []];
      if (liver[0] === me.current) {
        socket.emit("end_room", roomId);
      }
      clearInterval(sI);
      clearInterval(tI);
      setSt(turn.current);
      return;
    }
    pay && invest.current[turn.current].push(pay);
    setSt(turn.current);
    console.log("@@");
  };

  return (
    <Container>
      <Board className="user1"></Board>
      <Board className="user2"></Board>
      <Board className="card1">
        {assets.current[0].length}
        <Card obj={invest.current[0][invest.current[0].length - 1]} />
      </Board>
      <Board className="card2">
        {assets.current[1].length}
        <Card obj={invest.current[1][invest.current[1].length - 1]} />
      </Board>
      <Board className="center">
        <button
          onClick={() => {
            let card: { [type: string]: number } = {};
            for (let i = 0; i < invest.current.length; i++) {
              let top = invest.current[i][invest.current[i].length - 1];
              if (top) {
                card[top.type] = (card[top.type] + top.cnt) | top.cnt;
              }
            }
            for (let i in card) {
              console.log(card[i]);
              if (card[i] === 5) {
                return socket.emit("bell", roomId, "bringMe");
              }
            }
            return socket.emit("bell", roomId, "giveUs");
          }}
        >
          종 울리기
        </button>
      </Board>
      <Board className="card3">
        <Card obj={invest.current[2][invest.current[2].length - 1]} />
        {assets.current[2].length}
      </Board>
      <Board className="card4">
        <Card obj={invest.current[3][invest.current[3].length - 1]} />
        {assets.current[3].length}
      </Board>
      <Board className="user3"></Board>
      <Board className="user4"></Board>
      {
        <button
          onClick={() => {
            let i = turn.current + 1;
            while (users.current[i % users.current.length] === "") {
              i++;
            }
            if (users.current[i % users.current.length] === me.current) {
              socket.emit("turnRe", roomId);
            }
          }}
        >
          카드 내기
        </button>
      }
    </Container>
  );
};

export default GamePage;

export async function getServerSideProps({ query: { roomId } }: { query: { roomId: string } }) {
  return {
    props: {
      roomId,
    },
  };
}
