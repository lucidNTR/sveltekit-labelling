import { json } from '@sveltejs/kit'
import * as dataStore from '$lib/server/data.ts'

export async function POST ({ request, params }) {
	/** @type {{ label: string, index: number | undefined, action: string }} */
	const { label, index, action } = await request.json()
	return json(await dataStore[action]({ docId: params.id, label, index }))
}
