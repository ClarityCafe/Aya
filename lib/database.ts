import {PrismaClient} from '@prisma/client';
import idGen from './idgen';

const prisma = new PrismaClient();

//FIXME: add Authentication!
export async function createUser(name, redditLink) {
    await prisma.user.create({
        data: {
            id: parseInt(idGen.toString()),
            name: name,
            reddit_link: redditLink,
            bio: null,
            posts: null,
            collections: null
        }
    })
}

//FIXME: add Authentication!
export async function createPost(author, cdnUrl, isNsfw, caption, tags) {
     await prisma.post.create({
         data: {
             id: parseInt(idGen.toString()),
             author,
             cdnUrl,
             isNsfw,
             caption,
             tags
         }
     })
}

//FIXME: add Authentication!
export async function createCollection(posts, author, isNsfw, name) {
    await prisma.collection.create({
        data: {
            id: parseInt(idGen.toString()),
            author,
            isNsfw,
            name,
            posts
        }
    })
}