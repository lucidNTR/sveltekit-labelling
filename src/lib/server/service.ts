type Store = {
  docs: Record<string, Doc>
}
type Doc = {
	_id: string
	title: string
	body: string
	url: string
	approved?: null | boolean | undefined
	labels?: string[] | undefined
}

import bootstrapstore from './dataset.json' assert { type: 'json' }
const store: Store = bootstrapstore
const listByid: string[] = Object.keys(store.docs)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const delay = 5

export async function list (range?: {from: number, to: number}) {
  delay && await sleep(delay)

  if (range) {
    const { from, to } = range
    return listByid.slice(from, to + 1)
  }

	return listByid
}

export async function set (doc: Doc) {
  delay && await sleep(delay)
  store.docs[doc._id] = doc
  return
}

export async function findNext () {
  delay && await sleep(delay)
  // We first handle all open documents, if those are handled we go through the rejected ones
  const docs = Object.values(store.docs)
  let next = docs.find(doc => (!doc.approved && doc.approved !== false))

  if (!next) {
    next = docs.find(doc => doc.approved === false)
  }
  return next?._id
}

export async function get (ids: string[]) {
  delay && await sleep(delay)
  return ids.map(id => store.docs[id])
}

export async function suggest ({ docId }: { docId: string }) {
	const doc = store.docs[docId]
	if (!doc) {
		throw 'document not found'
	}
	const existingLabels = doc.labels || []
	doc.labels = existingLabels.concat([
		`AI suggestion a${existingLabels.length + 1}`,
		`AI suggestion b${existingLabels.length + 2}`
	])
	doc.approved = null
	delay && await sleep(1000)
	return doc
}
