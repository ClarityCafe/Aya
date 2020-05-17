/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import {
  Photo2Icon,
  UploadIcon,
  PermissionsIcon,
  SearchIcon,
} from "@fluentui/react-icons";
import { FC } from "react";

import Logo from "~/assets/svg/logo.svg";

const NavbarButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  font-family: inherit;
  font-size: 14px;
  color: inherit;
  padding: 0 1rem;
  height: 36px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;

  & svg {
    width: 16px;
  }

  & > span {
    display: flex;
    margin-right: 0.5rem;
  }
`;

const Navbar: FC = () => (
  <nav
    css={css`
      display: flex;
      align-items: center;
      height: 96px;
      /* background: #000; */
      padding: 0 48px;
    `}
  >
    <Logo
      css={css`
        margin-right: 2rem;
      `}
    />
    <NavbarButton>
      <Photo2Icon />
      Collections
    </NavbarButton>
    <NavbarButton>
      <UploadIcon />
      Upload
    </NavbarButton>

    <div
      css={css`
        flex: 1;
      `}
    />

    <fieldset
      css={css`
        padding: 0.25rem 0.5rem;
        margin: 0;
        margin-right: 1rem;
        border: none;
        background: #e9e9e9;
        display: flex;
        align-items: center;
        border-radius: 2px;
        max-width: 350px;
        width: 100%;

        & svg {
          width: 16px;
        }

        & label {
          display: block;
          margin-right: 0.5rem;
        }

        & input {
          border: none;
          outline: none;
          padding: 0;
          margin: 0;
          background: transparent;
          font-size: 1rem;
          font-family: inherit;
          appearance: none;
          width: 100%;
        }
      `}
    >
      <label htmlFor="search">
        <SearchIcon />
      </label>
      <input id="search" placeholder="Search by keyword/url" type="text" />
    </fieldset>

    <NavbarButton>
      <PermissionsIcon />
      Login
    </NavbarButton>
  </nav>
);

export default Navbar;
