/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as Icons from "@fluentui/react-icons";
import { FC } from "react";

// import * as Icons from "@fluentui/react-icons";

const IconsPage = () => (
  <div
    css={css`
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-gap: 3rem;
    `}
  >
    {Object.entries(Icons)
      .slice(1)
      .map(([name, Icon]: [string, FC]) => (
        <div
          key={name}
          css={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            word-break: break-all;
          `}
        >
          <Icon
            css={css`
              width: 100%;
            `}
          />
          {name}
        </div>
      ))}
  </div>
);

export default IconsPage;
