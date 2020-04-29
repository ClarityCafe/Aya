import { NextApiResponse, NextApiRequest } from "next";

import { createUser, getAllUsers } from "../../../lib/database";
import idGen from "../../../lib/idgen";
import methods from "../../../lib/methods";
import { UserSchema } from "../../../lib/schemas";
import validate from "../../../lib/validate";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    // TODO: Paginate this on Frontend!
    const dbResult = await getAllUsers();
    res.status(200).json(dbResult);
  },
  post: validate(
    { schema: UserSchema },
    async (req: NextApiRequest, res: NextApiResponse) => {
      if (req.headers["content-type"] !== "application/json")
        res.end({ code: 400, message: "Request body is not JSON." });

      await createUser({
        id: idGen(),
        username: req.body.user,
        redditLink: req.body.redditLink,
        posts: [],
        collections: [],
        dateCreated: new Date().toString(),
      });
      res.status(204);
    }
  ),
});
