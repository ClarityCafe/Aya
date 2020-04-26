import {methods} from "../../../lib/methods";
import "../../../lib/database";
import { NextApiResponse, NextApiRequest } from "next";
import { createUser, getAllUsers } from "../../../lib/database";
import idGen from "../../../lib/idgen";
import { validate } from "../../../lib/validate";
import { UserSchema } from "../../../lib/schemas/user.schema";

export default methods({
    get: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            //TODO: Paginate this on Frontend!
            let dbResult = await getAllUsers();
            res.status(200).json(dbResult);
        } catch (e) {
            res.status(500).json({code: res.statusCode.toString(), message: `Something went wrong: ${e}`});
        }
    },
    post: validate({schema: UserSchema}, async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.headers["content-type"] !== "application/json") res.end({code: 400, message: "Request body is not JSON."});
            
        try {
            await createUser({
                id: idGen(),
                username: req.body.user,
                bio: req.body.bio ?? null,
                redditLink: req.body.redditLink,
                posts: [],
                collections: [],
                dateCreated: new Date().toString()
            });
            res.status(204);
        } catch (e) {
            res.status(500).json({code: res.statusCode.toString(), message: `Something went wrong: ${e}`});
        }
    })
})