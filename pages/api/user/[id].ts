import { methods } from '../../../lib/methods';
import { NextApiRequest, NextApiResponse } from 'next';
import { searchUserById } from '../../../lib/database';
import { validate } from '../../../lib/validate';
import Joi from '@hapi/joi';
import { User } from '../../../lib/entities/User';

export default methods({
    get: async (req: NextApiRequest, res: NextApiResponse) => {
        const {query: {id}} = req;
        
        try {
          let dbResult = await searchUserById(parseInt(id[0]));

          res.status(200).json(dbResult);
        } catch (e) {
            res.status(404).json({code: res.statusCode.toString(), message: "Resource does not exist"});
        }
    }
})