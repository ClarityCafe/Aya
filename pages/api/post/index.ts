import { NextApiRequest, NextApiResponse } from "next";

import { createPost, getAllPosts } from "../../../lib/database";
import idGen from "../../../lib/idgen";
import methods from "../../../lib/methods";
import { PostSchema } from "../../../lib/schemas";
import validate from "../../../lib/validate";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    // TODO: Paginate this in Frontend!
    const dbResult = await getAllPosts();

    res.status(200).json(dbResult);
  },
  post: {
    authorizationRequired: true,
    run: validate(
      { schema: PostSchema },
      async (req: NextApiRequest, res: NextApiResponse) => {
        // if (req.headers["content-type"] !== "application/json")
        //   res.status(400).json({
        //     code: 400,
        //     message: "Request body is not JSON.",
        //   });

        await createPost({
          id: idGen(),
          author: req.body.id,
          caption: req.body.caption,
          ipfsHash: req.body.ipfsHash,
          tags: req.body.tags ?? [],
          nsfw: req.body.nsfw,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        res.status(204).end();
      }
    ),
  },
});
