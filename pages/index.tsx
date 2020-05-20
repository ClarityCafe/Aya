/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import ImageCard from "~/components/image-card";
import Navbar from "~/components/navbar";

const Home = () => (
  <>
    <Navbar />
    <main
      css={css`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
        padding: 1rem 80px;
      `}
    >
      <ImageCard
        src="https://images.unsplash.com/photo-1589833788675-62e5e2aa688f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=776&q=80"
        count={500}
        id="1234567890"
      />
      <ImageCard
        src="https://images.unsplash.com/photo-1589833788675-62e5e2aa688f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=776&q=80"
        count={500}
        id="1234567890"
      />
      <ImageCard
        src="https://images.unsplash.com/photo-1589833788675-62e5e2aa688f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=776&q=80"
        count={500}
        id="1234567890"
      />
      <ImageCard
        src="https://images.unsplash.com/photo-1589833788675-62e5e2aa688f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=776&q=80"
        count={500}
        id="1234567890"
      />
      <ImageCard
        src="https://images.unsplash.com/photo-1589833788675-62e5e2aa688f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=776&q=80"
        count={500}
        id="1234567890"
      />
    </main>
  </>
);

export default Home;
