// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}

		interface Platform {
			// env: {
			//   COUNTER: DurableObjectNamespace;
			// };
			context: {
				waitUntil(promise: Promise<unknown>): void
			}
			caches: CacheStorage & { default: Cache }
		}
	}

  interface ViewTransition {
    updateCallbackDone: Promise<void>;
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
  }

  interface Document {
      startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
  }
}

export {}
