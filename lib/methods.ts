import { NextApiHandler } from "next";

import { isAuthed } from "./isAuthed";

// TODO: probably add CORS stuff as well
export const methods = (methodHandlers: {
  [key: string]:
    | NextApiHandler
    | { run: NextApiHandler; authorizationRequired?: boolean };
}): NextApiHandler => (req, res) => {
  const method = req.method.toLowerCase();
  const handler = methodHandlers[method];

  if (methodHandlers[method])
    if (typeof handler === "function") return handler(req, res);
    else if (handler.authorizationRequired && !isAuthed(req)) {
      res
        .status(401)
        .json({ error: 401, message: "Authorization required or is invalid" });
    } else return handler.run(req, res);
  else
    res
      .status(405)
      .json({ error: 405, message: "Method not available on this endpoint" });
};
