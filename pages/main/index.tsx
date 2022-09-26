import type { NextPage } from "next";
import router from "next/router";

const MainPage: NextPage = () => {
  return (
    <>
      <>메인페이지</>
      <button onClick={() => router.push("/login")}></button>
    </>
  );
};

export default MainPage;
