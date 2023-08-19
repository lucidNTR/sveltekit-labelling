import startWorker from 'atreyu/start-worker.js'
/** @type {import('@sveltejs/kit').Handle} */

export async function handle({ event, resolve }) {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			// kit.start(app, element);

			return html.replace(
				'%atreyu.startup%',
				`<script>
            ${startWorker.toString()}
            startWorker({ reloadAfterInstall: "always", workerPath: './service-worker.js', isModule: true })
          </script>`
			)
		}

		// filterSerializedResponseHeaders: (name) => name.startsWith('x-'),
		// preload: ({ type, path }) => type === 'js' || path.includes('/important/')
	})

	return response
}
