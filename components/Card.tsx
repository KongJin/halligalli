import { deck } from "@/libs/const";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div``;
const CardImg = styled.img``;

export default function Card({ img }: { img: string }) {
  return <Container>{img ? <CardImg src={img}></CardImg> : null}</Container>;
}
