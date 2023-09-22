let pageLength = 8

// FIXME: non pouch sync calls
export default {
  paths: {
    // FIXME: autowrapping for set ops and others not implemented!

    'rows.length': {
      get: {
        handler: async ({ fetch }) => {
          // FIXME: use injected fetch in req util function
          const { count } = await (await fetch('/api/count')).json()
          return count
        }
      }
    },

    'rows[{ranges:ranges}]': {
      get: {
        handler: async ({ maxRange, ranges, fetch }) => {
          const range = maxRange(ranges)
          const { list } = await (await fetch(`/api/list?range=${JSON.stringify(range)}`)).json()

          return list.map((id, i) => {
            return { path: ['rows', i + range.from], value: { $type: 'ref', value: [ 'docs', id ] } }
          })
        }
      }
    },

    'rows.findNext': {
      call: {
        handler: async ({ fetch }, [{docId}] ) => {
          const result = await (await fetch(`/api/findNext?id=${JSON.stringify(docId)}`)).json()
          return { path: ['rows', 'findNext'], value: { $type: 'atom', value: result.docId } }
        }
      }
    },

    'docs[{keys:ids}].reject': {
      call: {
        handler: async ({ids, model, fetch}) => {
          const doc = await model.getValue(['docs', ids[0]])
          doc.approved = false

          const result = await (await fetch(`/api/set`, {
            method: 'POST',
            body: JSON.stringify({ docs: [doc] })
          })).json()

          if (result.ok) {
            return { path: ['docs', doc._id], value: { $type: 'atom', value: doc } }
          } else {
            return { path: ['docs', doc._id], value: { $type: 'error', value: 'could not update document' } }
          }
        }
      }
    },

    'docs[{keys:ids}].suggest': {
      call: {
        handler: async ({ ids, fetch }) => {
          const { doc } = await (await fetch(`/api/suggest`, {
            method: 'POST',
            body: JSON.stringify({ id: ids[0] })
          })).json()

          if (doc) {
            return { path: ['docs', ids[0]], value: { $type: 'atom', value: doc } }
          } else {
            return { path: ['docs', ids[0]], value: { $type: 'error', value: 'could not update document' } }
          }
        }
      }
    },

    'docs[{keys:ids}].approve': {
      call: {
        handler: async ({ids, model, fetch}) => {
          const doc = await model.getValue(['docs', ids[0]])
          doc.approved = true

          const result = await (await fetch(`/api/set`, {
            method: 'POST',
            body: JSON.stringify({ docs: [doc] })
          })).json()

          if (result.ok) {
            return { path: ['docs', doc._id], value: { $type: 'atom', value: doc } }
          } else {
            return { path: ['docs', doc._id], value: { $type: 'error', value: 'could not update document' } }
          }
        }
      }
    },

    'docs[{keys:ids}].updateLabel': {
      call: {
        handler: async ( {ids, model, fetch}, [{label, index}] ) => {
          // TODO: standard way to get model value if exists and fallback to get from service
          // TODO: inject the _rev in a realiable way from the proxy store to do couch conflict rejection!
          const doc = await model.getValue(['docs', ids[0]])

          if (!doc.labels) {
            doc.labels = []
          }
          doc.labels[index] = label // set label
          doc.labels = [...new Set(doc.labels)] // remove possible douplicates

          const result = await (await fetch(`/api/set`, {
            method: 'POST',
            body: JSON.stringify({ docs: [doc] })
          })).json()

          if (result.ok) {
            return { path: ['docs', doc._id], value: { $type: 'atom', value: doc } }
          } else {
            return { path: ['docs', doc._id], value: { $type: 'error', value: 'could not update document' } }
          }
        }
      }
    },

    'docs[{keys:ids}].removeLabel': {
      call: {
        handler: async ({model, ids, fetch}, [{ label }]) => {
          const doc = await model.getValue(['docs', ids[0]])

          doc.labels = doc.labels?.filter((entry) => entry !== label)

          const result = await (await fetch(`/api/set`, {
            method: 'POST',
            body: JSON.stringify({ docs: [doc] })
          })).json()

          if (result.ok) {
            return { path: ['docs', doc._id], value: { $type: 'atom', value: doc } }
          } else {
            return { path: ['docs', doc._id], value: { $type: 'error', value: 'could not update document' } }
          }
        }
      }
    },


    'docs[{keys:ids}]': {
      get: {
        handler: async ({ ids, fetch }) => {
          const { docs } = await (await fetch(`/api/get?ids=${JSON.stringify(ids)}`)).json()
          return docs.map(doc => ({ path: ['docs', doc._id], value: { $type: 'atom', value: doc } })) // TODO: add warning if returning object not with atom wrap?!
        }
      },
      set: {
        handler: async ({ docs }) => {
          const docValues = Object.values(docs).map(({ value }) => value)

          const res = await (await fetch(`/api/set`, {
            method: 'POST',
            body: JSON.stringify({ docs: docValues })
          })).json()

          return docValues.map(doc => ({ path: ['docs', doc._id], value: { $type: 'atom', value: doc } }))
        }
      }
    },

    title: {
      get: {
        handler: () => {
          // TODO: support streaming immediate values
          return 'Labelling'
        }
      }
    }
  }
}
