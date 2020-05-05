import { NextApiRequest, NextApiResponse } from "next";

import { createCollection, getAllCollections } from "../../../lib/database";
import idGen from "../../../lib/idgen";
import methods from "../../../lib/methods";
import { CollectionSchema } from "../../../lib/schemas";
import validate from "../../../lib/validate";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    // TODO: paginate this in Frontend!
    const dbResult = await getAllCollections();

    res.status(200).json(dbResult);
  },
  post: {
    authorizationRequired: true,
    run: validate(
      { schema: CollectionSchema },
      async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.headers["content-type"] !== "application/json")
          res.end({ code: 400, message: "Request body is not JSON." });

        await createCollection({
          id: idGen(),
          name: req.body.name,
          author: req.body.author,
          posts: req.body.posts,
          tags: req.body.tags,
          nsfw: req.body.nsfw,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        res.status(204).end();
      }
    ),
  },
});
