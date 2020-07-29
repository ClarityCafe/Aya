/*
 *  Copyright (c) 2020 Ayane Satomi, Michael Mitchell, et al.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

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
//   username: Joi.string().max(32),
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

export interface UserBody {
  username: string;
  redditName: string;
}
