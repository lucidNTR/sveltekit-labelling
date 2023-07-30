import * as data from '$lib/server/data.ts';

export function load() {
	return data.getDocs();
}
