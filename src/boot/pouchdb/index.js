import create from './create'
import { store } from './../../store'

class Database {
  local = undefined
  remote = undefined
  syncHandler = undefined
  async configure ({ isSSR, onChange }) {
    if (isSSR) {
      this.local = create('http://anastas:123456NK@localhost:5984/att/')
    } else {
      this.local = create('db')
      this.remote = create('http://anastas:123456NK@localhost:5984/att/')
      if (navigator.onLine) {
        try {
          await this.replicate({ source: this.remote, target: this.local })
          await this.replicate({ source: this.local, target: this.remote })
        } catch (err) {
          console.log('error from replicate ', err)
        }
      }
      this.syncHandler = this.local.sync(this.remote, {
        live: true,
        retry: true
      })
      this.local.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', onChange)
    }
  }

  async zemi ({ id, rev }) {
    this.local.get(id).then(function (doc) {
      console.log('Got doc ', doc)
      return doc
    }).catch(function (err) {
      console.log('GET error ', err)
    })
  }

  async nati ({ id, data, rev }) {
    let obj

    obj = {
      ...(typeof id !== 'undefined') && { _id: id },
      ...(typeof rev !== 'undefined') && { _rev: rev },
      data
    }

    this.local.put(obj).then(function (r) {
      console.log('PUT doc ', r)
      return this.get(id)
    }).catch(function (err) {
      console.log('PUT error ', err)
    })
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

  store.commit('syncData', await db.local.get('proba'))

  Vue.prototype.$db = db
}

export { db, store }
