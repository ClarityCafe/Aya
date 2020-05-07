import Joi from "@hpai/joi";

import { /* createUser, */ searchUsers } from "~/lib/database";
import methods from "~/lib/methods";
// import { UserSchema } from "~/lib/schemas";
import validate from "~/lib/validate";

const getUsersSchema = Joi.object({
  query: Joi.string(),
  limit: Joi.number(),
  page: Joi.number(),
});

interface GetUsersQuery {
  query?: string;
  limit?: number;
  page?: number;
}

export default methods({
  get: validate<GetUsersQuery, "query">(
    { schema: getUsersSchema, location: "query" },
    async (req, res) => {
      const { query, page, limit } = req.query;
      const result = await searchUsers(query, page, limit);

      res.json(result);
    }
  ),
  // TODO: reddit oauth
  // post: validate({ schema: UserSchema }, async (req, res) => {
  //   if (req.headers["content-type"] !== "application/json")
  //     res.end({ code: 400, message: "Request body is not JSON." });

  //   await createUser({
  //     id: idGen(),
  //     username: req.body.user,
  //     redditName: req.body.redditName,
  //     posts: [],
  //     collections: [],
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });
  //   res.status(204);
  // }),
});
