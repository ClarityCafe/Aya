import Joi from "@hapi/joi";

import { createCollection, searchCollections } from "~/lib/database";
import methods from "~/lib/methods";
import { CollectionSchema, CollectionBody } from "~/lib/schemas";
import validate from "~/lib/validate";

const getCollectionsSchema = Joi.object({
  query: Joi.string(),
  limit: Joi.number(),
  page: Joi.number(),
});

interface GetCollectionQuery {
  query?: string;
  limit?: number;
  page?: number;
}

export default methods({
  get: validate<GetCollectionQuery, "query">(
    { schema: getCollectionsSchema, location: "query" },
    async (req, res) => {
      const { query, page, limit } = req.query;
      const result = await searchCollections(query, page, limit);

      res.json(result);
    }
  ),
  post: {
    authorizationRequired: true,
    run: validate<CollectionBody>(
      { schema: CollectionSchema },
      async (req, res) => {
        await createCollection(req.body);
        res.status(204).end();
      }
    ),
  },
});
