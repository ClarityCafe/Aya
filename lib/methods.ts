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

import { NextApiHandler } from "next";

import { isAuthed } from "./auth";
import handleError from "./handleError";

// TODO: probably add CORS stuff as well
const methods = (methodHandlers: {
  [key: string]:
    | NextApiHandler
    | { run: NextApiHandler; authorizationRequired?: boolean };
}): NextApiHandler => (req, res) => {
  const method = req.method.toLowerCase();
  const handler = methodHandlers[method];

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (methodHandlers[method])
    if (typeof handler === "function") return handleError(handler)(req, res);
    else if (handler.authorizationRequired && !isAuthed(req)) {
      res
        .status(401)
        .json({ code: 401, message: "Authorization required or is invalid" });
    } else return handleError(handler.run)(req, res);
  else
    res
      .status(405)
      .json({ code: 405, message: "Method not available on this endpoint" });
};

export default methods;
