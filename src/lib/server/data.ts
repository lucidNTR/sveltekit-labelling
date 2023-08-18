type Store = { rows: Doc[] }
type Doc = {
	id: string
	title: string
	body: string
	url: string
	approved: null | boolean | undefined
	labels: string[] | undefined
}

import _bootstrapstore from '../dataset.json' assert { type: 'json' }
const bootstrapstore = _bootstrapstore as Store

const store: Store = { rows: [...bootstrapstore.rows] }
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function getDocs() {
	return store
}

type ApiArgs = { docId: string; label: string | undefined; index: number | undefined }
export function approve({ docId }: ApiArgs) {
	const doc = store.rows.find((doc) => doc.id === docId)
	if (!doc) {
		throw 'document not found'
	}
	doc.approved = true
	return doc
}

export function reject({ docId }: ApiArgs) {
	const doc = store.rows.find((doc) => doc.id === docId)
	if (!doc) {
		throw 'document not found'
	}
	doc.approved = false
	return doc
}

export function updateLabel({ docId, label, index }: ApiArgs) {
	const doc = store.rows.find((doc) => doc.id === docId)
	if (!doc) {
		throw 'document not found'
	}
	if (!doc.labels) {
		doc.labels = []
	}
	if (typeof index !== 'number') {
		throw 'invalid label index'
	}
	if (typeof label !== 'string') {
		throw 'invalid label format'
	}

	doc.labels[index] = label
	doc.labels = [...new Set(doc.labels)]
	return doc
}

export function removeLabel({ docId, label }: ApiArgs) {
	const doc = store.rows.find((doc) => doc.id === docId)
	if (!doc) {
		throw 'document not found'
	}
	doc.labels = doc.labels?.filter((entry) => entry !== label)
	return doc
}

export async function suggest({ docId }: ApiArgs) {
	const doc = store.rows.find((doc) => doc.id === docId)
	if (!doc) {
		throw 'document not found'
	}
	const existingLabels = doc.labels || []
	doc.labels = existingLabels.concat([
		`AI suggestion a${existingLabels.length + 1}`,
		`AI suggestion b${existingLabels.length + 2}`
	])
	doc.approved = null
	await sleep(1000)
	return doc
}
