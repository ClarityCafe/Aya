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

// I would let you know this was coded under 24 hours by some dipshit who lacks sleep
// please help me I'm suffering inside
// - Ayane Satomi
import "reflect-metadata";

import { clamp } from "rambda";
import { BaseEntity, Like, getConnection } from "typeorm";

import Base from "./entities/Base";
import Collection from "./entities/Collection";
import Post from "./entities/Post";
import Tag from "./entities/Tag";
import User from "./entities/User";
import idgen from "./idgen";
import { CollectionBody, PostBody, UserBody } from "./schemas";

const query = () => getConnection().createQueryBuilder();
const clampLimit = clamp(10, 100);
const getOneOfType = <T extends typeof Base>(type: T) => (id: string) =>
  type.findOneOrFail({ id });

// const paginate = <T extends typeof BaseEntity>(type: T) => async (
//   page = 0,
//   limit = 50
// ) => {
//   const limit_ = clampLimit(limit);

//   const results = await type
//     .createQueryBuilder()
//     .select()
//     .skip(page * limit_)
//     .take(limit_)
//     .getMany();
//   const total = await Post.createQueryBuilder().select().getCount();

//   return { results, total, limit: limit_, page: page * limit_ };
// };

const search = <T extends typeof BaseEntity>(
  type: T,
  fields: string[]
) => async (search: string, page = 0, limit = 50) => {
  const limit_ = clampLimit(limit);

  const users = await type.getRepository().find({
    // TODO: does Like(`%blahblah%`) inject
    where: fields.map((x) => ({ [x]: Like(`%${search}%`) })),
    take: limit_,
    skip: page * limit_,
  });
  const total = await type.createQueryBuilder().select().getCount();

  return { results: users, total, limit: limit_, page: page * limit_ };
};

export const createPost = async ({
  author,
  caption,
  ipfsHash,
  nsfw,
  tags,
}: PostBody) => {
  const id = idgen();

  await query()
    .insert()
    .into(Post)
    .values([{ id, caption, ipfsHash, nsfw }])
    .execute();

  await query().relation(Post, "author").of(id).set(author);
  await query().relation(Post, "tags").of(id).add(tags);
};

export const createCollection = async ({
  name,
  nsfw,
  author,
  posts,
}: CollectionBody) => {
  const id = idgen();

  await query()
    .insert()
    .into(Collection)
    .values([{ id, name, nsfw }])
    .execute();

  await query().relation(Collection, "author").of(id).set(author);
  await query().relation(Collection, "posts").of(id).add(posts);
};

export const createTag = async (name: string) => {
  await query().insert().into(Tag).values([{ name }]).execute();
};

export const createUser = async ({ username, redditName }: UserBody) => {
  const id = idgen();

  await query()
    .insert()
    .into(User)
    .values([{ id, username, redditName }])
    .execute();
};

// export const getPosts = paginate(Post);
// export const getCollections = paginate(Collection);
// export const getUsers = paginate(User);

export const searchUsers = search(User, ["username", "redditName"]);
export const searchCollections = search(Collection, ["name"]);

export const searchPostsByTags = async (
  tags: string[],
  page = 0,
  limit = 20
) => {
  const [firstTag, ...restTags] = tags; // Pull first one out to start the first `WHERE`
  const limit_ = clampLimit(limit);

  let query = Post.createQueryBuilder("post")
    .leftJoin("post.tags", "tag")
    .where("tag.name = :tag", { tag: firstTag });

  for (const tag of restTags)
    query = query.andWhere("tag.name = :tag", { tag });

  const posts = await query
    .skip(page * limit_)
    .take(limit_)
    .execute();
  const total = await query.getCount();

  return { results: posts, total, limit: limit_, page: page * limit_ };
};

export const getUser = getOneOfType(User);
export const getPost = getOneOfType(Post);
export const getCollection = getOneOfType(Collection);
