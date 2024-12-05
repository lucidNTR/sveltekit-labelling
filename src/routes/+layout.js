// FIXME: add types
import { browser } from '$app/environment'
import { getDataSource } from '$lib/direct-source.js'
import makeDataStore from 'atreyu/data.js?v=15'

export const ssr = true
export const csr = true

export async function load ({ data, fetch }) {
  // FIXME: weird behaviour as cache is in tab but not in serviceworker cache?
  // For service worker mode something like:
  // if (!useDirectSource) {
  //   await import(`$lib/${useDirectSource ? '' : '' }-source.js`) works for some reason, nothing else, see vite
  //   import DataSource from 'atreyu/service-worker-source.js?5'
  //    const dataSource = new DataSource({ wake: 20_000 })
  //    export function getDataSource () {
  //      return { dataSource }
  //    }
  // }

  const dataSource = getDataSource({ fetch })
  // FIXME: need to inject custom fetch from svelte for ssr to support relative urls into falcor handlers and req helper and services
  // FIXME: weird behaviour as cache is in tab but not in serviceworker cache?

  const cache = (browser && ssr) ? await data.streamed.cache : undefined

  console.log('making data store with cache:', cache)

  // If server model is needed dont reuse server cache for ssr but add a server model around the router dataSource like for service worker mode
  const ayu = makeDataStore({ batched: true, source: dataSource, cache, onModelChange: () => {
    dataSource._onChange()
  } })

  // TODO: await ayu.falcor.preload(...)
  return {
		ayu
	}
}
