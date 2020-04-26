import Joi, { ObjectSchema } from "@hapi/joi";
import { User } from "../entities/User";


export const UserSchema : ObjectSchema<User> = Joi.object({
    id: Joi.number(),
    username: Joi.string().max(24),
    redditLink: Joi.string().pattern(/https:\/\/reddit\.com\/u\/([\w]+[\d]?)/gi),
    bio: Joi.string().max(100),
    posts: Joi.array(),
    collections: Joi.array(),
    dateCreated: Joi.string()
})