/* 
 *  Copyright (c) 2020 Ayane Satomi, Michael Mitchell, et al.
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

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
