import { NextApiRequest, NextApiResponse } from "next";

import { searchPostById } from "../../../lib/database";
import methods from "../../../lib/methods";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const {
      query: { id },
    } = req;

    try {
      const dbResult = await searchPostById(parseInt(id[0]));

      res.status(200).json(dbResult);
    } catch (e) {
      res.status(404).json({
        code: res.statusCode.toString(),
        message: "Resource does not exist",
      });
    }
  },
});
