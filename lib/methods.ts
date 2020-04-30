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
