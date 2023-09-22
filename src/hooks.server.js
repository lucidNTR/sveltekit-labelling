import startWorker from 'atreyu/start-worker.js'
// import { dataSource } from '$lib/direct-source.js'
/** @type {import('@sveltejs/kit').Handle} */

export async function handle(...args) {
  const { event, resolve } = args[0]

	const response = await resolve(event, {
		transformPageChunk: async ({ html }) => {
			// kit.start(app, element);

      // would work await new Promise(resolve => setTimeout(resolve, 1000))
      // const awaitedCache = await dataSource
      // console.log('cache in hook:', awaitedCache.model._request._requests, awaitedCache.model._request.requests)

      return html.replace(
				'%atreyu%',
				`      <script>
              ${startWorker.toString().replaceAll('\n', '\n               ')};
              // startWorker({ reloadAfterInstall: true, workerPath: './service-worker.js', isModule: true });
           </script>`
			)
		}

		// filterSerializedResponseHeaders: (name) => name.startsWith('x-'),
		// preload: ({ type, path }) => type === 'js' || path.includes('/important/')
	})

	return response
}
