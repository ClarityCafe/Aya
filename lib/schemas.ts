import Joi from "@hapi/joi";

export const CollectionSchema = Joi.object({
  author: Joi.string().required(),
  name: Joi.string().max(500).required(),
  // Must have at least one post
  posts: Joi.array().items(Joi.string().required()).required(),
  nsfw: Joi.bool().default(false),
});

export const PostSchema = Joi.object({
  author: Joi.string().required(),
  caption: Joi.string().max(500).required(),
  ipfsHash: Joi.string().required(),
  nsfw: Joi.bool().default(false),
  tags: Joi.array()
    .items(Joi.string().lowercase().max(32).required())
    .required(),
});

// TODO: reddit oauth on POST user
// export const UserSchema = Joi.object({
//   username: Joi.string().max(24),
//   redditLink: Joi.string().pattern(/https:\/\/reddit\.com\/u\/([\w]+[\d]?)/gi),
// });

export interface CollectionBody {
  author: string;
  name: string;
  posts: string[];
  nsfw?: boolean;
}

export interface PostBody {
  author: string;
  caption: string;
  ipfsHash: string;
  nsfw?: boolean;
  tags: string[];
}
export type UserBody = null;
