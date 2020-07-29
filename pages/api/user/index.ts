/*
 *  Copyright (c) 2020 Ayane Satomi, Michael Mitchell, et al.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

import Joi from "@hapi/joi";

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
