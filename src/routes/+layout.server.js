import * as data from '$lib/server/data.ts'
export const ssr = false

export function load() {
	return data.getDocs()
}
