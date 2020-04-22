import faunadb from 'faunadb';

const client = new faunadb.Client({secret: process.env.FAUNA_KEY});
const  q = faunadb.query;

interface PostOptions {
    id: String,
    name: String,
    cdnUrl: String,
    isNsfw: boolean,
    author: string,
    datePosted: Date
    tags: Array<String>
}

interface CollectionOptions {
    id: String,
    author: String,
    title: String,
    posts: Array<PostOptions>
    tags: Array<String>
}

interface UserOptions {
    id: String,
    username: String,
    dateRegistered: Date,
    accountType: AccountType
    redditLink: String,
    bio: String,
    authKey: String
    posts: Array<PostOptions>
}

enum AccountType {
    AyaAdmin = 0,
    AyaPartner = 1,
    AyaSupporterUser = 2,
    AyaRegularUser = 3
}
/**
 * Initialize A Collection in the  Database. Only to be used if We're doing a transaction in a nonexistent Collection in a database.
 * @param collectionName the name of the collection
 * @param permissions permissions to give to the collection. Refer to https://docs.fauna.com/fauna/current/security/permissions#collections.
 */
export async function initCollection(collectionName: String, permissions: faunadb.ExprArg): Promise<faunadb.RequestResult> {
    return await client.query(
        q.CreateCollection({
            name: collectionName,
            permissions
        })
    )
}
/**
 * Create a Database if database we're trying to query does not exist.
 * @param name Name for the database
 */
export async function createDatabase(name?: String): Promise<faunadb.RequestResult> {
    return await client.query(
        q.CreateDatabase({name: name ?? "aya-prod"})
    )
}
/**
 * Create a Post to a collection.
 * @param collection the name of the collection to perform transaction to
 * @param post the post object.
 */
export async function commitPost(collection: String, post: PostOptions): Promise<faunadb.RequestResult> {
    return await client.query(
        q.Create(
            q.Collection(collection), {
                data: {
                    id: post.id,
                    name: post.name,
                    cdnUrl: post.cdnUrl,
                    isNsfw: post.isNsfw,
                    author: post.author,
                    datePosted: post.datePosted,
                    tags: post.tags
                }
            }
        )
    )
}
/**
 * commits a Collection to a target Collection. Not to be confused with FaunaDB Collections.
 * @param collection the target collection.
 * @param data the collection object. Refer to the interface for parameters.
 */
export async function commitCollection(collection: String, data: CollectionOptions): Promise<faunadb.RequestResult> {
    return await client.query(
        q.Create(
            q.Collection(collection), {
                data: {
                    id: data.id,
                    author: data.author,
                    title: data.title,
                    posts: data.posts ?? [],
                    tags: data.tags ?? []
                }
            }
        )
    )
}
/**
 * Create a User in the target collection.
 * @param collection the target collection.
 * @param data the user object. Refer to the interface for the parameters.
 */
export async function commitUser(collection:String, data: UserOptions): Promise<faunadb.RequestResult> {
    return await client.query(
        q.Create(
            q.Collection(collection), {
                data: {
                    id: data.id,
                    username: data.username,
                    dateRegistered: data.dateRegistered,
                    redditLink: data.redditLink,
                    accountType: data.accountType ?? AccountType.AyaRegularUser,
                    bio: data.bio,
                    posts: [],
                    collections: []
                }
            }
        )
    )
}