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

import Redis from "ioredis";
import sagiri, { SagiriResult } from "sagiri";

// only output 5 best results.
const client = sagiri(process.env.SAUCENAO_API_KEY, { results: 5 });
const cache = new Redis(process.env.REDIS_URL);

/**
 * Looks up using SauceNAO and saves it in a cache for 56 hours.
 * If no cache is set, it just returns the query from SauceNAO directly.
 * @param sourceUrl the URL for the image to look up.
 */
export default async function sourceLookup(sourceUrl: string) {
  if (!process.env.REDIS_URL && process.env.NODE_ENV === "production")
    console.warn(
      "WARNING! Redis cache is unset! This is highly discouraged for production!"
    );

  if (process.env.REDIS_URL)
    try {
      // Let's try to see if we already looked it up before...
      return await cache.get(sourceUrl);
    } catch {
      // Looks like we don't know this waifu so let's try to look it up.
      // then store it in the cache for 56 hours to lessen the load.
      const sagiriRes: SagiriResult[] = await client(sourceUrl);
      await cache.set(sourceUrl, sagiriRes, "ex", 1000 * 60 * 60 * 56);

      // return from the cache
      return await cache.get(sourceUrl);
    }
  // don't have a Redis cache? don't worry, just return the results!
  else return client(sourceUrl);
}
