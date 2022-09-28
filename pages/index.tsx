import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import {
  useSession,
  signIn,
  getProviders,
  getSession,
  GetSessionParams,
  signOut,
} from "next-auth/react";

import router from "next/router";

const Home: NextPage = () => {
  return (
    <>
      <>
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/main",
            })
          }
        >
          구글 로그인
        </button>
      </>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to HalliGalli</h1>
      </main>
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

export default Home;
