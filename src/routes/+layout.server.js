import { getCache } from '$lib/direct-source.js'
export async function load () {
  // TODO: only send cache for this page and handle public and private data!

  return {
    // use precache if server side model is used for full SSR
    // preCache: getCache(),
    streamed: {
      cache: getCache()
    }
  }
}
