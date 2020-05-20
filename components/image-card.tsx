/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { CaretSolidUpIcon, ShareIcon } from "@fluentui/react-icons";
import Link from "next/link";
import { FC } from "react";

import { EmptyButton } from "./common";

interface ImageCardProps {
  src: string;
  count: number;
  id: string;
}

const ImageCard: FC<ImageCardProps> = ({ src, count, id }) => (
  <article
    css={css`
      position: relative;
      display: flex;
      width: 100%;
      height: 350px;
      border-radius: 2px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      transition: box-shadow 0.2s ease-out;
      overflow: hidden;

      &:hover {
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);

        & footer {
          transform: translateY(0);
          opacity: 1;
          transition: transform 0.1s var(--decelerate),
            opacity 0.1s var(--decelerate);
        }
      }
    `}
  >
    <Link href="/post/[id]" as={`/post/${id}`} passHref>
      <a
        css={css`
          display: flex;
        `}
      >
        <img
          css={css`
            /* cursor: pointer; */
            width: 100%;
            /* height: 100%; */
            object-fit: cover;
            object-position: center;
          `}
          src={src}
        />
      </a>
    </Link>
    <footer
      css={css`
        position: absolute;
        display: flex;
        align-items: center;
        bottom: 0;
        left: 0;
        right: 0;
        background: #1c1b1b;
        color: #fff;
        height: 48px;
        padding: 0 1rem;
        transform: translateY(100%);
        opacity: 0;
        transition: transform 0.1s var(--accelerate),
          opacity 0.1s var(--accelerate);

        & svg {
          width: 1rem;
        }
      `}
    >
      <CaretSolidUpIcon
        css={css`
          margin-right: 1rem;
          color: #ff784e;

          & > svg {
            width: 0.75rem;
          }
        `}
      />
      {count}
      <div
        css={css`
          flex: 1;
        `}
      />
      <EmptyButton>
        <ShareIcon />
      </EmptyButton>
    </footer>
  </article>
);

export default ImageCard;
