import { NextApiRequest, NextApiResponse } from "next";

import methods from "../../../lib/methods";

export default methods({
  post(req: NextApiRequest, res: NextApiResponse) {
    res.status(503).json({ code: 503, message: "WIP" });
  },
});
