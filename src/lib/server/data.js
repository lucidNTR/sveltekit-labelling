import bootstrapstore from '../dataset.json' assert { type: 'json' };
const store = { rows: [...bootstrapstore.rows] };
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function getDocs() {
	return store;
}

export function approve ({ docId }) {
  const doc = store.rows.find(doc => doc.id === docId);
	doc.approved = true;
  return doc;
}

export function reject ({ docId }) {
  const doc = store.rows.find(doc => doc.id === docId);
	doc.approved = false;
  return doc;
}

export function updateLabel ({ docId, label, index }) {
  const doc = store.rows.find(doc => doc.id === docId);
  if (!doc.labels) {
    doc.labels = [];
  }

	doc.labels[index] = label;
  doc.labels = [...new Set(doc.labels)];
  return doc;
}

export function removeLabel ({ docId, label, index }) {
	const doc = store.rows.find(doc => doc.id === docId);
	doc.labels = doc.labels.filter(entry => (entry !== label))
  return doc
}

export async function suggest ({ docId }) {
  const doc = store.rows.find(doc => doc.id === docId);
  const existingLabels = doc.labels || []
  doc.labels = existingLabels.concat([`AI suggestion a${existingLabels.length + 1}`, `AI suggestion b${existingLabels.length + 2}`])
  doc.approved = null
  await sleep(1000)
  return doc
}
