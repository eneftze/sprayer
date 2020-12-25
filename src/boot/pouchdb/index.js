import create from './create'
import { store } from './../../store'

class Database {
  localGyms = undefined
  localWalls = undefined
  localRoutes = undefined

  remoteGyms = undefined
  remoteWalls = undefined
  remoteRoutes = undefined

  syncHandlerGyms = undefined
  syncHandlerWalls = undefined
  syncHandlerRoutes = undefined

  async configure ({ isSSR, onChange }) {
    if (isSSR) {
      this.localGyms = create('http://anastas:123456NK@localhost:5984/gyms/')
      this.localWalls = create('http://anastas:123456NK@localhost:5984/walls/')
      this.localRoutes = create('http://anastas:123456NK@localhost:5984/routes/')
    } else {
      this.localGyms = create('gyms')
      this.localWalls = create('walls')
      this.localRoutes = create('routes')

      this.remoteGyms = await create('http://anastas:123456NK@localhost:5984/gyms/')
      this.remoteWalls = await create('http://anastas:123456NK@localhost:5984/walls/')
      this.remoteRoutes = await create('http://anastas:123456NK@localhost:5984/routes/')

      if (navigator.onLine) {
        try {
          await this.replicate({ source: this.remoteGyms, target: this.localGyms })
          await this.replicate({ source: this.remoteWalls, target: this.localWalls })
          await this.replicate({ source: this.remoteRoutes, target: this.localRoutes })

          await this.replicate({ source: this.localGyms, target: this.remoteGyms })
          await this.replicate({ source: this.localWalls, target: this.remoteWalls })
          await this.replicate({ source: this.localRoutes, target: this.remoteRoutes })
        } catch (err) {
          console.log('error from replicate ', err)
        }
      }
      this.syncHandlerGyms = this.localGyms.sync(this.remoteGyms, {
        live: true,
        retry: true
      })
      this.syncHandlerWalls = this.localWalls.sync(this.remoteWalls, {
        live: true,
        retry: true
      })
      this.syncHandlerRoutes = this.localRoutes.sync(this.remoteRoutes, {
        live: true,
        retry: true
      })

      this.localGyms.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', onChange)

      this.localWalls.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', onChange)

      this.localRoutes.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', onChange)
    }
  }

  async replicate ({ source, target }) {
    return new Promise((resolve, reject) => {
      source.replicate.to(target).on('complete', resolve).on('error', reject)
    })
  }
}

let db = new Database()

export default async ({ Vue, ssrContext }) => {
  await db.configure({
    isSSR: !!ssrContext,
    onChange (change) {
      console.log('change ', change)
    }
  })

  Vue.prototype.$db = db
}

export { db, store }
