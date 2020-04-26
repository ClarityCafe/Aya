import { methods } from "../../../lib/methods";
import { NextApiRequest, NextApiResponse } from "next";
import { createPost, getAllPosts } from "../../../lib/database";
import idGen from "../../../lib/idgen";
import { validate } from "../../../lib/validate";
import { PostSchema } from "../../../lib/schemas/post.schema";


export default methods({
    get : async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            //TODO: Paginate this in Frontend!
            let dbResult = await getAllPosts();

            res.status(200).json(dbResult);
        } catch (e) {
            res.status(500).json({code: res.statusCode.toString(), message: `Something went wrong: ${e}`});
        }
    },
    post: {
        authorizationRequired: true,
        run: validate({schema: PostSchema}, async (req: NextApiRequest, res: NextApiResponse) => {
            if (req.headers["content-type"] !== "application/json") res.status(400).json({code: res.statusCode.toString, message: "Request body is not JSON."});

            try {
                await createPost({
                    id: idGen(),
                    author: req.body.id,
                    caption: req.body.caption,
                    cdnUrl: req.body.cdnUrl,
                    tags: req.body.tags ?? [],
                    dateCreated: new Date().toString(),
                    isNsfw: req.body.isNsfw ?? false
                });

                res.status(204).end();
            } catch (e) {
                res.status(500).json({code: res.statusCode.toString(), message: `Something went wrong: ${e}`});
            } 
        })
    }
})