import * as data from '$lib/server/data.ts'
export const ssr = false // TODO: support SSR

export function load() {
	return data.getDocs()
}
