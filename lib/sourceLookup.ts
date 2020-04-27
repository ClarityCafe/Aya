import sagiri, { SagiriResult } from 'sagiri';
import Redis from "ioredis";

// only output 5 best results.
let client = sagiri(process.env.SAUCENAO_API_KEY, {results: 5});
let cache = new Redis(process.env.REDIS_URL);

// TODO: we won't save this in the DB but we could save it in the cache like Redis
// that way we don't need to requery SauceNAO
export default async function (sourceUrl: string) {
    try {
        // Let's try to see if we already looked it up before...
        return await cache.get(sourceUrl);
    } catch {
        // Looks like we don't know this waifu so let's try to look it up.
        // then store it in the cache for 48 hours to lessen the load.
        let sagiriRes: SagiriResult[] = await client(sourceUrl);
        await cache.set(sourceUrl, sagiriRes, "ex", 1000 * 60 * 60 * 56);

        // return from the cache
        return cache.get(sourceUrl);
    }
}