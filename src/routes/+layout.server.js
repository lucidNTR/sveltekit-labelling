import * as data from '$lib/server/data.js';

export function load() {
	return data.getDocs();
}
