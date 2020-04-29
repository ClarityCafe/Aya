import Joi from "@hapi/joi";

export const CollectionSchema = Joi.object({
  id: Joi.number(),
  author: Joi.number(),
  name: Joi.string(),
  posts: Joi.array(),
  isNsfw: Joi.bool(),
  tags: Joi.array(),
});

export const PostSchema = Joi.object({
  id: Joi.number(),
  author: Joi.number(),
  caption: Joi.string(),
  ipfsHash: Joi.string(),
  isNsfw: Joi.bool(),
  dateCreated: Joi.string(),
  tags: Joi.array(),
});

export const UserSchema = Joi.object({
  id: Joi.number(),
  username: Joi.string().max(24),
  redditLink: Joi.string().pattern(/https:\/\/reddit\.com\/u\/([\w]+[\d]?)/gi),
  posts: Joi.array(),
  collections: Joi.array(),
  dateCreated: Joi.string(),
});
