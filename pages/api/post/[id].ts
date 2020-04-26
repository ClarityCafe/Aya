import { methods } from "../../../lib/methods";
import { NextApiRequest, NextApiResponse } from "next";
import { searchPostById } from "../../../lib/database";


export default methods({
    get: async (req: NextApiRequest, res: NextApiResponse) => {
        const {query: {id}} = req;
        
        try {
            let dbResult = await searchPostById(parseInt(id[0]));

            res.status(200).json(dbResult);
        } catch (e) {
            res.status(404).json({code: res.statusCode.toString(), message: "Resource does not exist"});
        }
    }
})