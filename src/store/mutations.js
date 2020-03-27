import { store } from './index'

export async function syncData (context, data) {
  store.state.proba = data
}
