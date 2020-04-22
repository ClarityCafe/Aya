import faunadb from 'faunadb';

let client: faunadb.Client;

if (process.env.NODE_ENV === "development") client = new faunadb.Client({secret: process.env.FAUNADB_SECRET_DEV});
else client = new faunadb.Client({secret: process.env.FAUNADB_SECRET_PRODUCTION});

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
    posts: Array<PostOptions>
}

enum AccountType {
    AyaAdmin = 0b0100,
    AyaPartner = 0b0010,
    AyaSupporterUser = 0b0001,
    AyaRegularUser = 0b0000
}
/**
 * Initialize A Collection in the  Database. Only to be used if We're doing a transaction in a nonexistent Collection in a database.
 * @param collectionName the name of the collection
 * @param permissions permissions to give to the collection. Refer to https://docs.fauna.com/fauna/current/security/permissions#collections.
 */
export async function initCollection(collectionName: String, permissions?: faunadb.ExprArg): Promise<faunadb.RequestResult> {
    return await client.query(
        q.CreateCollection({
            name: collectionName,
            permissions: permissions ?? null
        })
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
            q.Ref(q.Collection(collection), post.id), {
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
            q.Ref(q.Collection(collection), data.id), {
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
            q.Ref(q.Collection(collection), data.id), {
                data: {
                    id: data.id,
                    username: data.username,
                    dateRegistered: data.dateRegistered,
                    redditLink: data.redditLink,
                    accountType: data.accountType ?? AccountType.AyaRegularUser,
                    bio: data.bio ?? null,
                    posts: [],
                    collections: []
                }
            }
        )
    )
}
/**
 * Edit the user object.
 * @param collection the target collection
 * @param data the Data to overwrite the current entry of the user.
 */
export async function editUser(collection: String, data:UserOptions): Promise<faunadb.RequestResult> {
    return await client.query(
        // we'll need to handle type checking in API-side.
        q.Update(q.Ref(q.Collection(collection), data.id), {data}))
}

/**
 * Deletes a Post associated by an ID
 * @param collection the target collection
 * @param id Snowflake ID of the user.
 */
export async function deletePost(collection: String, id: PostOptions["id"]): Promise<faunadb.RequestResult> {
    return await client.query(
        q.Delete(q.Ref(q.Collection(collection), id))
    )
}

/**
 * Deletes the user associated by an ID
 * @param collection the target collection
 * @param id Snowflake ID of the User.
 */
export async function deleteUser(collection: String, id: UserOptions["id"]): Promise<faunadb.RequestResult> {
    return await client.query(
        q.Delete(q.Ref(q.Collection(collection), id))
    )
}

export async function getPost(collection:String, id: PostOptions["id"]): Promise<faunadb.RequestResult> {
    return await client.query(
        q.Get(q.Ref(q.Collection(collection), id))
    )
}

export async function getCollection(collection:String, id: CollectionOptions["id"]): Promise<faunadb.RequestResult> {
    return await client.query(
        q.Get(q.Ref(q.Collection(collection), id))
    )
}

export async function getUser(collection:String, id: UserOptions["id"]): Promise<faunadb.RequestResult> {
    return await client.query(
        q.Get(q.Ref(q.Collection(collection), id))
    )
}