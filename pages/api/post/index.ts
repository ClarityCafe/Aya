import Joi from "@hapi/joi";

import { createPost, searchPostsByTags } from "~/lib/database";
import methods from "~/lib/methods";
import { PostSchema, PostBody } from "~/lib/schemas";
import validate from "~/lib/validate";

const custom = Joi.extend((joi) => ({
  base: joi.array(),
  type: "stringArray",
  coerce(value) {
    if (typeof value !== "string") return value;

    return value.replace(/^,+|,+$/gm, "").split(",");
  },
}));

const getPostSchema = Joi.object({
  // TODO: is single needed?
  tags: custom.stringArray().items(Joi.string()).single(),
  limit: Joi.number(),
  page: Joi.number(),
});

interface GetPostQuery {
  tags?: string[];
  page?: number;
  limit?: number;
}

export default methods({
  get: validate<GetPostQuery, "query">(
    { schema: getPostSchema },
    async (req, res) => {
      const { tags, page, limit } = req.query;
      const result = await searchPostsByTags(tags, page, limit);

      res.json(result);
    }
  ),
  post: {
    authorizationRequired: true,
    run: validate<PostBody>({ schema: PostSchema }, async (req, res) => {
      await createPost(req.body);
      res.status(204).end();
    }),
  },
});
