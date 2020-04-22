import { NextApiHandler } from "next";

import { isAuthed } from "./isAuthed";

interface Options {
  authorizationRequired?: boolean;
}

// TODO: probably add CORS stuff as well
export const methods = (
  methodHandlers: {
    [key: string]: NextApiHandler;
  },
  { authorizationRequired = false }: Options = {}
): NextApiHandler => (req, res) => {
  const method = req.method.toLowerCase();

  if (methodHandlers[method])
    if (authorizationRequired && !isAuthed(req)) {
      res
        .status(401)
        .json({ error: 401, message: "Authorization required or is invalid" });
    } else return methodHandlers[method](req, res);
  else
    res
      .status(405)
      .json({ error: 405, message: "Method not available on this endpoint" });
};
