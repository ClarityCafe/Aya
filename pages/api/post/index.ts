import { NextApiRequest, NextApiResponse } from "next";

import methods from "../../../lib/methods";
import { createPost, getAllPosts } from "../../../lib/database";
import idGen from "../../../lib/idgen";
import validate from "../../../lib/validate";
import { PostSchema } from "../../../lib/schemas";

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
          cdnUrl: req.body.cdnUrl,
          tags: req.body.tags ?? [],
          dateCreated: new Date().toString(),
          isNsfw: req.body.isNsfw ?? false,
        });

        res.status(204).end();
      }
    ),
  },
});
