import { json } from '@sveltejs/kit';
import * as dataStore from '$lib/server/data.js';

export async function POST ({ request, params }) {
  const { label, index, action } = await request.json();
  return json(await dataStore[action]({ docId: params.id, label, index }));
}
