import { db } from '../boot/pouchdb/index'
export function act (/* context */) {
  console.log(db)
  return 'llllll'
  // do one way, one-off sync from the server until completion
  /* pouchdb.replicate.from(remote).on('complete', function(info) {
    // then two-way, continuous, retriable sync
    pouchdb
      .sync(remote, { live: true, retry: true })
      .on('change', function(info) {
        store.commit('CHANGE_STATE', info.change.docs[0].flavour)
      })
      .on('paused', function(err) {
        // replication paused (e.g. replication up to date, user went offline)
      })
      .on('active', function() {
        // replicate resumed (e.g. new changes replicating, user went back online)
      })
      .on('denied', function(err) {
        // a document failed to replicate (e.g. due to permissions)
      })
      .on('complete', function(info) {
        // handle complete
      })
      .on('error', function(err) {
        // handle error
      })
  }) */
}
