import { css } from "@emotion/core";
import styled from "@emotion/styled";

const buttonReset = css`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  appearance: none;
`;

export const EmptyButton = styled.button`
  ${buttonReset}
`;

export const Button = styled.button`
  ${buttonReset}

  background: var(--primary);
  color: #fff;
  height: 48px;
  padding: 0 2rem;
  border-radius: 2px;
  transition: box-shadow 0.2s ease-out;

  &:hover {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.58);
  }
`;
