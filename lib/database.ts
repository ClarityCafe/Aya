// I would let you know this was coded under 24 hours by some dipshit who lacks sleep
// please help me I'm suffering inside
// - Ayane Satomi
import { ConnectionOptions, createConnection } from "typeorm";

import Collection from "./entities/Collection";
import Post from "./entities/Post";
import Tag from "./entities/Tag";
import User from "./entities/User";

let dbURL;

if (process.env.NODE_ENV === "development") dbURL = process.env.MONGODB_URL_DEV;
else dbURL = process.env.MONGODB_URL;

// TODO: Support multiple DBs? I think the folks would like DB options.
const config: ConnectionOptions = {
  type: "mongodb",
  host: dbURL,
  entities: ["./entities/*.ts"],
  migrations: ["./migrations/*.ts"],
};

export async function createPost(input: Post) {
  const connection = await createConnection(config);

  const newPost = new Post();
  newPost.id = input.id;
  newPost.caption = input.caption;
  newPost.author = input.author;
  newPost.ipfsHash = input.ipfsHash;
  newPost.nsfw = input.nsfw;
  newPost.tags = input.tags;
  newPost.createdAt = input.createdAt;
  newPost.updatedAt = input.updatedAt;

  await connection.mongoManager.save(newPost);
}

export async function createCollection(input: Collection) {
  const connection = await createConnection(config);

  const newCollection = new Collection();
  newCollection.id = input.id;
  newCollection.author = input.author;
  newCollection.nsfw = input.nsfw;
  newCollection.posts = input.posts;
  newCollection.tags = input.tags;
  newCollection.createdAt = input.createdAt;
  newCollection.updatedAt = input.createdAt;

  await connection.mongoManager.save(newCollection);
}

export async function createTag(input: Tag) {
  const connection = await createConnection(config);
  const newTag = new Tag();
  newTag.name = input.name;
  newTag.posts = input.posts;
  newTag.collections = input.collections;
  newTag.isNsfw = input.isNsfw;

  await connection.mongoManager.save(newTag);
}

export async function createUser(input: User) {
  const connection = await createConnection(config);
  const newUser = new User();
  newUser.id = input.id;
  newUser.username = input.username;
  newUser.redditName = input.redditName;
  newUser.posts = input.posts;
  newUser.collections = input.collections;
  newUser.createdAt = input.createdAt;
  newUser.updatedAt = input.updatedAt;

  await connection.mongoManager.save(newUser);
}

export async function getAllPosts() {
  const connection = await createConnection(config);

  return connection.mongoManager.find(Post);
}

export async function getAllCollections() {
  const connection = await createConnection(config);

  return connection.mongoManager.find(Collection);
}

export async function getAllUsers() {
  const connection = await createConnection(config);

  return connection.mongoManager.find(User);
}

export async function searchUserByKeyword(keyword: string) {
  const connection = await createConnection(config);

  return connection.getRepository(User).find({ username: keyword });
}

export async function searchPostsByKeyword(keyword: string) {
  const connection = await createConnection(config);

  return connection
    .getRepository(Post)
    .find({ caption: keyword, tags: Tag[keyword] });
}

export async function searchCollectionByKeyword(keyword: string) {
  const connection = await createConnection(config);

  return connection
    .getRepository(Collection)
    .find({ name: keyword, tags: Tag[keyword] });
}

export async function searchUserById(id: number) {
  const connection = await createConnection(config);

  return connection.getRepository(User).findOneOrFail({ id });
}

export async function searchPostById(id: number) {
  const connection = await createConnection(config);

  return connection.getRepository(Post).findOneOrFail({ id });
}

export async function searchCollectionById(id: number) {
  const connection = await createConnection(config);

  return connection.getRepository(Post).findOneOrFail({ id });
}
