import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
  server: {
    fs: {
      allow: [
        "/Users/jan/Dev/cloudless/atreyu/npm-dist/falcor-worker.js"
      ]
    }
  }
})
