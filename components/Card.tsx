import { deck } from "@/libs/const";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div``;
const CardImg = styled.img``;

export default function Card({ obj }: { obj: { img: string; type: string; cnt: number } }) {
  return <Container>{obj ? <CardImg src={obj.img}></CardImg> : null}</Container>;
}
