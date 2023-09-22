import { makeRouter } from 'atreyu/router.js?v=8'
import schema from '../schema/falcor.js'

const Router = makeRouter({ schema })

export let dataSource
let resolve
// get cache fires only on server and before getDataSource, so it needs to wait until getDataSource addded the dataSource that getCache depends on to finish the streaming response
export async function getCache () {
  resolve?.()

  dataSource = new Promise(reslv => {
    resolve = reslv
  })

  const awaitedDataSource = await dataSource

  return awaitedDataSource?.model?.getCache()
}

export function getDataSource ({ fetch } = {}) {
  const router = new Router({ fetch })

  router._onChange = () => {
    resolve?.(router)
  }

  return router
}
