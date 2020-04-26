import { methods } from "../../../lib/methods";
import { NextApiRequest, NextApiResponse } from "next";
import { createCollection, getAllCollections } from "../../../lib/database";
import idGen from "../../../lib/idgen";
import { validate } from "../../../lib/validate";
import Joi from "@hapi/joi";
import { Collection } from "../../../lib/entities/Collection";


export default methods({
    get: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            //TODO: paginate this in Frontend!
            let dbResult = await getAllCollections();

            res.status(200).json(dbResult);
        } catch (e) {
            res.status(500).json({code: res.statusCode.toString(), message: `Something went wrong: ${e}`});
        }
    },
    post: {
        authorizationRequired: true,
        run: validate({schema: Joi.object(Collection)}, async (req: NextApiRequest, res: NextApiResponse) => {
            if (req.headers["content-type"] !== "application/json") res.end({code: 400, message: "Request body is not JSON."});
            
            try {
                await createCollection({
                    id: idGen(),
                    name: req.body.name,
                    author: req.body.author,
                    posts : req.body.posts,
                    isNsfw: req.body.isNsfw,
                    tags: req.body.tags
                });

                res.status(204).end();
            } catch (e) {
                res.status(500).json({code: res.statusCode.toString(), message: `Something went wrong: ${e}`});
            }
        })
    }
})