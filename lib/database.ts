// I would let you know this was coded under 24 hours by some dipshit who lacks sleep
// please help me I'm suffering inside
// - Ayane Satomi
import { ConnectionOptions, createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { Collection } from "./entities/Collection";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";

let dbURL;

if (process.env.NODE_ENV === "development") dbURL = process.env.MONGODB_URL_DEV;
else dbURL = process.env.MONGODB_URL;

//TODO: Support multiple DBs? I think the folks would like DB options.
const config: ConnectionOptions = {
    type: "mongodb",
    host: dbURL,
    entities: [
        "./entities/*.ts"
    ],
    migrations: [
        "./migrations/*.ts"
    ]
}

export async function createPost(input: Post) {
    let connection = await createConnection(config);
    
    const newPost = new Post();
    newPost.id = input.id;
    newPost.caption = input.caption;
    newPost.author = input.author;
    newPost.cdnUrl = input.cdnUrl;
    newPost.isNsfw = input.isNsfw;
    newPost.tags = input.tags;

    await connection.mongoManager.save(newPost);
}

export async function createCollection(input: Collection) {
    let connection = await createConnection(config);

    const newCollection = new Collection();
    newCollection.id = input.id;
    newCollection.author = input.author;
    newCollection.isNsfw = input.isNsfw;
    newCollection.posts = input.posts;
    newCollection.tags = input.tags;

    await connection.mongoManager.save(newCollection);
}

export async function createTag(input: Tag) {
    let connection = await createConnection(config);
    const newTag = new Tag();
    newTag.name = input.name;
    newTag.posts = input.posts;
    newTag.collections = input.collections;
    newTag.isNsfw = input.isNsfw;

    await connection.mongoManager.save(newTag);
}

export async function createUser(input: User) {
    let connection = await createConnection(config);
    const newUser = new User();
    newUser.id = input.id;
    newUser.username = input.username;
    newUser.redditLink = input.redditLink;
    newUser.posts = input.posts ?? [];
    newUser.collections = input.collections ?? [];

    await connection.mongoManager.save(newUser);    
}

export async function getAllPosts() {
    let connection = await createConnection(config);

    return await connection.mongoManager.find(Post);
}

export async function getAllCollections() {
    let connection = await createConnection(config);

    return await connection.mongoManager.find(Collection);
}

export async function getAllUsers() {
    let connection = await createConnection(config);
    
    return await connection.mongoManager.find(User);
}

export async function searchUserByKeyword(keyword: string) {
    let connection = await createConnection(config);

    return await connection.getRepository(User).find({username: keyword});
}

export async function searchPostsByKeyword(keyword: string) {
    let connection =  await createConnection(config);

    return await connection.getRepository(Post).find({caption: keyword, tags: Tag[keyword]});
}

export async function searchCollectionByKeyword(keyword: string) {
    let connection = await createConnection(config);

    return await connection.getRepository(Collection).find({name: keyword, tags: Tag[keyword]});
} 

export async function searchUserById(id: number) {
    let connection = await createConnection(config);

    return await connection.getRepository(User).findOneOrFail({id: id});
}

export async function searchPostById(id: number) {
    let connection = await createConnection(config);

    return await connection.getRepository(Post).findOneOrFail({id: id});
}

export async function searchCollectionById(id: number) {
    let connection = await createConnection(config);

    return await connection.getRepository(Post).findOneOrFail({id: id});

}
