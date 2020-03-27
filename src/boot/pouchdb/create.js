import PouchDB from './setup'

export default function (name, options) {
  let db = options !== undefined ? new PouchDB(name, options) : new PouchDB(name)

  return db
}
