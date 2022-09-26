import { NextPage } from "next";
import {
  useSession,
  signIn,
  getProviders,
  getSession,
  GetSessionParams,
  signOut,
} from "next-auth/react";

const LoginPage: NextPage = () => {
  return (
    <>
      <button onClick={() => signIn("google")}>구글 로그인</button>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
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

export default LoginPage;
