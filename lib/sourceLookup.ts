import sagiri from 'sagiri';

// only output 5 best results.
let client = sagiri(process.env.SAUCENAO_API_KEY, {results: 5}) 

// TODO: we won't save this in the DB but we could save it in the cache like Redis
// that way we don't need to requery SauceNAO
export default async function (sourceUrl: string) {
    return await client(sourceUrl);
}