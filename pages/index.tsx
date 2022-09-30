import type { NextPage } from "next";

import {
  useSession,
  signIn,
  getProviders,
  getSession,
  GetSessionParams,
  signOut,
} from "next-auth/react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  font-size: 1.3rem;
  display: flex;
  align-items: center;
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Button
        onClick={() =>
          signIn("google", {
            callbackUrl: "/main",
          })
        }
      >
        <FcGoogle />
        구글 로그인
      </Button>
    </Container>
  );
};

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}

export default Home;
