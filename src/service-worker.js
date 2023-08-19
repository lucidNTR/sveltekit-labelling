/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
const _sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self))

import { build, files, version } from '$service-worker'

import attachFalcorWorker from 'atreyu/falcor-worker.js?v=1dsf'

console.log({ build, files, version })

const CACHE = `cache-${version}`
const ASSETS = [...build, ...files]

// self.addEventListener('install', (event) => {
//   // Create a new cache and add all files to it
//   async function addFilesToCache() {
//     const _cache = await caches.open(CACHE)
//     //  await cache.addAll(ASSETS)
//   }
//   event.waitUntil(addFilesToCache())
// });
// self.addEventListener('activate', (event) => {
//   // Remove previous cached data from disk
//   async function deleteOldCaches() {
//     for (const key of await caches.keys()) {
//       if (key !== CACHE) await caches.delete(key);
//     }
//   }
//   event.waitUntil(deleteOldCaches())
// })
self.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url)
	console.log(url.href)
	//   // ignore POST requests etc
	//   if (event.request.method !== 'GET') return;
	//   async function respond() {
	//     const cache = await caches.open(CACHE);
	//     // `build`/`files` can always be served from the cache
	//     // if (ASSETS.includes(url.pathname)) {
	//     //   return cache.match(url.pathname);
	//     // }
	//     // for everything else, try the network first, but
	//     // fall back to the cache if we're offline
	//     try {
	//       const response = await fetch(event.request);
	//       if (response.status === 200) {
	//         cache.put(event.request, response.clone());
	//       }
	//       return response;
	//     } catch {
	//       return cache.match(event.request);
	//     }
	//   }
	//   event.respondWith(respond())
})

attachFalcorWorker({
	localOnly: true,
	schema: function schema({ defaultPaths, addPathTags }) {
		return {
			paths: {
				'rows.length': {
					get: { tags: ['falcor'], handler: () => 10 }
				},
				'rows[{ranges}][{keys}]': {
					get: {
						tags: ['falcor'],
						handler: (...args) => {
							console.log(args)
							return new Promise((resolve) => setTimeout(() => resolve('sdfasdf'), 1000))
						}
					}
				},
				hello: {
					get: {
						tags: ['falcor'], // FIXME: remove and auto add on falcor worker!
						handler: () => {
							return 'World'
						}
					}
				},
				...defaultPaths
			}
		}
	}
})
