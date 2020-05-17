/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import Navbar from "~/components/navbar";

const Home = () => (
  <>
    <Navbar />
    <main
      css={css`
        padding: 1rem 80px;
      `}
    >
      dig dig a hole
    </main>
  </>
);

export default Home;
