import cloudflare from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/kit/vite'
/** @type {import('@sveltejs/kit').Config} */

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: cloudflare(),
		serviceWorker: { register: false }
		// version: { name: child_process.execSync('git rev-parse HEAD').toString().trim() }
	}
}

export default config
