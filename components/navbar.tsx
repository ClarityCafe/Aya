/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Photo2Icon, UploadIcon } from "@fluentui/react-icons";
import { FC } from "react";

import Logo from "~/assets/svg/Logo.svg";

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
    <Logo />
    <NavbarButton>
      <Photo2Icon />
      Collections
    </NavbarButton>
    <NavbarButton>
      <UploadIcon />
      Upload
    </NavbarButton>
  </nav>
);

export default Navbar;
