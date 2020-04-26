import Joi, { ObjectSchema } from "@hapi/joi";
import { Collection } from "../entities/Collection";


export const CollectionSchema: ObjectSchema<Collection> = Joi.object({
    id: Joi.number(),
    author: Joi.number(),
    name: Joi.string(),
    posts: Joi.array(),
    isNsfw: Joi.bool(),
    tags: Joi.array()
})