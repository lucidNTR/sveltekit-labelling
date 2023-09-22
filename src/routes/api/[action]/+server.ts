import { json } from '@sveltejs/kit'
import * as service from '$lib/server/service.ts'

export async function GET ({ url, params }) {
  const action = params.action

  if (action === 'count') {
    return json({ count: (await service.list()).length })
  } else if (action === 'findNext') {
    return json({ docId: await service.findNext() })
  } else if (action === 'list') {
    const range = JSON.parse(url.searchParams.get('range')!)
    return json({ list: (await service.list(range)) })
  } else if (action === 'get') {
    const ids = JSON.parse(url.searchParams.get('ids')!)
    return json({ docs: await service.get(ids) })
  }
}

export async function POST ({ request, params }) {
  const action = params.action

  const { docs, id } = await request.json()

  if (action === 'set') {
    await Promise.all(docs.map(doc => service.set(doc)))
    return json({ ok: true })
  } else if (action === 'suggest') {
    return json({ doc: await service.suggest({ docId: id }) })
  }
}
