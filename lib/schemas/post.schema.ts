import Joi, { ObjectSchema } from "@hapi/joi";
import { Post } from "../entities/Post";


export const PostSchema: ObjectSchema<Post> = Joi.object({
    id: Joi.number(),
    author: Joi.number(),
    caption: Joi.string(),
    cdnUrl: Joi.string(),
    isNsfw: Joi.bool(),
    dateCreated: Joi.string(),
    tags: Joi.array()
})